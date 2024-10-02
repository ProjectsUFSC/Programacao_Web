<template>
    <div id="footer">

        <p>&copy;    2024 - Desenvolvido por <a href="https://github.com/Dleffe" target="_blank">Augusto Daleffe</a></p>

    </div>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<style scoped>

    #footer {
        display: flex;
        justify-content: start;
        align-items: center;
        background-color: #002b76;
        color: white;
        padding: 10px;
        height: 40px;
        width: 100%;
        position: absolute;
        bottom: 0px;
    }

    #footer a{
        color: rgb(255, 255, 255);
        text-decoration: none;
    }
</style>