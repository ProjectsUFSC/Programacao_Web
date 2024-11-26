const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let db;
let clientes;
const ChaveSecreta = 'segredo';

async function conectaDB() {
  try {
    const client = new MongoClient('mongodb://localhost:27017/');
    await client.connect();
    db = client.db("Trab2");
    clientes = db.collection("clientes");
    console.log('Conectou no banco de dados');
  } catch (error) {
    console.error('Erro ao conectar no banco de dados:', error.message);
    process.exit(1);
  }
}

async function registraUsuario(user, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await clientes.insertOne({ user, password: hashedPassword });
      return result.insertedId;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error.message);
      throw error;
    }
  }

const autenticaUsuario = async (user, password) => {
  try {
    const usuario = await clientes.findOne({ user });
    if (!usuario) {
      console.error('Usuário não encontrado');
      return null;
    }

    const IsPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!IsPasswordValid) {
      console.error('Senha inválida');
      return null;
    }

    const token = jwt.sign({ userId: usuario._id }, ChaveSecreta, { expiresIn: '1h' });
    return { token, userId: usuario._id };
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error.message);
    throw error;
  }
};

async function AdicionaCodigo(username, code) {
    try {
      const result = await clientes.findOneAndUpdate(
        { user: username }, 
        { $addToSet: { codes: code } }, 
        { returnDocument: 'after', upsert: false } 
      );
      if (!result.value) {
        throw new Error('Usuário não encontrado');
      }
      return result.value;
    } catch (error) {
      console.error('Erro ao adicionar QR-Code:', error.message);
      throw error;
    }
}
  
async function buscarCodigos(userId) {
    try {
        const user = await clientes.findOne({ _id: new ObjectId(userId) });
        if (!user) {
        throw new Error('Usuário não encontrado');
        }
        return user.codes || [];
    } catch (error) {
        console.error('Erro ao buscar QR-Codes do usuário:', error.message);
        throw error;
    }
}

async function AchaCodigo(code) {
  try {
    const usuario = await clientes.findOne({ codes: code });
    if (!usuario) {
      console.error('Código não encontrado');
      return null;
    }
    return usuario;
  } catch (error) {
    console.error('Erro ao buscar usuário pelo código:', error.message);
    throw error;
  }
}

async function CodigoAleatorio() {
  try {
    const users = await clientes.aggregate([
      { $unwind: '$codes' },
      { $sample: { size: 1 } }
    ]).toArray();
    return users.length > 0 ? users[0].codes : null;
  } catch (error) {
    console.error('Erro ao buscar código aleatório:', error.message);
    throw error;
  }
}


  

module.exports = {
  conectaDB,
  registraUsuario,
  autenticaUsuario,
  AdicionaCodigo,
  buscarCodigos,
  AchaCodigo,
  CodigoAleatorio,
};
