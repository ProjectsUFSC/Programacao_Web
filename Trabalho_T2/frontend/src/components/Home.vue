<template>
    <div class="home-container">
      <h1>Bem-vindo</h1>
      <p>Por favor, escolha uma opção:</p>
      <div class="button-group">
        <button @click="$router.push('/login')">Login</button>
        <button @click="$router.push('/register')">Registrar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
  };
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  p {
    margin-bottom: 20px;
    font-size: 16px;
  }
  
  .button-group button {
    padding: 10px 20px;
    margin: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .button-group button:hover {
    background-color: #45a049;
  }
  </style>
  