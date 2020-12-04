<template>
  <div>
    <div>
      <v-row :style="containerStyle">
        <v-col v-for="(quality, i) in intervals" :key="`A-${i}`">
          <div
            v-if="standalone"
            :style="miniatureStyle(i)"
            class="d-flex justify-center"
          >
            {{i + 1}}
          </div>
          <genome-interval
            v-for="interval in quality"
            :key="interval"
            class="d-flex justify-center"
            :size="intervalSize"
            :index="intervalsMap[interval - 1 + i].step"
            :interval="( interval  + i).toString()"
            @interval-selected="setSelection"
            @set-interval-color="0"
          >
          </genome-interval>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import GenomeInterval from '@/components/Scales/GenomeInterval'
  import IntervalsMap from '@/constants/interval-map.js'
  export default {
    components: {
      GenomeInterval
    },

    props: {
      intervalSize: {
        type: Number,
        default: 40
      },
      standalone: {
        type: Boolean,
        default: true
      },
      width: {
        type: Number,
        default: 600
      },
      intervals: {
        type: Array,
        default: () => [1, 2, 2, 3, 3, 2, 2, 1]
      }
    },
    data() {
      return {
        intervalsMap: IntervalsMap.get()
      }
    },
    computed: {
      containerStyle() {
        let style = {
          width: `${this.width}px`
        } 
        return style
      },
    },

    created(){
      var stop = 0;
      var re = 10
    },

    methods: {
      miniatureStyle(index) {
        let interval = this.intervals[index]
        let style = {
          backgroundColor: interval.color,
          width: '100%',
          height: '20px'
        }
        return style
      },
      setSelection() {

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>