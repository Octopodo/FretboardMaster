<template>

  <transition name="scale-transition">
    <div class="fret" v-if="visible">
      <!-- <v-tooltip top>
        <template v-slot:activator="{ on }"> -->
          <div 
        
            ref="fret"
            class="tone-background principal"
            :class="computedClass"
            :style="computedStyle" 
            @click.prevent="select()"
          >
            <div class="tone white--text">
              {{fret.tone}}
            </div>
          </div>
        <!-- </template>
        <span>Oct:{{fret.oct}}</span>
      </v-tooltip> -->
    </div>
  </transition>
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
      }
    },
    computed: {
      fret() {
        return this.$store.getters['tone/fretTone'](this.index, this.stringIndex);
      },
      visible () {
        return this.root? true : this.$store.getters['tone/toneIsVisible'](this.fret.tone, this.index, this.stringIndex)
      },
      computedStyle() {
        return {
          backgroundColor: this.harmonicColor
        }
      },
      computedClass() {
        return {
          'selected-fret' : this.isSelected
        }
      },
      harmonicColor() {
        return this.$store.getters['tone/getHarmonicColor'](this.fret.tone) + '!important'
      }
    },

    data() {
      return {
        isSelected: false,
        id: this.stringIndex.toString() + '-' + this.index.toString(),
        toneData: ''
      }
    },
    created(){
    },
    methods: {
      select() {
        this.isSelected = !this.isSelected
      }
    }
  }
</script>

<style lang="sass" scoped>
.fret
  // background-color: rgba(255, 0, 0, 0.2)
  // border: 1px solid rgba(255, 0, 0, 0.4)
  width: map-get($fret-group, width)
  height: map-get($fret-group, height)

.tone-background
  margin-left: 27%!important
  margin-top: 5%!important
  position: relative
  line-height: 1.9em
  cursor: pointer
  width: 28px!important
  height: 28px!important
  border-radius: 50px
  text-align: center
  vertical-align: middle
  display:inline-block
  margin-left: 27%!important
  margin-top: 5%!important

.tonica
  background-color: red!important

.tercera
  background-color: orange!important

.quinta
  background-color: green!important

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