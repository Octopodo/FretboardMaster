<template>
  <v-app id="app">
    <appbar/>
    <v-content>
        <fretboard-content/>
      
    </v-content>
    
  </v-app>
</template>

<script>
import FretboardContent from "@/components/Content";
import Appbar from '@/components/Appbar'

export default {
  name: 'App',
  components: {
    FretboardContent,
    Appbar
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize(){
      this.$store.commit('fretboard/SET_FRETBOARD_WIDTH')
    },
  }
}
</script>

<style lang="sass">
@import "styles/styles.scss"

</style>
