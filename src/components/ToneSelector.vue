<template>
  <div>
    <v-col>
      <v-btn-toggle dark class="buttons">
        <v-btn
          v-for="(item, index) in availableTones"
          :key="index"
          @click="changeTone(index)"
        >
          {{ item }} 
        </v-btn>
      </v-btn-toggle>
      <v-row class="scale-notes d-flex justify-center">
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
        
      </v-row>

    </v-col>
    
  </div>
</template>

<script>
  export default {
    computed: {
      tone(){
        return this.$store.state.tone.currentTone
      },
      availableTones() {
        return this.$store.state.tone.availableTones
      },
      scale() {
        return this.$store.state.tone.currentScale.notes
      }
    },
    methods: {
      changeTone(tone){
        this.$store.dispatch('tone/changeTone', tone)
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