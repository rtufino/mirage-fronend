<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isOnline = ref(false); // Estado real del Wemos
const status = ref({ text: 'SISTEMA LISTO', color: 'text-info' });
const loading = ref(false);
const API_BASE = 'http://192.168.100.16:5003';

// Función para verificar si el Wemos está conectado al MQTT
const checkWemosStatus = async () => {
  try {
    const response = await fetch(`${API_BASE}/status`);
    const data = await response.json();
    isOnline.value = data.online; //
  } catch (error) {
    isOnline.value = false;
  }
};

const openDoor = async (doorId) => {
  if (loading.value || !isOnline.value) return;

  loading.value = true;
  status.value = { text: `ABRIENDO ${doorId.toUpperCase()}...`, color: 'text-warning' };

  try {
    const response = await fetch(`${API_BASE}/open/${doorId}`, {
      method: 'POST' //
    });

    if (!response.ok) throw new Error();
    status.value = { text: '¡ACCESO CONCEDIDO!', color: 'text-success' };
  } catch (error) {
    status.value = { text: 'FALLO DE COMUNICACIÓN', color: 'text-danger' };
  } finally {
    setTimeout(() => {
      status.value = { text: isOnline.value ? 'SISTEMA LISTO' : 'WEMOS FUERA DE LÍNEA', color: isOnline.value ? 'text-info' : 'text-muted' };
      loading.value = false;
    }, 3000);
  }
};

// Iniciar monitoreo al montar el componente
let statusInterval;
onMounted(() => {
  checkWemosStatus();
  statusInterval = setInterval(checkWemosStatus, 5000); // Polling cada 5 segundos
});

onUnmounted(() => clearInterval(statusInterval));
</script>

<template>
  <div class="container-fluid min-vh-100 vw-100 bg-dark text-light d-flex flex-column align-items-center justify-content-center m-0 p-0">
    
    <div class="w-100 px-4" style="max-width: 400px;">
      
      <header class="text-center mb-5">
        <h1 class="display-2 fw-black tracking-tighter text-primary italic mb-0">BATAN 3</h1>
        <div class="bg-primary mt-1 mx-auto rounded-pill" style="height: 4px; width: 60px;"></div>
      </header>

      <div class="d-grid gap-4">
        <button @click="openDoor('p1')" 
                class="btn btn-outline-primary btn-lg py-5 rounded-4 shadow-lg border-2 d-flex flex-column align-items-center"
                :disabled="loading || !isOnline">
          <span class="fs-1 mb-2">🏠</span>
          <span class="fw-bold tracking-widest uppercase">Principal</span>
        </button>

        <button @click="openDoor('p2')" 
                class="btn btn-outline-success btn-lg py-5 rounded-4 shadow-lg border-2 d-flex flex-column align-items-center"
                :disabled="loading || !isOnline">
          <span class="fs-1 mb-2">🔑</span>
          <span class="fw-bold tracking-widest uppercase">Intermedia</span>
        </button>
      </div>

      <footer class="mt-5 text-center">
        <div class="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-black bg-opacity-50 border border-secondary border-opacity-25">
          <div :class="[isOnline ? 'bg-success' : 'bg-danger', 'status-dot']"></div>
          <span class="small fw-bold tracking-widest uppercase" :class="isOnline ? 'text-light' : 'text-danger'">
            {{ isOnline ? status.text : 'DISPOSITIVO OFFLINE' }}
          </span>
        </div>
      </footer>

    </div>
  </div>
</template>