<template>
  <div class="string">
<!-- 
    <fret hidden :stringIndex="stringIndex" root></fret> -->

    <fret  
      v-for="(fret, index) in fretCount" 
      :key="index" 
      :hidden="index == 0"
      :stringIndex="stringIndex" 
      :index="index"
      :top="top"
      :bottom="bottom" 
    >
      
    </fret>
  </div>
</template>

<script>
  import Fret from "@/components/Fret.vue"
  export default {
    components: {
      Fret,
    },
    props: {
      stringIndex: {
        type: Number,
        default: undefined
      },
      top: {
        type: Boolean,
        default: false
      },
      bottom: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      tuning() {
        return this.$store.getters['tone/tunning'](this.stringIndex)
      }
    },
    data() {
      return {
        fretCount: 20
      }
    },
    methods: {
      fretTone() {

      }
    },
  }
</script>

<style lang="sass" scoped>
</style>