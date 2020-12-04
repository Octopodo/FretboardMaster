<template>
  <div style="height: 100%" >
    <v-col style="height: 100%" class="d-flex align-center justify-center">
      <div>
        <div
          :style="ballStyle"
          class="d-flex align-center justify-center font-weight-black"
          @click.prevent="select"
        >
          <div>
            {{interval}}
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
      interval: {
        type: String,
        default: 'P'
      },
      tip: {
        type: String,
        default: ''
      },
      selected: {
        type: Boolean,
        default: false 
      },
      index: {
        type: Number,
        default: 0
      }
    },
    computed: {
      color() {
        let color = this.$store.getters['fretboard/get']('functionColors')[this.interval];
        return color
      },
      // interval() {
      //   let selection = this.selection;
      //   return this.selection == -1 ? 'blank' : this.intervals[this.selection]
      // },
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
        this.$emit('interval-selected',  this.index)
      },

      ballStyle() {
        let color = this.color;
        color = this.selected ?  this.color : '#FFFFFF';
        
        let backgroundColor = color;
        let dark = 60;
        color = hexToRgb(color);
        color.r -= dark;
        color.g -= dark;
        color.b -= dark;
        let border = this.selected 
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

<style lang="sass" scoped>

</style>