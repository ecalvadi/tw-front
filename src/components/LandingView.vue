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
        <h1 class="display-5 fw-bold">Custom jumbotron</h1>
        <p class="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
        <button class="btn btn-primary btn-lg" type="button">Example button</button>
      </div>
    </div>

    <div class="row align-items-md-stretch">
      <div class="col-md-6">
        <div class="h-100 p-5 text-bg-dark rounded-3">
          <h2>Change the background</h2>
          <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
          <button class="btn btn-outline-light" type="button">Example button</button>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 bg-body-tertiary border rounded-3">
          <h2>Add borders</h2>
          <p>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</p>
          <button class="btn btn-outline-secondary" type="button">Example button</button>
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
      checkLogin() {
        if(this.$store.getters[`auth/${IS_USER_AUTHENTICATED}`]){
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
