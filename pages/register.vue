<template>
    <v-container>
        <v-row>
            <v-col>
                
            </v-col>
            <v-col cols="12" md="4">
                <form>
                    <v-text-field
                    v-model="firstName"
                    :error-messages="firstNameErrors"
                    label="Enter your first name, please :)"
                    required
                    outlined
                    @input="$v.firstName.$touch()"
                    @blur="$v.firstName.$touch()"
                    ></v-text-field>

                    <v-text-field
                    v-model="lastName"
                    :error-messages="lastNameErrors"
                    label="Enter your last name, please? :)"
                    required
                    outlined
                    @input="$v.lastName.$touch()"
                    @blur="$v.lastName.$touch()"
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

                    <v-text-field
                    v-model="rollNumber"
                    :error-messages="rollnoErrors"
                    label="What's your super unique roll number?"
                    required
                    outlined
                    @input="$v.rollNumber.$touch()"
                    @blur="$v.rollNumber.$touch()"
                    ></v-text-field>
            
                    <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="What's your e-mail address?"
                    required
                    outlined
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    ></v-text-field>

                    <v-select   
                    v-model="gender"
                    :items="genders"
                    :error-messages="genderErrors"
                    label="Select your gender"
                    required
                    outlined
                    @change="$v.gender.$touch()"
                    @blur="$v.gender.$touch()"
                    ></v-select>
            
                    <v-select   
                    v-model="branch"
                    :items="branches"
                    :error-messages="branchErrors"
                    label="Select your department"
                    required
                    outlined
                    @change="$v.branch.$touch()"
                    @blur="$v.branch.$touch()"
                    ></v-select>

                    <v-alert type="success" v-if="result === 'success'">
                        Registration successful!
                    </v-alert>

                    <v-alert type="error" v-if="result === 'error'">
                        Error in Registration! Try later.
                    </v-alert>

                    <v-btn class="mr-4" @click="submit">Submit</v-btn>
                    <v-btn @click="clear">Clear</v-btn>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { validationMixin } from 'vuelidate';
    import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

    export default {

        mixins: [validationMixin],

        validations: {
            firstName: { required, maxLength: maxLength(16), minLength: minLength(4) },
            lastName: { required, maxLength: maxLength(16) },
            password: { required, maxLength: maxLength(20), minLength: minLength(8) },
            rollNumber: { required },
            email: { required, email },
            gender: { required },
            branch: { required }
        },

        data() {
            return {
                firstName: '',
                lastName: '',
                password: '',
                show: false,
                rollNumber: '',
                email: '',
                gender: null,
                branch: null,
                branches: [
                    'CSE',
                    'EEE',
                    'EIE',
                    'ECE',
                ],
                genders: [
                    'Male',
                    'Female',
                    'Other',
                ],
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

            branchErrors() {
                const errors = []
                if(!this.$v.branch.$dirty) return errors
                !this.$v.branch.required && errors.push('Please select your branch!')
                return errors
            },

            genderErrors() {
                const errors = []
                if(!this.$v.gender.$dirty) return errors
                !this.$v.gender.required && errors.push('Don\'t forget to select your gender :)')
                return errors
            },

            firstNameErrors() {
                const errors = []
                if(!this.$v.firstName.$dirty) return errors
                !this.$v.firstName.minLength && errors.push('Must be at least 4 characters!')
                !this.$v.firstName.maxLength && errors.push('Must be at most 16 characters!')
                !this.$v.firstName.required && errors.push('First Name is required!')
                return errors
            },

            lastNameErrors() {
                const errors = []
                if(!this.$v.lastName.$dirty) return errors
                !this.$v.lastName.maxLength && errors.push('Must be at most 16 characters!')
                !this.$v.lastName.required && errors.push('Last Name is required!')
                return errors
            },

            rollnoErrors() {
                const errors = []
                if(!this.$v.rollNumber.$dirty) return errors
                !this.$v.rollNumber.required && errors.push('Roll Number is required!')
                return errors
            },

            emailErrors() {
                const errors = []
                if(!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be a valid e-mail!')
                !this.$v.email.required && errors.push('E-mail is required!')
                return errors
            }
        },

        methods: {
            async submit() {
                this.$v.$touch()
                await this.$axios
                    .post("", {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        password: this.password,
                        rollNumber: this.rollNumber,
                        email: this.email,
                        gender: this.gender,
                        branch: this.branch
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

            clear() {
                this.$v.$reset()
                this.firstName = ''
                this.lastName = ''
                this.password = ''
                this.rollNumber = ''
                this.email = ''
                this.gender = null
                this.branch = null
                this.show = false
            }
        }
    }
</script>