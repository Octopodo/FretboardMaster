<template>
  <div>
    <div v-for="(string, index) in stringCount" :key="index" class="string-container mt-0">
      <fretboard-string
        style="" 
        :string-index="index"
      ></fretboard-string>
    </div>
    <v-row class="scale-notes">
      <v-col
        v-for="(note, index) in scale"
        :key="index"
        cols="1"
        class="headline font-weight-bold error--text mx-2"
      >
        {{note}}
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import FretboardString from "@/components/FretboardString"
  export default {
    components: {
      FretboardString,
    },
    computed: {
      scale(){
        return this.$store.state.tone.currentScale.notes
      },
      fretboardSize() {
        return this.$store.getters['fretboard/fretboardSize']
      }
    },

    data() {
      return {
        stringCount: 6,
        window: {
          width: 0,
          height: 0
        }
      }
    },
    created() {
      this.$store.commit('tone/SET_POSITIONS');
    },
    methods: {
      stringTone(tone) {
        return this.$store.getters['tone/stringTunning'](tone)
      }
    }
  }
</script>

<style lang="sass" scoped>
.string-container
  line-height: 0px!important
  grid-template-rows: map-get

.scale-notes
  width: 600px!important
</style>