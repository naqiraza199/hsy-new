<template>
  <transition name="fade-out">
    <div v-if="show" class="preloader">
      <div class="preloader-content">
        <div class="spinner"></div>
        <div class="preloader-logo">
          <i class="fas fa-ship"></i>
        </div>
        <div class="preloader-text">High Seas Yachting</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Preloader',
  data() {
    return {
      show: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = false
    }, 1500)
  }
}
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1a3a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.preloader-content {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 24px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #5a8f5e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.preloader-logo {
  font-size: 2.5rem;
  color: #5a8f5e;
  margin-bottom: 16px;
}

.preloader-text {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.fade-out-leave-active {
  transition: opacity 0.5s ease;
}

.fade-out-leave-to {
  opacity: 0;
}
</style>