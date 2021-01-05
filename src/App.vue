<template>
  <v-app id="app">
    <appbar/>
    <v-main>
        <fretboard-content/>
        
    </v-main>
    
  </v-app>
</template>

<script>
import FretboardContent from "@/components/Pages/Content";

import Appbar from '@/components/App/Appbar'

export default {
  name: 'App',
  components: {
    FretboardContent,
    Appbar
  },
  created() {
    this.$store.dispatch('tone/initialize')
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize(){
      this.$store.dispatch('fretboard/setFretboardSize')
    },
  }
}
</script>

<style lang="sass">
@import "styles/styles.scss"

</style>
