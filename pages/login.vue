<template>
    <v-container>
        <v-row>
            <v-col>
                
            </v-col>
            <v-col cols="12" md="4">
                <form>
                    <v-text-field
                    v-model="email"
                    label="What's your email?"
                    required
                    outlined

                    ></v-text-field>
                    
                    <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show =! show"
                    :type="show ? 'text' : 'password'"
                    label="Classified! Enter your password"
                    required
                    outlined
                    
                    ></v-text-field>

                    <v-checkbox
                    v-model="checkbox"
                    :label="`Remember Me? : ${checkbox}`"
                    ></v-checkbox>

                    <v-btn id="loginButton" class="mr-4" @click="loginUser()">Login</v-btn>
                    <v-btn @click="submit"><nuxt-link to="/forgot-password" style="text-decoration: none;">Forgot Password!</nuxt-link></v-btn>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { validationMixin } from "vuelidate"
    import { required } from "vuelidate/lib/validators"

    import firebase from 'firebase'

    export default {
        mixins: [validationMixin],

        validations: {
            email: { required },
            password: { required },
            remember : { required }
        },

        middleware: ['auth'],

        data() {
            return {
                rollNumber: '',
                password: '',
                email: '',
                remember: '',
                show: false,
                checkbox: false
            }
        },

        asyncData() {
            return {
                authenticatedUser: null
            }
        },

        created() {
            firebase.auth().onAuthStateChanged(user => (this.authenticatedUser = user))
        },

        computed: {

        },

        methods: {
            // async loginUser() {
            //     this.$store.dispatch('auth/login', {
            //         email: this.email,
            //         password: this.password
            //     }).then(result => {
            //         this.alert = {type: 'success', message: result.data.message}
            //         this.$router.push('/')
            //     }).catch(error => {
            //         if (error.response && error.response.data) {
            //         this.alert = {type: 'error', message: error.response.data.message || error.reponse.status}
            //         }
            //     })
            // },
            touch() {

            }
        },
        beforeCreate() {
            if(this.$auth.loggedIn) {
                this.$router.push('/')
            }
        },
    }
</script>