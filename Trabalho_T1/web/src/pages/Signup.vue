    <template>
        <div>
        <Header />
            <div class="register-container">
                <h1>Cadastrar</h1>
                <form @submit.prevent="handleRegister">
                    <div class="input-group">
                        <label for="name">Nome</label>
                        <input type="text" id="name" v-model="name" placeholder="Digite seu nome completo" required/>
                    </div>
            
                    <div class="input-group">
                        <label for="idUFSC">ID UFSC</label>
                        <input type="text" id="idUFSC" v-model="idUFSC" placeholder="Digite seu ID UFSC" required/>
                    </div>
            
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" v-model="email" placeholder="Digite seu email" required/>
                    </div>
            
                    <div class="input-group">
                        <label for="password">Senha</label>
                        <input type="password" id="password" v-model="password" placeholder="Digite sua senha" required/>
                    </div>
            
                    <div class="button-group">
                    <button type="button" class="btn-primary" @click="goToLogin">Login</button>
                    <button type="submit" class="btn-secondary">Cadastrar</button>
                    </div>
                </form>
            </div>
        <Footer/>
        </div>
    </template>
    
<script>
    import Header from "../components/Header.vue";
    import Footer from "@/components/Footer.vue";
    export default {
        components: {
            Header,
            Footer
        },
        data() {
        return {
            name: '',
            idUFSC: '',
            email: '',
            password: ''
        };
        },
        methods: {
        handleRegister() {
            console.log('Cadastro enviado:', {
            name: this.name,
            idUFSC: this.idUFSC,
            email: this.email,
            password: this.password
            });
        },

        goToLogin(){
            this.$router.push('/');

        }
        }
    };
</script>

<style scoped>
    .register-container {
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    }

    h1 {
    margin-bottom: 20px;
    }

    .input-group {
    margin-bottom: 15px;
    }

    label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    }

    input {
    width: 90%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    }

    .button-group {
    display: block;
    justify-content: space-between;
    }

    button {
    padding: 10px 15px;
    margin: 0 5px;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    }

    .btn-primary {
    background-color: #007bff;
    color: white;
    }

    .btn-primary:hover {
    background-color: #0056b3;
    }

    .btn-secondary {
    background-color: #23b107;
    color: white;
    }

    .btn-secondary:hover {
    background-color: #1b8306;
    }
    </style>