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
          console.log('Registrando usuário...');
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
          await axios.post('https://200.135.67.99:3000/api/register', {
            user: this.username,
            password: this.password,
            pushSubscription: subscription,
          });

          this.successMessage = 'Usuário registrado com sucesso!';
          this.errorMessage = '';
          this.$router.push('/');
        } catch (error) {
          console.error('Erro ao registrar usuário:', error.response?.data || error.message);
          this.successMessage = '';
          this.errorMessage = 'Erro ao registrar usuário.';
        }
      },
      // Helper function to convert VAPID key
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
  
  /* Form Styling */
  form {
    width: 90%;
    max-width: 400px;
    padding: 20px;
    border-radius: 8px;
  }
  
  h1 {
    margin-bottom: 20px;
    color: #311312;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    color: #311312;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #3b2323;
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
    font-weight: bold;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn.primary {
    background-color: #D14B7B;
    color: white;
    margin-right: 10px;
  }
  
  .btn.primary:hover {
    background-color: #d2326a;
  }
  
  .btn.secondary {
    background-color: #ff3535;
    color: white;
  }
  
  .btn.secondary:hover {
    background-color: #d31414;
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
  