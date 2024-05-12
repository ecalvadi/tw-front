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
            <button class="btn btn-primary" type="submit" v-on:click.prevent = "goLogoutPage()">Logout</button>
          </div>
        </div>
      </nav>
    </header>
  </div>

  <!-- MAP -->
  <div class="container m-auto" style="height: 80vh; width: 95vw;">
    <l-map
        v-model="zoom"
        v-model:zoom="zoom"
        :center="[47.41322, -1.219482]"
    >
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-marker v-model:lat-lng="latlng" draggable @moveend="updatePosition(latlng.lat, latlng.lng)">
        <l-tooltip>
          {{getUsername()}}
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
  import {  GET_USERNAME, GET_TOKEN } from "../store/storeconstants";
  import {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  } from "@vue-leaflet/vue-leaflet";
  import "leaflet/dist/leaflet.css";

  export default {
    name: 'HomeVIew',
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LTooltip,
    },
    data() {
      return {
        position: {},
        latlng: [0, 0],
        zoom: 2,
        iconWidth: 25,
        iconHeight: 40,
      }
    },
    computed: {
      iconUrl() {
        return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
      },
      iconSize() {
        return [this.iconWidth, this.iconHeight];
      },
    },
    methods:{
      updateLatLng(){
        this.latLng = [0, 0];
      },
      log(a) {
        console.log(a);
      },
      goLogoutPage(){
        this.$router.push('/logout')
      },
      getUsername() {
        return this.$store.getters[`auth/${GET_USERNAME}`]
      },
      async getPosition(){
        const token = this.$store.getters[`auth/${GET_TOKEN}`];
        
        const response = await fetch("https://tw-back.hectoralvarez.dev/api/positions/byUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        });

        if(response.status === 200){
          this.position = await response.json();
          if(this.position.id){
            this.latlng = [this.position.lat, this.position.lon];
          } else {
            
            const position = await fetch("https://tw-back.hectoralvarez.dev/api/positions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
              },
              body: JSON.stringify(
                {
                  lat: 0,
                  lon: 0,
                }
              )
            });          
            this.position = await position.json();
          }
        } else {
          // If status is != 200
          // go to logout
          this.$router.push("/logout");
        }

      },
      async updatePosition(lat, lon){
        this.position.lat = lat;
        this.position.lon = lon;

        await fetch("https://tw-back.hectoralvarez.dev/api/positions/"+this.position.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.$store.getters[`auth/${GET_TOKEN}`],
          },
          body: JSON.stringify(this.position)
        });                  
      }
    },
    created(){
      //check for position, if not exis, created
      this.getPosition();
    }
  }
</script>
