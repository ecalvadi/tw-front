<template>
    <h3 class="m-auto">Good Bye {{getUsername()}}!</h3>
</template>

<script>
  import {  GET_USERNAME, SET_AUTHENTICATION, SET_TOKEN, SET_USERNAME } from "../store/storeconstants";
  export default {
    name: 'HomeVIew',
    data() {
      return {
      }
    },
    methods:{
      getUsername() {
        return this.$store.getters[`auth/${GET_USERNAME}`]
      },
      logout(){
        this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
        this.$store.commit(`auth/${SET_TOKEN}`, "");
        this.$store.commit(`auth/${SET_USERNAME}`, "");
        this.$router.push('/');
      }
    },
    mounted() {
        this.logout();
      },
  }
</script>
