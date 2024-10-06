<template>
    <div>
        <Header />
        <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
            <div class="input-group">
                <label for="idUFSC">ID UFSC</label>
                <input type="text" id="idUFSC" v-model="idufsc" placeholder="Digite seu ID UFSC" required/>
            </div>

            <div class="input-group">
                <label for="password">Senha</label>
                <input type="password" id="password" v-model="senha" placeholder="Digite sua senha" required/>
            </div>

            <div class="button-group">
                <button type="submit" class="btn-primary" >Entrar</button>
                <button type="button" class="btn-secondary" @click="goToRegister">Cadastrar</button>
            </div>
        </form>
    </div>
    <Footer />
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";

export default {
    components: {
            Header,
            Footer
        },
    data() {
        return {
            idufsc: "",
            senha: "",
        };
    },
    methods: {
        handleLogin() {
            axios.post("api/login", {
                idufsc: this.idufsc,
                senha: this.senha,
            })

            .then((response) => {
                localStorage.setItem("token", response.data.token);
                this.$router.push("/home");
                
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    alert("Usuário inválido, tente novamente");
                } else if (error.response.status === 401) {
                    alert("Senha inválida, tente novamente");
                }
                else {
                    alert("Erro ao tentar fazer login");
                }

            });


                
        },
        goToRegister() {
            this.$router.push("/cadastro");
        },
    },
};
</script>

<style scoped>
    .login-container {
    width: 300px;
    margin: 100px auto;
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
    background-color: #6c757d;
    color: white;
    }

    .btn-secondary:hover {
    background-color: #5a6268;
    }
</style>
