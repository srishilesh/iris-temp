<template>
    <v-container>
        <v-row>
            <v-col>
                
            </v-col>
            <v-col cols="12" md="4">
                <form method="post" @submit.prevent="recover">
                    <v-text-field
                    v-model="email"
                    label="What's your email?"
                    required
                    outlined
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    ></v-text-field>

                    <v-btn class="mr-4" @click="forgot">Send help plis</v-btn>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { validationMixin } from "vuelidate"
    import { required, email } from "vuelidate/lib/validators"

    export default {
        mixins: [validationMixin],

        validations: {
            email: { required, email }
        },

        data() {
            return {
                email: '',
                msg: '',
                result: ''
            }
        },

        computed: {
            emailErrors() {
                const errors = []
                if(!this.$v.email.$dirty) return errors
                !this.$v.email.required && errors.push('Email is required!')
                !this.$v.email.email && errors.push('Enter email with proper format!')
                return errors
            }
        },

        methods: {
            recover: function() {
                this.$axios
                .post('recover', { email: this.email })
                .then((res) => {
                    this.result = 'success'
                    this.msg = res.data.message
                    setTimeout(() => {this.router.push("/verify"+this.email)}, 1500)
                })
                .catch((err) => {
                    this.result = 'error'
                    this.msg = err.response.data.message || err.response.data.error || err;
                    console.log(err)
                })
            }
        }
    }
</script>