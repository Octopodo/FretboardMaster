<template>
  <v-app id="app">
    <appbar/>
    <fretboard-content/>
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
      this.$store.dispatch('fretboard/setFretboardSize')
    },
  }
}
</script>

<style lang="sass">
@import "styles/styles.scss"

</style>
