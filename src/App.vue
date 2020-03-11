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
  }
}
</script>

<style lang="sass">
@import "styles/styles.scss"

</style>
