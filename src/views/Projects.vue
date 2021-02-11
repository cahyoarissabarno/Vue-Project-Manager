<template>
  <div class="projects">
    <v-snackbar v-model="snackbarDel" top color="error">
      Project Deleted
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbarDel = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarEdit" top color="primary">
      Project Edited
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbarEdit = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-subheader class="grey--text">Projects</v-subheader>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in myProjects" :key="project.title">
          <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card>
              <v-card-text class="px-4 grey--text">
                <v-row no-gutters>
                  <v-col cols="12" sm="8" md="9">
                    <div class="font-weight-bold">{{project.due}}</div>
                    <div>{{project.content}}</div>
                  </v-col>
                  <v-col cols="4" md="3" class="d-flex justify-sm-end mt-sm-0 mt-4" max-width="200">
                    <v-dialog v-model="dialog" persistent max-width="300">
                      <template v-slot:activator="{ on, attrs }">
                        <Popup @projectEdited="snackbarEdit=true" mode="edit" :Id="project.id"/>
                        <v-btn color="error" dark v-bind="attrs" v-on="on" class="align-self-center">
                          Delete
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <v-row>
                            <v-col cols="2" class="px-0 mx-0">
                              <v-icon x-large color="error" class="pt-1">mdi-alert-circle-outline</v-icon>
                            </v-col>
                            <v-col cols="10">Are You Sure to Delete This Project ?</v-col>
                          </v-row>
                        </v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="success" text @click="dialog = false">No</v-btn>
                          <v-btn color="error" text @click="deleteProject(project.id)">Yes</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import db from '@/fb'
import Popup from '../components/Popup'

export default {
  components:{
    Popup
  },
  data () {
    return {
      dialog: false,
      snackbarDel: false,
      snackbarEdit: false,
    }
  },
  computed:{
    myProjects(){
      return this.$store.state.projects.filter(project => {
        return project.person === 'The Net Ninja'
      })
    }
  },
  methods:{
    deleteProject(id){
      this.dialog = false
      console.log(id)
      db.collection("projects").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
      })
      this.snackbarDel = true;
    }
  }
}
</script>
