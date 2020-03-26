<template>
  
    <div class="fret-group">
      <fret-tone 
        :index="index"
        :string-index="stringIndex"
        :root="root"
        :fretSize="fretSize"
        class="fret-tone"
      ></fret-tone>
      <div 
        :style="diapasonStyle('top')"
      ></div>
      <div
        :style="stringStyle()"
      ></div>
      <div 
        :style="diapasonStyle('bottom')"
      ></div>
      
    </div>
</template>

<script>
  import FretTone from "@/components/FretTone.vue";
  export default {
    components: {
      FretTone
    },
    props: {
      marker: {
        type: String,
        default: undefined
      },
      tone: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0
      },
      stringIndex: {
        type: Number,
        default: 0
      },
      root: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      top() {
        return this.stringIndex == 0
      },
      bottom() {
        let strings = this.$store.state.stringCount;
        return this.stringIndex == strings - 1
      },
      fretSize() {
        return this.$store.getters['fretboard/fretSize']
      },
      stringHeight() {
        return this.$store.getters['fretboard/stringHeight']
      },
      diapasonColor() {
        return this.$store.state.fretboard.diapasonColor
      },
      fretbarColor() {
        return this.$store.state.fretboard.fretbarColor
      },
      stringColor() {
        return this.$store.state.fretboard.stringColor
      },
      hidden() {
        return this.index == 0
      },
      winSize() {
        return window.width + '-' + window.height
      }  
    },
    methods: {
      diapasonStyle(edge) {
        let height = this.fretSize.height;
        let isHidden = this.hidden
          || (edge == 'top' && this.top)
          || (edge == 'bottom' && this.bottom)
        let style = {
          width: `${this.fretSize.width}px!important`,
          height: `${height}px!important`,
          borderStyle: isHidden ? 'hidden':'solid',
          borderWidth: `0px ${this.fretSize.barWidth}px`,
          borderColor: this.fretbarColor,
          backgroundColor: isHidden ? 'rgba(1, 0, 0, 0)': `${this.diapasonColor}`
        }
        return style
      },
      stringStyle(){
        return {
          width: `${this.fretSize.width}px!important`,
          height: `${this.stringHeight}px!important`,
          backgroundColor: this.hidden ? 'rgba(1, 0, 0, 0)' : this.stringColor
        }
      },
    },
  }
</script>

<style lang="sass" scoped>
.fret-group
  display: inline-block
  vertical-align: top


.diapason-color
  background-color: map-get($diapason, color)

.fret-color
  background-color: map-get($fret, color)

.hidden-fret
  background-color: rgba(1, 0, 0, 0)

.string-color
  background-color: map-get($string, color)

.fret-tone
  position: absolute!important
  z-index: 1

.top-edge
  padding-top: map-get($diapason, height)!important
  
</style>


