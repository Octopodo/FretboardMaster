<template>
  <div
    :style="fretStyle"
    class="d-flex align-center"
    @click.prevent="toggleSelection"
    @contextmenu.prevent="nextSet()"
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
        showNotes: 'fretboard/showNotes',
        showIntervals: 'fretboard/showIntervals'
      }),
      displayTone() {
        let accidental = '',
            show = '';
        if(this.showNotes) {
          if(this.showIntervals) {
            accidental = Note.pitchClass(this.pitch.note).substr(1);
            show = this.interval + accidental;
            // show = Interval.quality(interval)
          } else {
            show = Note.pitchClass(this.pitch.note)
          }
        }
        return show
      },
      interval() {
        return this.pitch.interval[0]
      },
      pitch() {
        let pitch = this.$store.getters['tone/getPitch']( this.indices.string, this.indices.fret);
        return  pitch
      },


      visible() {
        if(this.alwaysVisible) {
          return true
        }
        let strings = this.$store.state.tone.invisibleStrings;
        let showString = strings.indexOf(this.indices.string) === -1;
        return this.$data.$_visible && showString && (this.ghostNotes || !this.hideUnmarked);
      },
      hideUnmarked() {
        return this.$store.state.fretboard.hideUnmarkedNotes && !this.isMarked;
      },
      scale () {
        let positions = this.$store.getters['tone/positions']
        return this.$store.getters['tone/activeScale']
      },

      selectedColor() {
        return this.$store.getters['fretboard/toneSelectedColor']('rgb')
      },

      ghostNotes() {
        console.log('IS GHOST', this.$store.getters['fretboard/ghostNotes'])
        return this.$store.getters['fretboard/ghostNotes']
      },
      opacity() {
        let opacity = this.ghostNotes && this.hideUnmarked  && !this.marked? this.$store.getters['fretboard/ghostNotesOpacity'] : 1;
    
        return opacity
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
        let intervalColors = this.$store.getters['tone/intervalColors'];
        let color = this.$store.state.fretboard.setColors[this.$data.set];
        if(intervalColors.length > 0){
          let setInterval = intervalColors.indexOf(this.interval - 1);
          if(setInterval >= 0) {
            color = this.$store.state.fretboard.intervalColors[this.interval - 1]
           } 
        }
        return color //this.defaultColor
      },
      
      

      toneStyle(){
        let size = this.$store.getters['fretboard/toneSize'],
            color = this.color,
            selectedColor = this.selectedColor,
            roundness = this.$store.getters['fretboard/toneRoundness'],
            relieve = `0px 0px ${size/10}px ${size/12}px rgba(0, 0, 0, 0.4) inset`;
        
        selectedColor = `0px 0px ${size/12}px ${size/5}px rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, 0.5)`
        let style = {
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: `${roundness}px`,
          backgroundColor: color,
          color: this.textColor,
          margin: 'auto',
          position: 'relatve',
          boxShadow: this.selected ? `${selectedColor}, ${relieve}` : relieve,
          opacity: this.opacity
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
        selected: false,
        isMarked: false,
        set: 0
      }
    },

    watch: {
      scale() {
        this.$data.$_visible = this.isInPosition() 
      },
      color() {
        let baseColor = this.$store.state.fretboard.setColors[0];
        this.isMarked = this.color !== baseColor;
        console.log('IS MARKED:', this.isMarked)

      },

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

      },

      nextSet() {
        let set = this.$data.set + 1
        let length = this.$store.state.fretboard.setColors.length
        this.$data.set =  set >= length ? 0 : set
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