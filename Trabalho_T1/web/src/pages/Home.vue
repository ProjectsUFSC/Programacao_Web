<template>
    <div>
        <Header/>

        <button class="top-button sair" @click="goToLogin"><img src="/imgs/sair-icon.png" alt="">Sair</button>
        <button class="top-button cadastro" v-if="this.isAdmin" @click="gerenciador">Gerenciar Acessos</button>

        <div v-if="showGerenciador" class="modal">
            <span class="close" @click="gerenciador">&times;</span>
            <h1>Gerenciador de Acessos</h1>
            <form @submit.prevent="gerenciador" >
                <div class="input-group">
                    <label for="idUFSC">Escolha o Usuário</label>
                    <select v-model="selectedUser" required>
                        <option value="" disabled selected >Escolha um usuário</option>
                        <option v-for="user in usuarios"  :key="user._id" :value="user._id">{{ user.nome }} ({{ user.idufsc }})</option>
                    </select>
                </div>
                

                <div class="input-group">
                    <label for="sala">Sala</label>
                    <input type="text" id="sala" v-model="sala" placeholder="Digite a sala" required/>
                </div>

                <div class="input-group">
                <button type="button" class="btn" @click="adicionaPorta">Adicionar</button>
            </div>
            </form>
        </div>

        <div class="home-container">
            <h1>Salas Disponíveis</h1>
            <div class="sala-container" v-if="salas.length > 0">
                <ul>
                    <li v-for="(sala, index) in salas" :key="index" class="sala-item">
                    <div class="sala-info">
                        <h3>{{ sala }}</h3>
                        <button id="abrir" v-if="!salasAbertas.includes(sala)"  @click="abrirSala(sala)">Abrir</button>
                        <button id="abrindo"  v-else >Abrindo...</button>
                    </div>
                    </li>
                </ul>
            </div>

            <div v-else>
                <p>Você não tem acesso a nenhuma sala no momento.</p>
            </div>
        </div>

        <Footer/>
        
    </div>
</template>

<script>
    import Header from "../components/Header.vue";
    import Footer from "../components/Footer.vue";
    import axios from "axios";

    export default {
        name : "Home",
        components: {
            Header,
            Footer
        },
        data(){
            return {
                salas: [],
                salasAbertas: [],
                usuarios: [],
                isAdmin: false,
                showGerenciador: false,
                selectedUser: "",
                sala: ""
            };
        },
        created() {
            const token = localStorage.getItem("token");
            axios.get("api/lista", {
                headers: {
                    authorization: token 
                },
            })
            .then((response) => {
                this.salas = response.data.salas;
                if(response.data.isAdmin){
                    this.isAdmin = true;
                    this.getUsers();
                }
            })
            .catch((error) => {
                    alert("Sessão expirada, faça login novamente.");
                    this.$router.push('/');
                    
            });
        },
        methods: {
            abrirSala(sala) {
                axios.post("api/abre", {
                    id: sala
                })
                .then((response) => {
                    this.salasAbertas.push(sala);
                    setTimeout(() => {
                        const index = this.salasAbertas.indexOf(sala);
                        if (index !== -1) {
                            this.salasAbertas.splice(index, 1);
                        }
                    }, 2000);
                })
                .catch((error) => {
                    if(error.response.status === 404){
                        alert("Sala não conectada.");
                    } else if(error.response.status === 401){
                        alert("Acesso não autorizado.")};
                });  
            },
            goToLogin(){
                localStorage.removeItem("token");
                this.$router.push('/');
            },
            gerenciador(){
                this.showGerenciador = !this.showGerenciador;
            },
            getUsers(){
                axios.get("api/usuarios")
                .then((response) => {
                    this.usuarios = response.data;
                })
            },
            adicionaPorta(){
                axios.post("api/adiciona", {
                    id: this.selectedUser,
                    sala: this.sala
                },
                {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                }
            )
                .then((response) => {
                    alert("Acesso autorizado");
                    this.showGerenciador = false;
                    this.sala = "";
                    this.selectedUser = "";
                })
                .catch((error) => {
                    if(error.response.status === 404){
                        alert("Usuário não encontrado.");
                    } else if(error.response.status === 409){
                        alert("Sala já adicionada para este usuário.");
                    }else {
                        alert();
                    }
                    
                })

            }

        }
    }
</script>

<style scoped>

.input-group {
    margin-bottom: 15px;
    }

    label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    }

    input , select {
    width: 50%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    }

.modal {
    position: fixed;
    top: 20%;
    left: 30%;
    width: 40%;
    height: 60%;
    background-color: white;
    border-radius: 10px;
    border: 6px solid #334e7b;
    box-shadow: 0px 16px 24px #002b765e;
    text-align: center;
}

.btn {
    padding: 10px 15px;
    margin: 0 5px;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    background-color: #0b3275;
    color: white;
}

.btn:hover{
    background-color: #26467f;
}

.close {
    position: absolute;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
}

.top-button {
    height: 50px;
    position: absolute;
    background-color: #002b76;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.top-button:hover {
    background-color: #1a5fd6;
}

.top-button img {
    width: 20px;
    margin-right: 5px;
}

.sair {
    top: 120px;
    right: 20px;
    padding: 10px 20px;
}

.cadastro {
    top: 120px;
    right: 150px;
    padding: 10px 20px;
}

.home-container {
    padding: 20px;
    display: block;
    align-content: center;
    text-align: center;
}

.sala-container {
    height: 400px;
    width: 600px;
    overflow-y: scroll;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

ul{
    list-style: none;
    padding: 0;
}

.sala-item {
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    border-radius: 5px;
}

.sala-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#abrir {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#abrir:hover {
    background-color: #00b32a;
}

#abrindo {
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #44576b;
    cursor: not-allowed;
}

#cadastro {
    font-size: 15px;
    position: absolute;
    bottom: 80px;
    right: 20px;
    padding: 10px 20px;
    background-color: #002b76;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>