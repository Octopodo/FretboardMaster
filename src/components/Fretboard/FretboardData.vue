<template>
  <div>

  </div>
</template>

<script>
  import { Fretboard } from '@/lib/fretboard.js'
  import ChordsInterface from '@/lib/chords-interface.js'
  import Scales from '@/lib/scales-interface'
  import Vue from 'vue'
  import _ from 'underscore'

  
  export default {
    props: {
      frets: {
        type: Number,
        default:21 
      },
      strings: {
        type: Number,
        default: 6,
      },
      tunning: {
        type: Array,
        default: [ 'E4','B3', 'G3', 'D3', 'A2', 'E2' ]
      }
    },
    computed: {
      root() {
        let length = this.tunning.length - 1
        return this.tunning[length] 
      }
    },
    data() {
      return {
        fretboard: undefined
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>

</style>