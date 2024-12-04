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
    height: 50%;
    width: 80%;
    background-color: #f7e3bf;
    font-family: Arial, sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.505);
  }
  
  h1 {
    margin-bottom: 20px;
    color: #311312;
    
  }
  
  p {
    margin-bottom: 20px;
    font-size: 16px;
  }
  
  .button-group button {
    font-weight: bold;
    padding: 10px 30px;
    margin: 10px 0;
    background-color: #D14B7B;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .button-group button:hover {
    background-color: #d2326a;
  }
  </style>
  