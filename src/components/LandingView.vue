<template>

  <div class="container py-4">
    <header class="pb-3 mb-4 border-bottom">
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">TW Front</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
            </ul>
            <button class="btn btn-primary" type="submit" v-on:click.prevent = "goLoginPage()">Login</button>
          </div>
        </div>
      </nav>
    </header>

    <div class="p-5 mb-4 bg-body-tertiary rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">TW Demo APP</h1>
        <p class="col-md-8 fs-4">Descarga la app para android desde el siguiente botón.</p>
        <a href="https://tw-front.hectoralvarez.dev/tw_app-arm64.apk" class="btn btn-primary btn-lg m-2">
          Descargar APK Android 64 bits</a>
        <a href="https://tw-front.hectoralvarez.dev/tw_app-arm.apk" class="btn btn-secondary btn-lg m-2">
          Descargar APK Android 32 bits</a>
      </div>
    </div>

    <div class="row align-items-md-stretch">
      <div class="col-md-6">
        <div class="h-100 p-5 text-bg-dark rounded-3">
          <h2>Actualiza tu posición</h2>
          <p>Accede con tu usuario y actualiza tu posición manualmente desde la plataforma web.</p>
          <a class="btn btn-outline-light" href="/login">Log in</a>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 bg-body-tertiary border rounded-3">
          <h2>Aplicación móvil disponible</h2>
          <p>Ingresa con tu teléfono y actualiza tu posición utilizando la geolocalización de tu dispositivo.</p>
        </div>
      </div>
    </div>

    <footer class="pt-3 mt-4 text-body-secondary border-top">
      © 2024
    </footer>
  </div>

</template>

<script>
import {IS_USER_AUTHENTICATED} from "../store/storeconstants";

  export default {
    name: 'LandingView',
    data() {
      return {
      }
    },
    methods:{
      goLoginPage(){
        this.$router.push('/login')
      },
      async checkLogin()  {
        if(this.$store.getters[`auth/${IS_USER_AUTHENTICATED}`] === 'true'){
          this.$router.push('/home')
        }
      },
    },
    created(){
      this.checkLogin();
    }
  }
</script>

<style scoped>

</style>
