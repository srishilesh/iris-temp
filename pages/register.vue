<template>
    <v-container>
        <v-row>
            <v-col>
                
            </v-col>
            <v-col cols="12" md="5">
                <form>
                    <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="What's your e-mail address?"
                    required
                    outlined
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                    v-model="password"
                    :error-messages="passwordErrors"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show =! show"
                    :type="show ? 'text' : 'password'"
                    label="Classified! Enter your password"
                    required
                    outlined
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    ></v-text-field>

                    <!-- <v-text-field
                    v-model="registrationPassword"
                    :error-messages="passwordErrors"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show =! show"
                    :type="show ? 'text' : 'password'"
                    label="Re-enter your password, please"
                    required
                    outlined
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    ></v-text-field>             -->

                    <v-alert type="success" v-if="result === 'success'">
                        Registration successful!
                    </v-alert>

                    <v-alert type="error" v-if="result === 'error'">
                        Error in Registration! Try later.
                    </v-alert>

                    <v-btn id="registerButton" class="mr-4" @click="register">Submit</v-btn>
                    <v-btn @click="clear">Clear</v-btn>
                </form>
            </v-col>
            <v-col>
                
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { validationMixin } from 'vuelidate';
    import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
    import firebase from 'firebase'

    export default {

        mixins: [validationMixin],

        validations: {
            password: { required, maxLength: maxLength(20), minLength: minLength(8) },
            rollNumber: { required },
            email: { required, email }
        },

        data() {
            return {
                email: '',
                password: '',
                show: false,
                result: '',
                msg: ''
            }
        },

        computed: {
            passwordErrors() {
                const errors = []
                if(!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Password is required!')
                !this.$v.password.minLength && errors.push('Must be at least 8 characters')
                !this.$v.password.maxLength && errors.push('Must be at most 20 characters')
                return errors
            },

            // branchErrors() {
            //     const errors = []
            //     if(!this.$v.branch.$dirty) return errors
            //     !this.$v.branch.required && errors.push('Please select your branch!')
            //     return errors
            // },

            // genderErrors() {
            //     const errors = []
            //     if(!this.$v.gender.$dirty) return errors
            //     !this.$v.gender.required && errors.push('Don\'t forget to select your gender :)')
            //     return errors
            // },

            // firstNameErrors() {
            //     const errors = []
            //     if(!this.$v.firstName.$dirty) return errors
            //     !this.$v.firstName.minLength && errors.push('Must be at least 4 characters!')
            //     !this.$v.firstName.maxLength && errors.push('Must be at most 16 characters!')
            //     !this.$v.firstName.required && errors.push('First Name is required!')
            //     return errors
            // },

            // lastNameErrors() {
            //     const errors = []
            //     if(!this.$v.lastName.$dirty) return errors
            //     !this.$v.lastName.maxLength && errors.push('Must be at most 16 characters!')
            //     !this.$v.lastName.required && errors.push('Last Name is required!')
            //     return errors
            // },

            // rollnoErrors() {
            //     const errors = []
            //     if(!this.$v.rollNumber.$dirty) return errors
            //     !this.$v.rollNumber.required && errors.push('Roll Number is required!')
            //     return errors
            // },

            emailErrors() {
                const errors = []
                if(!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be a valid e-mail!')
                !this.$v.email.required && errors.push('E-mail is required!')
                return errors
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

        methods: {
            register() {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                if(this.authenticatedUser) {
                    this.$router.push("/")
                }
            },

            redir() {
                this.$router.push("/login")
            },

            clear() {
                this.$v.$reset()
                this.password = ''
                this.email = ''
                this.show = false
            }
        }
    }
</script>