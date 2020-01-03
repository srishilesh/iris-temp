<template>
    <v-container>
        <v-row>
            <v-col>
                
            </v-col>
            <v-col cols="12" md="4">
                <form>
                    <v-text-field
                    v-model="rollNumber"
                    label="What's your super unique roll number?"
                    required
                    outlined
                    @input="$v.rollNumber.$touch()"
                    @blur="$v.rollNumber.$touch()"
                    ></v-text-field>
                    
                    <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show =! show"
                    :type="show ? 'text' : 'password'"
                    label="Classified! Enter your password"
                    required
                    outlined
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    ></v-text-field>

                    <v-btn class="mr-4" @click="submit">Login</v-btn>
                    <v-btn @click="submit">Forgot Password</v-btn>
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
            rollNumber: { required },
            password: { required }
        },

        data() {
            return {
                rollNumber: '',
                password: '',
                show: false
            }
        },

        computed: {

        },

        methods: {
            submit() {
                this.$v.$touch()
            }
        }
    }
</script>