<template>
  <v-app class="grey lighten-3">
    <Navbar v-if="userAuth == true" />
    
    <v-main class="grey lighten-5">
      <router-view></router-view>
    </v-main>
  
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',

  components: {
    Navbar
  },
  computed:{
    userAuth(){return this.$store.state.userAuth}
  }

};
</script>
