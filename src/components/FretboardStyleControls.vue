<template>
  <div class=" py-6 px-12">
    <color-picker
      class="my-2"
      v-for="(color, index) in colorPickers"
      :key="index"
      :model="color.model"
      :module="color.storeModule"
      :label="color.label"
      :border-color="borderColor"
      :label-color="labelColor"
      :mutation="color.mutation"
    />
    
    <div class="mt-6">
      <v-slider
        v-for="(slider, index) in sliders"
        
        :key="index"
        v-model="slider.model"
        :label="slider.label"
        :min="slider.min"
        :max="slider.max"
        :step="slider.step"
      />
    </div>
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
        sliders: [
          {label:"Tamaño de Puntos", model: this.toneSize, min: 2, max: 100, step: 0.5},
          {label:"Grosor de cuerdas", model: this.stringHeight, min: 1, max: 10, step: 0.5},
          {label:"Grosor de trastes", model: this.fretbarSize, min: 1, max: 8, step: 0.5},
          {label:"Altura de trastes", model: this.fretHeight, min: 10, max: 40, step: 0.5},
        ],
        borderColor: '#212121',
        labelColor: 'white',
        colorPickers: [
          {model: 'diapason', storeModule: "fretboard", label: 'Diapasón'},
          {model: 'string', storeModule: "fretboard", label: 'Cuerdas'},
          {model: 'fretbar', storeModule: "fretboard", label: 'Trastes'},
          {model: 'toneText', storeModule: "tone", label: 'Letras', mutation: "SET_TONE_TEXT_COLOR"},
        ]

      }
    },
    methods: {

    }
  }
</script>

<style lang="sass" scoped>
</style>