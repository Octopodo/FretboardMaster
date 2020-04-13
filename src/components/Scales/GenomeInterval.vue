<template>
  <div style="height: 100%" >
    <v-col style="height: 100%" class="d-flex align-center justify-center">
      <div>
        <div
          v-for="(int, i) in intervals"
          :key="i"
          :style="ballStyle(i)"
          class="d-flex align-center justify-center font-weight-black"
          @click.prevent="select(i)"
        >
          <div>
            {{int}}
          </div>
        </div>
      </div>
    </v-col >
  </div>
</template>

<script>
  import { rgbToHex, hexToRgb } from '@/lib/utils.js'

  export default {
    props: {
      size: {
        type: Number,
        default: 30
      },
      intervals: {
        type: Array,
        default: () => {return []}
      },
      tips: {
        type: Array,
        default: () => {return []}
      },
      selection: {
        type: Number,
        default: -1
      },
      index: {
        type: Number,
        default: 0
      }
    },
    computed: {
      color() {
        let color = this.$store.getters['fretboard/get']('functionColors')[this.hFunction];
        this.$emit('set-interval-color', {index: this.index, color: color})
        return color
      },

      interval() {
        let selection = this.selection;
        return this.selection == -1 ? 'blank' : this.intervals[this.selection]
      },
      border() {
        return Math.floor(this.size/8)
      },
      hFunction() {
        return this.interval.replace( /[1-9]/g, '')
      },
      fontSize() {
        let size = Math.floor(this.size/3) 
        return size < 10 ? 10 : size
      },
      margin() {
        return Math.floor(this.size/4)
      }
    },

    methods: {
      select(index) {
        let selection = index == this.selection ? -1 : index;
        this.$emit('interval-selected', {selection: selection, interval: this.index})
      },
      ballStyle(index) {
        let selected = index == this.selection
        let color = this.color;
        color = selected ?  this.color : '#FFFFFF';
        
        let backgroundColor = color;
        let dark = 60;
        color = hexToRgb(color);
        color.r -= dark;
        color.g -= dark;
        color.b -= dark;
        let border = selected 
          ? `${this.border}px solid rgba(${color.r}, ${color.g},${color.b})` 
          : `${this.border}px solid #616161`

        let style = {
          backgroundColor: backgroundColor,
          width: `${this.size}px`,
          height: `${this.size}px`,
          borderRadius: '50px',
          border: border,
          fontSize: `${this.fontSize}pt`,
          cursor: 'pointer',
          userSelect: 'none',
          marginBottom: `${this.margin}px!important`
        }
        return style
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>