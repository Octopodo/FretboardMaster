<template>
  <div
    :style="fretStyle"
    class="d-flex align-center"
    @dblclick.prevent="toggleVisibility"
  >
    <transition name="scale-transition">
      <div
        v-if="visible" 
        :style="toneStyle"
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
      }
    },

    computed: {
      ...mapGetters({
        defaultColor: 'fretboard/toneColor',
        note: 'tone/getNote'
      }),

      fretStyle() {
        let style = {
          width: `${this.width}px`,
          height: `${this.height}px`,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          cursor: 'pointer'
        }
        return style
      },

      color() {
        return this.defaultColor
      },
      toneStyle(){
        let size = this.$store.getters['fretboard/toneSize'];
        let color = this.color
        let roundness = this.$store.getters['fretboard/toneRoundness'];
        let style = {
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: `${roundness}px`,
          backgroundColor: color,
          margin: 'auto',
          position: 'relatve'
        }
        return style
      },
      visible(){
        return this.isVisible
      }
    },
    data() {
      return {
        isVisible: true
      }
    },
    methods: {
      toggleVisibility() {
        this.isVisible = !this.isVisible
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