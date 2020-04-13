<template>
  <div>

  </div>
</template>

<script>
  import {Scale, Note, Intervals} from '@tonaljs/tonal'
  import _ from 'underscore'
  export default {
    props: {
      scaleIndex: {
        type: Number,
        default: 0 
      },
    },
    computed: {
      currentScale: {
        get() {
          return this.$store.getters['tone/currentScale']
        },
        set(newScale) {
          this.$store.commit('tone/SET_CURRENT_SCALE', newScale)
        }
      }
    },
    created(){
      this.$_intervals = this.$store.getters['tone/getScale']()
    },
    data() {
      return {
        $_intervals: []
      }
    },
    methods: {
      addInterval(interval){
        let intervals = this.currentScale.intervals;
        let match = _.find(intervals, function(int) {return int == interval});
        if(!match) {
        
        }


      }
    }  
  }
</script>
