<template>
  <div class="ml-12">
    <color-picker model="diapason" module="fretboard" label="Diapasón"></color-picker>
    <color-picker model="string" module="fretboard" label="Cuerdas"></color-picker>
    <color-picker model="fretbar" module="fretboard" label="Trastes"></color-picker>
    <color-picker model="toneText" module="tone" label="Letras" mutation="SET_TONE_TEXT_COLOR"></color-picker>
    
    <v-slider
      v-model="toneSize"
      label="Tamaño de los Puntos"
      :min="2"
      :max="maxToneSize"
      :step="0.1"
    />
    <v-slider
      v-model="stringHeight"
      label="Grosor cuerdas"
      :min="1"
      :max="maxStringHeight"
      :step="0.1"
    />

    <v-slider
      v-model="fretbarSize"
      label="Grosor trastes"
      :min="1"
      :max="maxFretbarWidth"
      :step="0.1"
    />

    <v-slider
      v-model="fretHeight"
      label="Altura Trastes"
      :min="10"
      :max="maxFretHeight"
      :step="0.1"
    />
    
  </div>
</template>

<script>
import ColorPicker from '@/components/ColorPicker'
  export default {
    components: {
      ColorPicker
    },
    computed: {
      stringHeight: {
        get() {
          return this.$store.state.fretboard.stringHeight
        },
        set(value){
          this.$store.commit('fretboard/SET_STRING_HEIGHT', value)
        }
      },
      fretbarSize: {
        get() {
          return this.$store.state.fretboard.fretSize.barWidth
        },
        set(value){
          this.$store.commit('fretboard/SET_FRETBAR_SIZE', value)
        }
      },
      fretHeight: {
        get() {
          return this.$store.state.fretboard.fretSize.height
        },
        set(value){
          this.$store.commit('fretboard/SET_FRET_HEIGHT', value)
        }
      },
      toneSize: {
        get() {
          return this.$store.state.tone.toneSize
        },
        set(value){
          this.$store.commit('tone/SET_TONE_SIZE', value)
        }
      }
    },
    data() {
      return {
        maxFretHeight: 40,
        maxFretbarWidth: 8,
        maxStringHeight: 10,
        maxToneSize: 100 

      }
    },
    methods: {

    }
  }
</script>

<style lang="sass" scoped>

</style>