<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">Faculty Details</h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      icons-and-text
      grow
    >
      <v-tab>
        Attendance Summary
        <v-icon>mdi-history</v-icon>
      </v-tab>
      <v-tab>
        To Do List
        <v-icon>mdi-playlist-check</v-icon>
      </v-tab>
      <v-tab>
        Class TimeTable
        <v-icon>mdi-calendar-clock</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card
          color="basil"
          flat
        >
        
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<style>
/* Helper classes */
/* .basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
} */
</style>

<script>
  export default {
    data () {
      return {
        tab: null,
        items: [
          'Attendance Summary', 'To-Do List', 'Class TimeTable'
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>

