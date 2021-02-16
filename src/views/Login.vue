<template>
    <div class="d-flex justify-center">
        <v-card class="px-8 pt-8 ma-5">
            <v-card-title>
                <h2>Login</h2>
            </v-card-title>
            <v-card-text>
                <span class="red--text">{{errorMessage}}</span>
                <v-form class="px-5 pt-5" ref="form">
                    <v-text-field label="Email" v-model="email" append-icon="mdi-at"></v-text-field>
                    <v-text-field 
                        label="Password" v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                        :type="show ? 'text' : 'password'" counter @click:append="show = !show"
                    ></v-text-field>
                    <v-btn text class="success mx-0 my-5" @click="login" :loading="loading">Login</v-btn>
                    <div>
                        <span>Don't have account ? </span><SignUp/>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import SignUp from '../components/SignUp'
import {auth} from '@/fb'

export default{
    components:{
        SignUp
    },
    data(){
        return{
            email:'',
            password:'',
            show:false,
            loading: false,
            errorMessage:''
        }
    },
    methods:{
        login(){
            if (this.$refs.form.validate()) {
                auth.signInWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    this.loading = false;
                    this.$router.push('/')
                }).catch((error) => {
                    this.errorMessage = error.message;
                });
            }
        }
    }
}
</script>