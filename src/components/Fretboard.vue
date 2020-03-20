<template>
  <div>
    <div v-for="(string, index) in stringCount" :key="index" class="string-container mt-0">
      <fretboard-string
        style="" 
        :string-index="index"
      ></fretboard-string>
    </div>
    
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