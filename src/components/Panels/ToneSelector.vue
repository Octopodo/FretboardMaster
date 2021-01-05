<template>
  <div>
    <v-col>
      <v-btn-toggle dark class="buttons">
        <v-btn
          class="text-capitalize"
          v-for="(item, index) in availableTones"
          :key="index"
          @click="changeTone(index)"
        >
          {{ pitchClass(item) }} 
        </v-btn>
      </v-btn-toggle>
      <!-- <v-row class="scale-notes d-flex justify-center">
        <v-row
          v-for="(note, index) in scale"
          :key="index"
          cols="1"
          class="display-2 font-weight-bold error--text mx-2"
        >
          <div> {{note}} </div>   
          <div style
            v-if="index < availableTones.length"
          > -
          </div>
        </v-row>
        
      </v-row> -->

    </v-col>
    
  </div>
</template>

<script>
  import { Note } from "@tonaljs/tonal";
  export default {
    computed: {
      tone(){
        return this.$store.state.tone.currentTone
      },
      availableTones() {
        let scale = this.$store.state.tone.chromaticScale
        console.log("SCALE:", scale)
        return scale
      },
      scale() {
        return this.$store.state.tone.chromaticScale
      }
    },
    methods: {
      changeTone(tone){
        let t = 0;
        this.$store.dispatch('tone/changeTone', tone)
      },
      pitchClass(tone){
        let n = Note.pitchClass(tone); 
        return Note.pitchClass(tone)
      },
    }
    
  }
</script>

<style lang="sass" scoped>
.buttons
  margin-bottom: 2%!important
.scale-notes
  width: 576px!important
  margin-top:2%!important
  text-align: center
</style>