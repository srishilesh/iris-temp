<template>
    <div>
        <v-alert>
            Wrong username / password
        </v-alert>
        <v-btn v-on:click="redirect()">
            Try Again!
        </v-btn>
    </div>
</template>

<script>
export default {
    methods: {
        redirect(){
            this.$router.push("/login")
        }
    }
}
</script>