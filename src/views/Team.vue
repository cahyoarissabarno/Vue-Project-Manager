<template>
    <div class="team">
      <v-subheader class="grey--text">Team</v-subheader>
      <v-container class="my-5">
        <v-layout wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="team in teams" :key="team.name">
                <v-card flat class="text-center ma-3">
                    <v-responsive class="pt-4">
                        <v-avatar size="100" class="grey lighten-2">
                            <img :src="team.avatar">
                        </v-avatar>
                    </v-responsive>
                    <v-card-text>
                        <div class="subheading">{{team.name}}</div>
                        <div class="grey--text">{{team.role}}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="grey">
                            <v-icon small left>mdi-message</v-icon>
                            <span>Message</span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
      </v-container>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  
  export default {
    computed:{
        teams(){
            return this.$store.state.teams
        }
    }
  }
  </script>
  