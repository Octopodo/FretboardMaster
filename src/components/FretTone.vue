<template>
<div>
  <transition name="scale-transition">
    <div v-if="visible" :style="diapasonStyle" class="d-flex align-center">
      <div 
        ref="fret"
        class="tone-background"
        :style="toneStyle" 
        @click.prevent="select()"
      >
        <div 
          class="white--text d-flex align-center justify-center"
          :style="textStyle"
        >
          {{fret.tone}}
        </div>
      </div>
    </div>
  </transition>
</div>
  
</template>

<script>
  export default {
    props: {
      index: {
        type: Number,
        default: 0
      },
      stringIndex: {
        type: Number,
        default: undefined
      },
      root: {
        type: Boolean,
        default: false
      },
      fretSize: {
        type: Object
      }
    },
    computed: {
      fret() {
        return this.$store.getters['tone/fretTone'](this.index, this.stringIndex);
      },
      visible () {
        return this.root? true : this.$store.getters['tone/toneIsVisible'](this.fret.tone, this.index, this.stringIndex)
      },
      stringHeight() {
        return this.$store.state.fretboard.stringHeight
      },
      toneFontSize() {
        return this.$store.state.tone.toneFontSize
      },
      toneTextColor() {
        return this.$store.state.tone.toneTextColor
      },
      toneStyle() {
        return {
          backgroundColor: this.harmonicColor,
          width: `${this.$store.state.tone.toneSize}px`,
          height: `${this.$store.state.tone.toneSize}px`,
          borderRadius: `${this.$store.state.tone.toneRoundness}px`,
          boxShadow: this.selected 
            ? `0 0 0 ${this.$store.state.tone.selectedWidth}px ${this.$store.state.tone.selectedColor}` 
            : 'none',
          position: 'relative',
          lineHeight: '1.9em',
          cursor: 'pointer',
          textAlign: 'center',
          verticalAlign: 'middle',
          display:'inline-block',
          margin: 'auto',
          fontSize: `${this.toneFontSize}px!important`
        }
      },
      diapasonStyle() {
        let style = {
          width: `${this.fretSize.width}px!important`,
          height: `${this.fretSize.height * 2 + this.stringHeight}px!important`,
        }
        return style
      },
      harmonicColor() {
        return this.$store.getters['tone/getHarmonicColor'](this.fret.tone) + '!important'
      },
      textStyle() {
        return {
          color: `${this.toneTextColor}!important`
        }
      }
    },

    data() {
      return {
        selected: false,
        id: this.stringIndex.toString() + '-' + this.index.toString(),
        toneData: ''
      }
    },
    created(){
    },
    methods: {
      select() {
        this.selected = !this.selected
      }
    }
  }
</script>

<style lang="sass" scoped>

.scale-transition-enter-active
  transition: all .2s ease-in

.scale-transition-leave-active
  transition: all .2s ease-out


.scale-transition-enter,
.scale-transition-leave-to
  transform: scale(0)

.selected-fret
  box-shadow: 0 0 0 5px yellow
</style>