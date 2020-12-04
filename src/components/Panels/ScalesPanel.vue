<template>
  <div>
    <v-row>
      <div class="ml-4 mt-4">
        Mis escalas
      </div>
      <v-spacer></v-spacer>
      <v-btn icon color="error">
        <v-icon>mdi-music-note-off</v-icon>
      </v-btn>
      <v-btn icon color="success ml-2">
        <v-icon>mdi-music-note-plus</v-icon>
      </v-btn>
    </v-row>
    <div class="separator mx-0"></div>
    <div>
      <scale-maker/>
    </div>
  </div>
</template>

<script>
  import ScaleMaker from '@/components/Widgets/ScaleMakerWidget'
  export default {
    components: {
      ScaleMaker
    }
  }
</script>

<style lang="sass" scoped>
.separator
  width: 100%
  height: 1px
  background-color: rgba(0,0,0,0.3)
</style>