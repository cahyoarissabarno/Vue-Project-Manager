<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="mode == 'add'" v-bind="attrs" v-on="on" class="success">
                Add New Project
            </v-btn>
            <v-btn v-if="mode == 'edit'" v-bind="attrs" v-on="on" @click="getProjects" class="primary align-self-center mr-3">
                Edit
              </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h2 v-if="mode == 'add'">Add a New Project</h2>
                <h2 v-if="mode == 'edit'">Edit Project</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules">{{title}}</v-text-field>
                    <v-textarea label="Information" v-model="content" prepend-icon="mdi-pencil" :rules="inputRules">{{content}}</v-textarea>
                    
                    <v-menu v-model="popup" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-bind="attrs" v-on="on" :value="due" label="Due Date" prepend-icon="mdi-calendar-range" v-model="due" readonly></v-text-field>
                            <span v-if="mode == 'edit'">Recent Due : {{recentDue}}</span>
                        </template>
                        <v-date-picker v-model="due" @input="popup = false"></v-date-picker>
                    </v-menu>

                    <v-btn text class="success mx-0 mt-3" @click="submit" :loading="loading" v-if="mode == 'add'">Add Project</v-btn>
                    <v-btn text class="primary mx-0 mt-3" @click="submit" :loading="loading" v-if="mode == 'edit'">Update Project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import db from '@/fb'

export default{
    props:['mode','Id'],
    data(){
        return{
            title:'',
            content:'',
            recentDue: '',
            due: '',
            popup: false,
            inputRules:[
                v => v.length >= 3 || 'Minimum length is 3 Character'
            ],
            loading: false,
            dialog: false
        }
    },
    methods:{
        submit(){
            if (this.$refs.form.validate()) {
               this.loading = true;
               const project = {
                   title: this.title,
                   content: this.content,
                   due: this.due ? this.due : this.recentDue,
                   person: 'The Net Ninja',
                   status: 'ongoing'
               }

               if (this.mode == 'add') {
                db.collection('projects').add(project).then(()=>{
                    this.loading = false;
                    this.dialog = false;
                    this.$emit('projectAdded')
                })
               }
               if (this.mode == 'edit') {
                db.collection('projects').doc(this.Id).update(project).then(()=>{
                    this.loading = false;
                    this.dialog = false;
                    this.$emit('projectEdited')
                })    
               }
            }
        },
        getProjects(){
            if (this.Id) {
                var project = this.$store.state.projects.filter(project => {
                    return project.id === this.Id
                })
                
                this.title = project[0].title
                this.content = project[0].content
                this.recentDue = project[0].due
            }
        }
    }
}
</script>