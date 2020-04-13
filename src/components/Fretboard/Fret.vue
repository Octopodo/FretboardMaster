<template>
  <div
    :style="fretStyle"
    class="d-flex align-center"
    @dblclick.stop="toggleVisibility"
  >
    <transition name="scale-transition">
      <div
        v-if="visible" 
        :style="toneStyle"
        @click.prevent="toggleSelection"
        class="d-flex align-center justify-center"
      >
        <div class="unselectable">
          {{this.displayTone}}  
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script>
  import {Note} from '@tonaljs/tonal'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0,
      },
      indices: {
        type: Object,
        default: () => {return {string: 0, fret: 0 }}
      },
      stringHeight: {
        type: Number,
      }
    },

    computed: {
      ...mapGetters({
        defaultColor: 'fretboard/toneColor',
        textColor: 'fretboard/toneTextColor',
      }),
      displayTone() {
        return Note.pitchClass(this.pitch.note)
      },
      pitch() {
        let pitch = this.$store.getters['tone/getPitch']( this.indices.string, this.indices.fret);
        return pitch
      },

      selected(){
          return false//this.$store.getters['tone/toneIsSelected'](this.indices)
      },

      visible() {
        let pitch = this.pitch;
        // return true
        return this.pitch.scales.length > 0
      },

      selectedColor() {
        return this.$store.getters['fretboard/toneSelectedColor']('rgb')
      },

      fretStyle() {
        let style = {
          width: `${this.width}px`,
          height: `${this.height}px`,
          backgroundColor: 'rgba(255, 0, 0, 0)',
          cursor: 'pointer',
        }
        return style
      },

      color() {
        return this.defaultColor
      },
      
      toneStyle(){
        let size = this.$store.getters['fretboard/toneSize'];
        let color = this.color;
        let selectedColor = this.selectedColor;
        let roundness = this.$store.getters['fretboard/toneRoundness'];
        let relieve = `0px 0px ${size/10}px ${size/12}px rgba(0, 0, 0, 0.2) inset`;
        selectedColor = `0px 0px ${size/5}px ${size/5}px rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, 0.5)`
        let style = {
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: `${roundness}px`,
          backgroundColor: color,
          color: this.textColor,
          margin: 'auto',
          position: 'relatve',
          boxShadow: this.selected ? `${selectedColor}, ${relieve}` : relieve
        }
        return style
      },

      selectedStyle(){
        let size = this.$store.getters['fretboard/toneSize'];
        let style = this.toneStyle
        style.boxShadow = `0px 0px ${size/4} ${size/6}px ${this.selectedColor}`;
        style.position =' absolute'
        style.backgroundColor = 'rgba(0, 0, 0, 0)'
        return style
      },


    },
    data() {
      return {
        timer: 0,
        delay: 50,
        prvent: false
      }
    },
    methods: {
      toggleVisibility() {
        clearTimeout(this.timer);
        let payload = {fret: this.indices.fret, string: this.indices.string, value: false}
        this.prevent = true;
        this.$store.commit('tone/SWITCH_TONE_VISIBILITY', this.indices)
        this.$store.commit('tone/SWITCH_TONE_SELECTION', payload)
      },
      toggleSelection() {
        
        this.timer = setTimeout(() => {
          if (!this.prevent) {
            this.$store.commit('tone/SWITCH_TONE_SELECTION', this.indices)
          }
          this.prevent = false;
        }, this.delay);
      }
    }
  }
</script>

<style lang="sass" scoped>
.unselectable
  user-select: none
.scale-transition-enter-active
  transition: all .2s ease-in

.scale-transition-leave-active
  transition: all .2s ease-out


.scale-transition-enter,
.scale-transition-leave-to
  transform: scale(0)
</style>