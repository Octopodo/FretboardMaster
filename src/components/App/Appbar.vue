<template>
  <div>
    <v-app-bar
      color="grey darken-4"
      dark
    >
      <!-- <v-toolbar-title> -->
        <v-row>
          <div class="title ml-5">Fretboard Master</div>
          <div class="caption grey--text ml-1">(alpha-0.4)</div>
        </v-row>
        
      <!-- </v-toolbar-title> -->
      <v-spacer></v-spacer>

      <v-btn icon  @click.prevent="drawer = true">
        <v-icon>mdi-settings</v-icon>
      </v-btn>
      
      
      <!-- </v-menu> -->
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        app
        temporary
        hide-overlay
        right
        width="400"
        color="black"
        dark
      > 

        <v-btn icon @click.prevent="drawer = false" class="ma-6" style="position: absolute; right:0px">
          <v-icon color="white">mdi-arrow-collapse-right</v-icon>
        </v-btn>
        <!-- <fretboard-style-controls/> -->
      </v-navigation-drawer>
  </div>
</template>

<script>
  // import FretboardStyleControls from '@/components/Panels/FretboardOptions'
  export default {
    components: {
      // FretboardStyleControls
    },
    data() {
      return {
        drawer: false
      }
    },
  }
</script>

<style lang="sass" scoped>
.semi-transparent
  opacity: 0.7!important


</style>