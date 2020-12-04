<template>
  <div
    :style="fretStyle"
    class="d-flex align-center"
    @click.prevent="toggleSelection"
    @contextmenu.prevent="rightClick"
  >
    <transition name="scale-transition">
      <div
        v-if="visible" 
        :style="[toneStyle] "
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
  import {Note, Chord} from '@tonaljs/tonal'
  import { mapGetters } from 'vuex'
  import _ from 'underscore'
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
      },
      alwaysVisible: {
        type: Boolean,
        default: false
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


      visible() {
        if(this.alwaysVisible) {
          return true
        }
        
        return this.$data.$_visible 
      },
      scale () {
        let positions = this.$store.getters['tone/positions']
        return this.$store.getters['tone/activeScale']
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
        selectedColor = `0px 0px ${size/12}px ${size/5}px rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, 0.5)`
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

    },
    created() {
      this.$data.$_visible = this.isInPosition();
    },
    data() {
      return {
        timer: 0,
        delay: 50,
        prvent: false,
        $_visible: false,
        $_selectionColor: '#FFFFFF',
        selected: false
      }
    },

    watch: {
      scale() {
        this.$data.$_visible = this.isInPosition() 
      }
    },
    methods: {
      isInPosition() {
        let positions = this.$store.getters['tone/positions'];
        let chords = this.$store.getters['tone/chords'];
        let inPosition = (positions.length == 0 || _.intersection(this.pitch.positions, positions).length > 0 ) 
          && this.pitch.scales.length > 0;
        let isInChord =  chords.some(item => {
          let chord = Chord.get(item)
          let i = 0;
        })
        return inPosition
      },

      rightClick() {

        this.$data.selected = !this.$data.selected

      },

      toggleSelection() {

        this.$data.$_visible = !this.$data.$_visible

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