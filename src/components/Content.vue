<template>
  <div>
    <v-row>
      <v-col cols="2">
        <scale-selector/>
      </v-col>
      <v-col xs="10">
        
        <fretboard class="fretboard" />
        <tone-selector class="tone-selector"></tone-selector>
        <div class="divider"></div>
        <!-- <options/> -->
      </v-col>
      
    </v-row>
    
  </div>
</template>

<script>
import Fretboard from "@/components/Fretboard";
import ScaleSelector from "@/components/ScaleSelector"
// import Options from "@/components/Options"
import ToneSelector from '@/components/ToneSelector'

export default {
  name: 'App',
  components: {
    Fretboard,
    ScaleSelector,
    ToneSelector,
    // Options
  }
}
</script>

<style lang="sass" scoped>
.tone-selector
  margin-left: 25%!important
  margin-top:2%
  margin-bottom: 2%

.fretboard
  margin-top: 50px!important

.divider
  height: 2px
  background-color: LightGray

</style>