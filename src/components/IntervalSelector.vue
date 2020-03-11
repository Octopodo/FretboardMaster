<template>
  <div>
    <v-row>
      <v-col cols="1" class="pa-0" style="max-width: 60px!important">
        <v-menu
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <div :style="colorStyle('all')" v-on="on" />
          </template>
          <v-color-picker v-model="allColors">

          </v-color-picker>
        </v-menu>

      </v-col>
      <v-col cols="2" style="height: 30px!important; width:60px!important" class="pa-0">
        <v-checkbox 
          v-model="allSelected" 
          class="mt-0"
          :label="'Todos'"
        >

        </v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <div class="separator"></div>
    </v-row>
    <div
      v-for="(interval, index) in intervals"
      :key="index"
    >
      <v-row>
        <v-col cols="1" class="pa-0" style="max-width: 60px!important">
          <v-menu
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <div :style="colorStyle(index)" v-on="on" />
            </template>
            <v-color-picker v-model="intervals[index].color">

            </v-color-picker>
          </v-menu>

        </v-col>
        <v-col  style="height: 30px!important; width:60px!important" class="pa-0">
          <v-checkbox 
            v-model="interval.visible" 
            class="mt-0"
            :label="intervalOutputName(index, interval)"
          >
          </v-checkbox>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      intervals() {
        return this.$store.getters['tone/getScaleHarmonicFrets']//this.$store.state.tone.intervalsMap
      },
      allColors: {
        get() {
          return this.$store.state.tone.allColors
        },
        set(value) {
          this.$store.commit('tone/SET_ALL_FRET_COLORS', value)
        }
      },
      allSelected: {
        get() {
          return this.$store.state.tone.allSelected
        },
        set(value) {
          this.$store.commit('tone/SELECT_ALL_FRETS', value)
        }
      },
    },
    data() {
      return {
        colorPicker: false
      }
    },
    
    methods: {
      colorStyle(index) {
        let color = index == 'all' ? this.allColors : this.intervals[index].color;
        return {
          'background-color': color + '!important',
          'cursor': 'pointer',
          'border': '4px solid white',
          height: '30px',
          width: '50px',
        }
      },
      intervalOutputName(index, interval) {
        return `${interval.outputName} (${this.$store.getters['tone/getScaleTone'](index)})`
      }
    }
  }
</script>

<style lang="sass" scoped>
.separator
  height: 2px!important
  width: 95%!important
  background-color: LightGray!important
  margin-bottom: 12px
</style>