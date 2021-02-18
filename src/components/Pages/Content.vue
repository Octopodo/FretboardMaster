<template>
  <div>
    <v-row>
      <v-col xs="10">
        <div class="d-flex justify-center">
          <fretboard class="fretboard" />
          
        </div>
        
        <div class="divider"></div>
        <interval-boxes></interval-boxes>
        <v-row class="">
          <v-col cols="3">
            <v-checkbox
              v-model="hideUnmarkedNotes"
              :color="hideUnmarkedNotes ? 'green' : ''"
              label="Hide unmarked"
              class="ml-8"
              dense
            ></v-checkbox>
            <button-selector
              title="Interval Colors"
              model="intervalColors"
              module="tone"
              items="intervalColorsLength"
              multiple
            />
            
            <button-selector
              title="Strings"
              model="invisibleStrings"
              module="tone"
              items="stringCount"
              multiple
            />
            <button-selector
              title = 'Posiciones'
              model="positions"
              module="tone"
              items="positionsCount"
              multiple
            />
             <button-selector
              title = 'Dedos'
              model="fingers"
              module="tone"
              items="maxFingers"
              mutation="UPDATE_FINGERS"
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
import IntervalBoxes from "@/components/Experimental/IntervalBoxes"

export default {
  name: 'App',
  components: {
    Fretboard,
    ScaleGenomePanel,
    ButtonSelector,
    ToneSelector,
    ChordCheatsheet,
    IntervalBoxes
  },
  computed: {
    hideUnmarkedNotes: {
        get() {
          return this.$store.getters['fretboard/hideUnmarkedNotes']
        },
        set(value) {
          this.$store.commit('fretboard/SET', {wich: 'hideUnmarkedNotes', value: value})
        }
      },
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