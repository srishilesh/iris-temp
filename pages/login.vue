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

                    <v-btn class="mr-4" @click="submit">Login</v-btn>
                    <v-btn @click="submit"><nuxt-link to="/forgot-password" style="text-decoration: none;">Forgot Password!</nuxt-link></v-btn>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { validationMixin } from "vuelidate"
    import { required } from "vuelidate/lib/validators"

    export default {
        mixins: [validationMixin],

        validations: {
            email: { required },
            password: { required },
            remember : { required }
        },

        data() {
            return {
                rollNumber: '',
                password: '',
                remember: '',
                show: false,
                checkbox: false
            }
        },

        computed: {

        },

        methods: {
            submit() {
                this.login()
            },
            async login() {
                await this.$axios
                    .post("localhost:8081/login", {
                        email: this.email,
                        password: this.password,
                        remember: this.remember
                    })
                    .then(res => {
                        this.result = 'success';
                        this.msg = res.data.message;
                    })
                    .catch(err => {
                        this.result = 'error';
                        this.msg = err.response.data.message || err.response.data.error || err;
                        console.log(err);
                    })
            },
            touch() {

            }
        }
    }
</script>