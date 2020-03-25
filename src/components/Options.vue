<template>
<div>

  <v-row class="grey lighten-2 pl-6">
    <v-col cols="3" class="pl-0">
      <v-row class="mb-0">
        <v-col cols="4" class="pb-0">
          INTERVALOS
        </v-col>
        <v-col class="d-flex align-start pb-0">
          <v-switch
            dense
            class="ml-0 mt-0"
            v-model="hideUnmarkedNotes"
            label="Ocultar no marcadas"
          >
          </v-switch>
        </v-col>
      </v-row>
      <interval-selector class="mb-12 ml-6"></interval-selector>
    </v-col>

    <v-col cols="3" class="mt-4">
      <div class="mb-3">
        POSICIONES
      </div>
      <v-row >
        <v-btn-toggle
          class="mb-7 ml-6" 
          v-model="activePositions"
          multiple
        >
          <v-btn
            v-for="(position, index) in positionCount"
            :key="index"
            class="font-weight-bold"
          >
            {{index + 1}}ª
          </v-btn>
        </v-btn-toggle>
        <v-col>
          <div class="mb-3">
            DEDOS
          </div>
          <v-row>
            <v-btn-toggle 
              class="ml-6"
              v-model="fingerCount"
            >
            <v-btn
              v-for="finger in maxFingers"
              :key="finger - 1"
              class="font-weight-bold"
            >
              {{finger}}
            </v-btn>
            </v-btn-toggle>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col>
      <fretboard-style-controls/>
    </v-col>
  </v-row>  
</div>
</template>

<script>
  import IntervalSelector from '@/components/IntervalSelector'
  import FretboardStyleControls from '@/components/FretboardStyleControls'
  export default {
    components: {
      IntervalSelector,
      FretboardStyleControls
    },
    computed:{
      positionCount() {
        return this.$store.state.tone.currentScale.notes.length
      },
      maxFingers() {
        return this.$store.state.tone.maxFingers
      },
      activePositions: {
        get() {
          return this.$store.state.tone.activePositions
        },
        set(value) {
          this.$store.commit('tone/SET_ACTIVE_POSITIONS', value)
        }
      },
      fingerCount: {
        get() {
          return this.$store.state.tone.fingerCount - 1
        },
        set(value) {
          this.$store.dispatch('tone/changeFingerCount', value + 1)
        }
      },
      hideUnmarkedNotes: {
        get(){
          return this.$store.state.tone.hideUnmarkedNotes
        },
        set(value) {
          this.$store.commit('tone/SET_HIDE_UNMARKED_NOTES', value)
        }
        
      }
    },
    methods: {
      getPositionRoot(index) {
        return this.$store.tone.positions[index].root
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>