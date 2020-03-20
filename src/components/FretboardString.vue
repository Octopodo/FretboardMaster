<template>
  <div class="string">
<!-- 
    <fret hidden :stringIndex="stringIndex" root></fret> -->
    <fret  
      v-for="(fret, index) in fretCount" 
      :key="index" 
      :hidden="index == 0"
      :string-index="stringIndex" 
      :index="index"
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
    },
    data() {
      return {
        fretCount: 20
      }
    },
  }
</script>

<style lang="sass" scoped>
</style>