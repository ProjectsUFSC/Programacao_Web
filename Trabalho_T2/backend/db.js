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

async function registraUsuario(user, password, pushsubscription) {
    try {
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await clientes.insertOne({ user, password: hashedPassword, pushsubscription: pushsubscription});
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

function autenticaToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  // console.log("Authorization Header:", authHeader);
  // console.log("Extracted Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, ChaveSecreta);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ message: "Token inválido" });
  }
}

async function AdicionaCodigo(username, code) {
    try {
      const result = await clientes.findOneAndUpdate(
        { user: username }, 
        { $addToSet: { codes: code } }, 
        { returnDocument: 'after', upsert: false } 
      );
      if (!result) {
        throw new Error('Usuário não encontrado', );
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
    const usuario = await clientes.findOne({ codes: code }, { projection: { pushSubscription: 1 } });
    if (!usuario) {
      console.error('Código não encontrado');
      return null;
    }
    return usuario.pushSubscription || null;
  } catch (error) {
    console.error('Erro ao buscar pushSubscription pelo código:', error.message);
    throw error;
  }
}


async function CodigoAleatorio() {
  try {
    const result = await clientes.aggregate([
      { $unwind: '$codes' },
      { $sample: { size: 1 } }, 
      {
        $project: {
          code: '$codes',
          pushSubscription: 1
        }
      }
    ]).toArray();

    if (result.length > 0) {
      return {
        code: result[0].code,
        pushSubscription: result[0].pushSubscription || null
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar código aleatório:', error.message);
    throw error;
  }
}


  

module.exports = {
  conectaDB,
  registraUsuario,
  autenticaUsuario,
  autenticaToken,
  AdicionaCodigo,
  buscarCodigos,
  AchaCodigo,
  CodigoAleatorio,
};
