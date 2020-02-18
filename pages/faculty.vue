<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">Faculty Details</h1>
    </v-card-title>
    <div style="display: none">
      Welcome 
    </div>
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
        <br>

      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>

        <v-card class="d-flex justify-center">
          <v-btn class="mr-4" @click="showAttendance()">Show Attendance Summary</v-btn>
        </v-card>

        <br><br>

        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>

          <vue-grid align="top" justify="between">
              <vue-cell width=6of12>
                <p class="box">Update Attendance before 30th March</p>
              </vue-cell>
              <vue-cell width=6of12>
                <p class="box">Conduct Class Committee Meeting</p>
              </vue-cell>
              <vue-cell width=6of12>
                <p class="box">Collect exam scripts</p>
              </vue-cell>
              <vue-cell width=6of12>
                <p class="box">Conduct session on higher studies</p>
              </vue-cell>
              <vue-cell width=6of12>
                <p class="box">Update Attendance before 30th March</p>
              </vue-cell>
              <vue-cell width=6of12>
                <p class="box">Update Marks on AUMS</p>
              </vue-cell>
              <vue-cell width=6of12>
                <p class="box">Paper Publishing Deadline - 28th Feb</p>
              </vue-cell>
              <vue-cell width=6of12>
                <p class="box">Generate FA Warning List</p>
              </vue-cell>
          </vue-grid>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>
          <v-overflow-btn
          class="my-2"
          :items="dropdownItems"
          label="Select Class"
          target="#dropdown-example"
          @change="view()"
        ></v-overflow-btn>

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
.box {
    display: flex;
    background: var(--dark);
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
</style>

<script>

  import {
    VueGrid, 
    VueCell
  } from 'vue-grd';

  export default {
    data () {
      return {
        dropdownItems: ['3-CSE-E', '3-CSE-B'],
        tab: null,
        items: [
          'Attendance Summary', 'To-Do List', 'Class TimeTable'
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        result: '',
        headers: [
          {
            text: 'Class',
            align: 'left',
            sortable: false,
            value: 'class',
          },
          { text: 'Date', value: 'date' },
          { text: 'Attendance', value: 'attendance' },
        ],
        desserts: [
          {
            class: '15CSE301',
            date: '01/02/2020',
            attendance: 'Present'
          },
          {
            class: '15CSE401',
            date: '01/02/2020',
            attendance: 'Present'
          },
          {
            class: '15CSE301',
            date: '02/02/2020',
            attendance: 'Present'
          },
          {
            class: '15CSE401',
            date: '02/02/2020',
            attendance: 'Absent'
          },
          {
            class: '15CSE301',
            date: '03/02/2020',
            attendance: 'Present'
          },
          {
            class: '15CSE401',
            date: '03/02/2020',
            attendance: 'Absent'
          },
          {
            class: '15CSE301',
            date: '04/02/2020',
            attendance: 'Present'
          },
          {
            class: '15CSE401',
            date: '04/02/2020',
            attendance: 'Absent'
          },
          {
            class: '15CSE301',
            date: '05/02/2020',
            attendance: 'Present'
          },
          {
            class: '15CSE401',
            date: '05/02/2020',
            attendance: 'Absent'
          },
        ],
      }
    },
    components: {
      VueGrid,
      VueCell
    },
    methods: {
      async showAttendance() {
        await this.$axios
          .post("http://localhost:8081/check_balance_leave", {
            email: this.email
          })
          .then(res => {
            this.result = 'success'
            console.log(this.result)
          })
          .catch(err => {
            this.result = 'error'
            console.log(this.result)
          })
      },
      view() {

      }
    }
  }
</script>

