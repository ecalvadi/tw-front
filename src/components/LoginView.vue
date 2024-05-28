<template>
        <main class="form-signin mb-3 m-auto">
          <form @submit.prevent="login">
            <h1 class="h3 mb-3 fw-normal">Ingresa tus credenciales</h1>
            <div class="form-floating">
              <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="input.email">
              <label for="floatingInput">Email</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña" v-model="input.password">
              <label for="floatingPassword">Contraseña</label>
            </div>


            <button class="btn btn-primary w-100 py-2" type="submit" >Ingresar</button>
            <p class="mt-5 mb-3 text-body-secondary">© 2024</p>
          </form>
        </main>
</template>
<script>
import {IS_USER_AUTHENTICATED, SET_AUTHENTICATION, SET_TOKEN, SET_USERNAME } from "../store/storeconstants";
export default {
  name: 'LoginView',
  data(){
    return{
      input:{
        email:"",
        password:""
      },
      output: "",
    }
  },
  methods:{
    async login(e){
      e.preventDefault();
      if(this.input.email != "" && this.input.password != ""){
        const response = await fetch("https://tw-back.hectoralvarez.dev/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              email: this.input.email,
              password: this.input.password,
            }
          )
        });
        const {token} = await response.json();
        if(token){
          this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
          this.$store.commit(`auth/${SET_TOKEN}`, token);
          const user = await fetch("https://tw-back.hectoralvarez.dev/api/user/current", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          });
          const {name} = await user.json();
          if(name){
            this.$store.commit(`auth/${SET_USERNAME}`, name);
            this.$router.push('/home')
          } else {
            this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
            this.output = "Token inválido"
          }

        } else {
          this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
          this.output = "Usuario o contraseña incorrectos"
        }
        // this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
        // this.$store.commit(`auth/${SET_USERNAME}`, this.input.email);
        // this.output = "Authentication complete."
        // this.$router.push('/home')
      }else {
        this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
        this.output = "El campo de usuario y contraseña no deben estar sin datos"
      }
    },
    checkLogin() {
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
html,
body {
  height: 100%;
}

.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}


.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
    main {
        margin-top: 15em !important;
    }
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.btn-bd-primary {
  --bd-violet-bg: #712cf9;
  --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
}

.bd-mode-toggle {
  z-index: 1500;
}

.bd-mode-toggle .dropdown-menu .active .bi {
  display: block !important;
}


</style>
