<template>
  <div class="scan-container">
    <h1>Escanear QR-Code</h1>
    <div id="qr-reader" style="width: 300px;"></div>
    <button @click="logout">Sair</button>

    <h2>QR-Codes Cadastrados</h2>
    <ul>
      <li v-for="code in userQrCodes" :key="code">{{ code }}</li>
    </ul>
  </div>
</template>

<script>
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

export default {
  name: "ScanQRCode",
  data() {
    return {
      userQrCodes: [],
    };
  },
  mounted() {
    const qrScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    qrScanner.render(this.registerQrCode, this.onScanError);

    this.fetchUserQrCodes();
  },
  methods: {
    async fetchUserQrCodes() {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      try {
        const response = await axios.get("http://localhost:3000/api/user-qr-codes",
        { username: username }, 
        { headers: { Authorization: `Bearer ${token}` },});
        this.userQrCodes = response.data.codes;
      } catch (error) {
        console.error("Erro ao buscar QR-Codes cadastrados:", error);
      }
    },
    async registerQrCode(decodedText) {
      const token = localStorage.getItem("token");
      try {
        await axios.post(
          "http://localhost:3000/api/qr-codes",
          { code: decodedText },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("QR-Code registrado com sucesso!");
        this.fetchUserQrCodes(); 
      } catch (error) {
        console.error("Erro ao registrar QR-Code:", error);
        alert("Erro ao registrar QR-Code. Tente novamente.");
      }
    },
    onScanError(error) {
      console.error("Erro ao escanear QR-Code:", error);
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.scan-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

li {
  margin: 5px 0;
  padding: 5px 10px;
  background-color: #e0e0e0;
  border-radius: 4px;
}
</style>
