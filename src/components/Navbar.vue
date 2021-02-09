<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome ! You added a new project.</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-toolbar flat app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase grey--text">
            <span class="font-weight-light">Project</span>
            <span>Manager</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>
  
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" color="grey">
              <v-icon left>mdi-chevron-down</v-icon>
              <span>Menu</span>
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group>
              <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                <v-list-tile-title>{{link.text}}</v-list-tile-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-btn text color="grey">
          <span>Sign Out</span>
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
    </v-toolbar>

    <v-navigation-drawer temporary app v-model="drawer" class="indigo">

      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/avatar-1.png">
          </v-avatar>
          <p class="white--text subheading">The Net Ninja</p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <Popup @projectAdded="snackbar=true" />
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-item-group>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route"> 
            <v-list-item-icon>
              <v-icon class="white--text">{{link.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
  
<script>
  import Popup from './Popup.vue'

  export default {
    components:{
      Popup
    },
    data(){
      return{
        drawer:false,
        snackbar: false
      }
    },
    computed:{
      links(){return this.$store.state.links}
    }
  }
</script>
  