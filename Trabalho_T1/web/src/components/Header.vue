<template>
    <div id="navbar">
        <div class="navbar-item">
            <a href=""><img src="/imgs/ufsc-logo.png" alt="Logo UFSC"></a>
            <h1>Sistema de Acesso de Salas UFSC - Araranguá</h1>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Header',
    data() {
        return {
            login: false
        }
    }
}
</script>

<style scoped>

    boddy {
        margin: 0;
        padding: 0;
    }

    #navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #002b76;
        color: white;
        padding: 10px;
        height: 80px;
    }

    .navbar-item {
        display: flex;
        align-items: center;
    }

    .navbar-item a{
        color: rgb(255, 255, 255);
        text-decoration: none;
        margin: 10px;
    }

    .navbar-item img {
        width: auto;
        height: 80px;
    }



</style>