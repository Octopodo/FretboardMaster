<template>
  <div>
    <div>
      <v-row :style="containerStyle">
        <v-col
          v-for="(interval, i) in $_intervals"
          :key="i"
          class="pa-0"
        >
          <div
            v-if="standalone"
            :style="miniatureStyle(i)"
            class="d-flex justify-center"
          >
            {{i + 1}}
          </div>
          <genome-interval
            class="d-flex justify-center"
            :size="intervalSize"
            :intervals="interval.values"
            :tips="interval.tips"
            :selection="interval.selection"
            :index="i"
            @interval-selected="setSelection"
            @set-interval-color="setMiniatureColor"
            :scale="scale"
          >
          </genome-interval>
          
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import GenomeInterval from '@/components/Scales/GenomeInterval'
  
  import _ from 'underscore'
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
      intervals: {
        type: Array,
        default: () => {
          return [
            { grade: 'I', values: ['P'], tips: ['Tónica'], selection: 0, color:''},
            { grade: 'II', values: ['M', 'm'], tips: ['Mayor', 'menor'], selection: -1, color:'' },
            { grade: 'III', values: ['M', 'm'], tips: ['Mayor', 'menor'], selection: -1, color:'' },
            { grade: 'IV', values: ['A', 'P', 'd'], tips: ['Augmentado', 'Perfecto', 'disminuido'], selection: -1, color:'' },
            { grade: 'V', values: ['A', 'P', 'd'], tips: ['Aumentado', 'Perfecto', 'disminuido'],selection: -1, color:'' },
            { grade: 'VI', values: ['M', 'm'], tips: ['Mayor', 'menor'],selection: -1, color:'' },
            { grade: 'VII', values: ['M', 'm'], tips: ['Mayor', 'menor'],selection: -1, color:'' },
            { grade: 'VIII', values: ['P'], titles: ['Octava'], selection: 0, color:'' }
          ]
        }  
      },
      width: {
        type: Number,
        default: 600
      }
    },
    computed: {
      intervalMap() {
        return this.$_intervals
      },
      containerStyle() {
        let style = {
          width: `${this.width}px`
        } 
        return style
      },
      scale() {
        this.getScale()
        return this.$store.getters['tone/activeScale']
      },

      scaleName() {
        let name = this.scale.name.split(' ');
        name.shift();
        return name.join(' ')
      }

    },
    created() {
      this.$_intervals = this.intervals;
      this.getScale();
      this.$store.getters['tone/getScales'](true, true)
    },
    data() {
      return {
        $_intervals: [],
        $_colors: [],
      }
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

      getScale() {
        let scale = this.$store.getters['tone/activeScale'];
        _.each(this.$_intervals, function(interval, key, list){
          interval.selection = key < list.length -1 ? -1 : interval.selection
        })
        _.each(scale.intervals, function(interval){
          let key = parseInt(interval.replace( /\D/g, '')) - 1;
          let grade = interval.replace(/[0-9]/g, '')
          let selection = this.$_intervals[key].values.indexOf(grade);
          this.$_intervals[key].selection = selection;
        }, this)
        var stop = 0
      },

      setIntervalsMap(intervals) {
        this.$_intervals = intervals
      },

      setSelection(payload) {
        let interval = this.$_intervals[payload.interval] 
        interval.selection = payload.selection;
        let scale = this.$store.getters['tone/getScale'](this.makeScale());
        this.$store.dispatch('tone/updateScale', scale)
      },

      setMiniatureColor(payload) {
        let interval = this.intervals[payload.index];
        interval.color = interval.selection != -1 ? payload.color : 'rgba(0,0,0,0)';

      },

      getColors(){
        let newColors = [];
        _.map(this.$_intervals, function(interval) {
          newColors.push({color: interval.color, grade: interval.grade})
        })
        return newColors
      },
      makeScale() {
        let scale = [];
        _.each(this.$_intervals, function(interval, key){
          let hfunction = interval.values[interval.selection];
          let grade = !hfunction ? false : (key + 1).toString() + hfunction;
          if(grade) {
            scale.push(grade);
          }
        })
        // scale.pop()
        // scale = this.$store.getters['tone/getScaleType'](scale)
        return scale
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>