<template>
  <v-app id="app">
    <fretboard-content/>
  </v-app>
</template>

<script>
import FretboardContent from "@/components/Content";

export default {
  name: 'App',
  components: {
    FretboardContent
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
