<template>
  <div class="mt-12">
    <div
      v-for="(control, index) in controls"
      :key="index"
      class="ml-12"
    >
      <!-- <div class="white--text">
        {{control.label}}
      </div> -->
      <div class="ml-0">
        <color-picker
          label-color="white"
          :label="control.label"
          :model="control.color.model"
          :module="module"
          :border-color="borderColor"
          :mutation="control.color.mutation"
        />
        
        <custom-slider
          :model="control.size.model"
          :module="module"
          :min="control.size.min"
          :max="control.size.max"
          :step="control.size.step"
          width="250"
          
        />
      </div>
    </div>
  </div>
  
</template>

<script>
  import ColorPicker from '@/components/ColorPicker'
  import CustomSlider from '@/components/CustomSlider'
  export default {
    components: {
      ColorPicker,
      CustomSlider
    },
    computed: {
    },

    data() {
      return {
        borderColor: '#212121',
        module: 'fretboard',
        labelColor: 'white',
        controls: [
          {
            label: 'Puntos',
            size: { model: 'toneSize', min: 2, max: 100, step: 0.5 },
            color: {model: 'tone'}
          },
          {
            label: 'Cuerdas',
            size: { model: 'stringHeight',  min: 1, max: 10, step: 0.5 },
            color:{model: 'string'}
          },
          {
            label: 'Trastes',
            size: { model: 'fretbarWidth',  min: 1, max: 8, step: 0.5 },
            color: { model: 'fretbar'}
          },
          {
            label: 'Mástil',
            size: { model: 'fretboardHeight', min: 80, max: 400, step: 0.5 },
            color: {model: 'diapason' },
          },
          {
            label: 'Notación',
            size:{model: 'tonefontSize',  mutation: "SET_TONE_TEXT_COLOR"},
            color: {model: 'toneText'}
          }
          
          
        ],
        colorPickers: [
          
          
          
          
        ]

      }
    },
    methods: {
    }
  }
</script>

<style lang="sass" scoped>
</style>