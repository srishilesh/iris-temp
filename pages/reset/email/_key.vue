<template>
    <v-container>
        <v-row>
            <v-col>
                
            </v-col>
            <v-col cols="12" md="4">
                <form method="post" @submit.prevent="recover">
                    <v-text-field
                    v-model="password"
                    label="Enter your new password!"
                    required
                    outlined
                    :error-messages="passwordErrors"
                    @input="$v.otp.$touch()"
                    @blur="$v.otp.$touch()"
                    ></v-text-field>

                    <v-btn class="mr-4" @click="submit">Submit OTP</v-btn>
                    <nuxt-link to="/forgot-password" style="text-decoration: none;">Go back?</nuxt-link>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                password: '',
                msg: null,
                result: 'error'
            }
        },

        methods: {
            recover: function() {
                this.$axios
                .post('', {password: this.password})
                .then((res) => {
                    this.result = 'success'
                    this.msg = res.data.message
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 1500)
                })
                .catch((err) => {
                    this.result = 'error'
                    this.msg = err.response.data.message || err.response.data.error || err
                    console.log(err)
                })
            }
        }
    }
</script>
