<template>
    <div>
        <Header/>
        <button id="sair" @click="goToLogin"><img src="/imgs/sair-icon.png" alt="">Sair</button>
        <div class="home-container">
            <h1>Salas Disponíveis</h1>
            <div class="sala-container" v-if="salas.length > 0">
                <ul>
                    <li v-for="(sala, index) in salas" :key="index" class="sala-item">
                    <div class="sala-info">
                        <h3>{{ sala }}</h3>
                        <button @click="abrirSala(sala)">Abrir</button>
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
            })
            .catch((error) => {
                console.log(error);
            });
        },
        methods: {
            abrirSala(sala) {
                this.$router.push({ name: "Sala", params: { sala } });
            },
            goToLogin(){
                this.$router.push('/');
            }

        }
    }
</script>

<style scoped>

#sair {
    position: absolute;
    top: 120px;
    right: 20px;
    background-color: #002b76;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

#sair:hover {
    background-color: #1a5fd6;
}

#sair img {
    width: 20px;
    margin-right: 5px;
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

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #00b32a;
}
</style>