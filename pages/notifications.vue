<template>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#385F73"
            dark
          >
            <v-card-title class="headline">Electives!</v-card-title>

            <v-card-subtitle>Apply to handle electives before 30th March 2020</v-card-subtitle>


          </v-card>
        </v-col>

           

        <v-col cols="12">
          <v-card
            color="#385F73"
            dark
          >
            <v-card-title class="headline">Announcement</v-card-title>

            <v-card-subtitle>Faculty members now get travel grants to attend conferences</v-card-subtitle>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card
            color="#385F73"
            dark
          >
            <v-card-title class="headline">NEWS!</v-card-title>

            <v-card-subtitle>Amrita Team bi0s Member Discovers Security Bug in QEMU</v-card-subtitle>
          </v-card>
        </v-col>


        

        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
