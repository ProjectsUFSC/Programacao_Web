<template>
  <div class="scan-container">
    <h1>Escanear Código Promocional</h1>
    <div id="qr-reader"></div>

    <h2>Seus Códigos</h2>
    <ul v-if="userQrCodes.length">
      <li v-for="code in userQrCodes" :key="code">{{ code }}</li>
    </ul>
    <p v-else>Você não possui nenhum código cadastrado</p>
    <button @click="logout">Sair</button>
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
      isProcessing: false,
    };
  },
  mounted() {
    const qrScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 150 },
      false
    );

    qrScanner.render(this.registerQrCode, this.onScanError);

    this.fetchUserQrCodes();
  },
  methods: {
    async fetchUserQrCodes() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://200.135.67.99:3000/api/user-qr-codes",
        { headers: { Authorization: `Bearer ${token}` },});
        this.userQrCodes = response.data.codes;
      } catch (error) {
        console.error("Erro ao buscar QR-Codes cadastrados:", error);
      }
    },
    async registerQrCode(decodedText, decodedResult) {
      if (this.isProcessing) {
        return;
        }

      if (!decodedText) {
        console.error("Texto do QR-Code não encontrado");
        return;
      }

      this.isProcessing = true;
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      try {
        await axios.post(
          "https://200.135.67.99:3000/api/qr-codes",
          { code: decodedText, username: username },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("QR-Code registrado com sucesso!");
        this.fetchUserQrCodes();
      } catch (error) {
        console.error("Erro ao registrar QR-Code:", error.response?.data || error.message);
        alert("Erro ao registrar QR-Code. " + (error.response?.data?.message || ""));
      } finally{
        setTimeout(() => {
        this.isProcessing = false;
        }, 2000);
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
  color: #311312;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  height: 90%;
  width: 90%;
  background-color: #f7e3bf;
  font-family: Arial, sans-serif;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.505);
  overflow-y:auto;
}

h1{
  text-align: center;
}

#qr-reader {
  /* width: 80%;
  max-height: 20%; */
  width: 250px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  width: 100px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}

ul {
  list-style-type: none;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
}

li {
  padding: 5px 10px;
  background-color: #f098dd;
  border-radius: 4px;
}
</style>
