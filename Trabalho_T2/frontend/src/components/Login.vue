<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Usuário</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Digite seu nome de usuário"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Digite sua senha"
            required
          />
        </div>
        <div class="button-group">
          <button type="submit" class="btn primary">Entrar</button>
          <button type="button" @click="$router.push('/')" class="btn secondary">Cancelar</button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post('https://192.168.3.24:3000/api/login', {
                user: this.username,
                password: this.password,
                });

                if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Salva o token
                localStorage.setItem('username', this.username); // Salva o username
                this.$router.push('/scan');
                }
            } catch (error) {
                this.errorMessage = 'Login falhou. Verifique suas credenciais.';
            }
            }
    },
  };
  </script>
  
  <style scoped>
  /* Container Styling */
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    padding: 20px;
  }
  
  /* Form Styling */
  form {
    width: 100%;
    max-width: 400px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    margin-bottom: 20px;
    color: #333;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  /* Button Styling */
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn.primary {
    background-color: #4caf50;
    color: white;
  }
  
  .btn.primary:hover {
    background-color: #45a049;
  }
  
  .btn.secondary {
    background-color: #f44336;
    color: white;
  }
  
  .btn.secondary:hover {
    background-color: #e53935;
  }
  
  /* Error Message Styling */
  .error-message {
    color: #f44336;
    margin-top: 10px;
    text-align: center;
  }
  </style>
  