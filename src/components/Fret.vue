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
      ></div>
    </transition>
    
  </div>
</template>

<script>
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
    },

    computed: {
      ...mapGetters({
        defaultColor: 'fretboard/toneColor',
        note: 'tone/getNote' 
      }),

      selectedColor() {
        return this.$store.getters['fretboard/toneSelectedColor']('rgb')
      },

      fretStyle() {
        let style = {
          width: `${this.width}px`,
          height: `${this.height}px`,
          backgroundColor: 'rgba(1, 0, 0, 0)',
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
          margin: 'auto',
          position: 'relatve',
          boxShadow: this.isSelected ? `${selectedColor}, ${relieve}` : relieve
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

      visible(){
        console.log(this.isVisible)
        return this.isVisible
      }
    },
    data() {
      return {
        isVisible: true,
        isSelected: false,
        timer: 0,
        delay: 150,
        prvent: false
      }
    },
    methods: {
      toggleVisibility() {
        clearTimeout(this.timer);
        this.prevent = true;
        this.isVisible = !this.isVisible
        this.isSelected = false
      },
      toggleSelection() {
        
        this.timer = setTimeout(() => {
          if (!this.prevent) {
            this.isSelected = !this.isSelected
          }
          this.prevent = false;
        }, this.delay);
        console.log('SELECTED', this.isSelected)
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
</style>