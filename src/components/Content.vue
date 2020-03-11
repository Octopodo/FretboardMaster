<template>
  <div>
    <v-row>
      <v-col cols="2">
        <scale-selector/>
      </v-col>
      <v-col xs="10">
        <fretboard class="ma-12" style="display: inline!important"/>
        <options/>
      </v-col>
      
    </v-row>
    
  </div>
</template>

<script>
import Fretboard from "@/components/Fretboard";
import ScaleSelector from "@/components/ScaleSelector"
import Options from "@/components/Options"

export default {
  name: 'App',
  components: {
    Fretboard,
    ScaleSelector,
    Options
  }
}
</script>

<style lang="scss" scoped>

</style>