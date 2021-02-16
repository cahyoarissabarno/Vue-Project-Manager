<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" color="blue">Sign Up</v-btn>
        </template>
        <v-card class="px-8 pt-8">
            <v-card-title>
                <h2>Sign Up</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-5 pt-5" ref="form">
                    <v-text-field label="Email" v-model="email" append-icon="mdi-at" :rules="inputRules"></v-text-field>
                    <v-text-field 
                        label="Password" v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="inputRules"
                        :type="show ? 'text' : 'password'" hint="At least 8 characters" counter @click:append="show = !show"
                    ></v-text-field>
                    <v-btn text class="primary mx-0 my-5" @click="signup" :loading="loading">Sign Up</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {auth} from '@/fb'

export default{
    data(){
        return{
            email:'',
            password:'',
            show:false,
            inputRules:[
                v => v.length >= 8 || 'Minimum length is 8 Character',
                v => !!v || 'Required.'
            ],
            loading: false,
            dialog: false
        }
    },
    methods:{
        signup(){
            if (this.$refs.form.validate()) {
                auth.createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    this.loading = false;
                    this.dialog = false;
                    this.$router.push('login')
                })
            }
        }
           
    }
}
</script>