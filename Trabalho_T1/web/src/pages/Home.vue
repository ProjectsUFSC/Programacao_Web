<template>
    <div>
        <Header/>
        <button class="top-button sair" @click="goToLogin"><img src="/imgs/sair-icon.png" alt="">Sair</button>
        <button class="top-button cadastro" v-if="this.isAdmin" @click="gerenciador">Gerenciar Acessos</button>
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
                isAdmin: false
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
                }
            })
            .catch((error) => {
                    alert("Sessão expirada, faça login novamente.");
                    this.$router.push('/');
                    
            });
        },
        methods: {
            abrirSala(sala) {
                this.salasAbertas.push(sala);
                axios.post("api/abre", {
                    id: sala
                })
                .then((response) => {
                    setTimeout(() => {
                        const index = this.salasAbertas.indexOf(sala);
                        if (index !== -1) {
                            this.salasAbertas.splice(index, 1);
                        }
                    }, 2000);
                })  
            },
            goToLogin(){
                localStorage.removeItem("token");
                this.$router.push('/');
            }

        }
    }
</script>

<style scoped>

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