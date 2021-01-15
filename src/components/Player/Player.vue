<template>
  <div>
    <metronome/>
    <v-row>
      <v-btn
        @click.prevent="play"
        icon
      >
        <v-icon v-if="playing">mdi-pause</v-icon>
        <v-icon v-else>mdi-play</v-icon>

      </v-btn>
      <div class="text-h1 ml-6 font-weight-black">
        {{point}}
      </div>
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
        console.log('THE GETTERS', this.$store.getters['player/playing'])
        return this.$store.getters['player/playing']
      },
      point() {
        return this.$store.getters['player/currentPoint'] + 1
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

<style lang="scss" scoped>

</style>