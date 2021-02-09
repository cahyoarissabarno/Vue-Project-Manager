<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="success">
                Add New Project
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h2>Add a New Project</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
                    <v-textarea label="Information" v-model="content" prepend-icon="mdi-pencil" :rules="inputRules"></v-textarea>
                    
                    <v-menu v-model="popup" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field :rules="inputRules" v-bind="attrs" v-on="on" :value="due" label="Due Date" prepend-icon="mdi-calendar-range" v-model="due" readonly></v-text-field>
                        </template>
                        <v-date-picker v-model="due" @input="popup = false"></v-date-picker>
                    </v-menu>

                    <v-btn text class="success mx-0 mt-3" @click="submit" :loading="loading">Add Project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import db from '@/fb'

export default{
    data(){
        return{
            title:'',
            content:'',
            due: new Date().toISOString().substr(0, 10),
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
                   due: this.due,
                   person: 'The Net Ninja',
                   status: 'ongoing'
               }

               db.collection('projects').add(project).then(()=>{
                   this.loading = false;
                   this.dialog = false;
                   this.$emit('projectAdded')
                   console.log('added to db')
               })
            }
        }
    }
}
</script>