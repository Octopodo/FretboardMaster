<template>
  <div>
    <v-row>
      <v-col xs="10">
        <div class="d-flex justify-center">
          <fretboard class="fretboard" />
        </div>
        
        <div class="divider"></div>
        <v-row class="">
          <v-col cols="3">
            <button-selector
              title = 'Dedos'
              model="fingers"
              module="tone"
              items="maxFingers"
              mutation="UPDATE_FINGERS"
            />
            <button-selector
              title = 'Posiciones'
              model="positions"
              module="tone"
              items="positionsCount"
              multiple
            />
          </v-col>
          <v-divider vertical></v-divider>
          <v-col>
            <tone-selector/>
            <scale-genome-panel class=""/>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col>
            <chord-cheatsheet></chord-cheatsheet>
          </v-col>
          
        </v-row>
        
        
        
      </v-col>
      
      
    </v-row>
    
  </div>
</template>

<script>
import Fretboard from   "@/components/Fretboard/Fretboard";
import ScaleGenomePanel from "@/components/Panels/ScaleGenomePanel";
import ToneSelector from  "@/components/Panels/ToneSelector"
import ChordCheatsheet from "@/components/Widgets/ChordCheatsheet"
import ButtonSelector from "@/components/Widgets/ButtonSelector";

export default {
  name: 'App',
  components: {
    Fretboard,
    ScaleGenomePanel,
    ButtonSelector,
    ToneSelector,
    ChordCheatsheet
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