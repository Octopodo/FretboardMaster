<template>
  <div class="metronome pl-12">
    <metronome/>
    <v-row
      class="pl-5"
    >
      <v-row>
        <v-btn
          @click.prevent="play"
          icon
          large
        >
          <v-icon v-if="playing">mdi-pause</v-icon>
          <v-icon v-else>mdi-play</v-icon>

        </v-btn>
        <div class=" text-h2 ml-6 font-weight-black">
          {{point}}
        </div>
      </v-row>
      <v-col>
        <v-row>

            <v-checkbox
              v-model="showNotes"
              :color="showNotes ? 'green' : ''"
              label="Show Notes"
            />
            <v-checkbox
              v-model="showIntervals"
              :color="showIntervals ? 'green' : ''"
              label="Show Intervals"
            />
            <v-checkbox
              dense
              v-model="ghostNotes"
              :color="ghostNotes ? 'green' : ''"
              label="Ghost Notes"
            />
        </v-row>
      </v-col>
      
    </v-row>
    
  </div>
</template>

<script>
  import Metronome from '@/components/Player/Metronome'
  export default {
    components: {
      Metronome
    },
    computed: {
      playing() {
        // console.log('THE GETTERS', this.$store.getters['player/playing'])
        return this.$store.getters['player/playing']
      },
      point() {
        return this.$store.getters['player/currentPoint'] + 1
      },
      showNotes: {
        get() {
          return this.$store.getters['fretboard/showNotes']
        },
        set(value) {
          this.$store.commit('fretboard/SET', {wich: 'showNotes', value: value})
        }
      },
      showIntervals: {
        get() {
          return this.$store.getters['fretboard/showIntervals']
        },
        set(value) {
          this.$store.commit('fretboard/SET', {wich: 'showIntervals', value: value})
        }
      },
      ghostNotes: {
        get() {
          return this.$store.getters['fretboard/ghostNotes']
        },
        set(value) {
          this.$store.commit('fretboard/SET', {wich: 'ghostNotes', value: value})
        }
      }
    },
    methods: {
      play() {
        if(this.playing) {
          this.$store.dispatch('player/stop')
        } else {
          this.$store.dispatch('player/play')
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
.metronome
  width: 900px!important
</style>