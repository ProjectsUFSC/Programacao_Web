<template>
    <div class="register-container">
      <h1>Registrar</h1>
      <form @submit.prevent="handleRegister">
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
          <button type="submit" class="btn primary">Cadastrar</button>
          <button type="button" @click="$router.push('/')" class="btn secondary">Cancelar</button>
        </div>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        password: '',
        successMessage: '',
        errorMessage: '',
      };
    },
    methods: {
      async handleRegister() {
        try {
          const registration = await navigator.serviceWorker.ready;
          let subscription = await registration.pushManager.getSubscription();
          
          if (!subscription) {
            const applicationServerKey = this.urlBase64ToUint8Array(
              'BIbZtGu3zn4dudFdSoZbX1Rrz8rAnkD1eRz3OPrrdP3VoqS3emh2q_1pnp6sVZbxUrXdurPVTeH8_iIXGzYg8jE'
            );
            subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey,
            });
          }
          console.log(subscription)
          await axios.post('http://localhost:3000/api/register', {
            user: this.username,
            password: this.password,
            pushSubscription: subscription,
          });

          this.successMessage = 'Usuário registrado com sucesso!';
          this.errorMessage = '';
        } catch (error) {
          console.error('Erro ao registrar usuário:', error.response?.data || error.message);
          this.successMessage = '';
          this.errorMessage = 'Erro ao registrar usuário.';
        }
      },
      urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Container Styling */
  .register-container {
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
  
  /* Success and Error Messages */
  .success-message {
    color: #4caf50;
    margin-top: 10px;
    text-align: center;
  }
  
  .error-message {
    color: #f44336;
    margin-top: 10px;
    text-align: center;
  }
  </style>
  