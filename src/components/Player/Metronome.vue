<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          width="200"
          v-model="bpm"
          :rules="rules"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-select
          v-model="beat"
          :items="beats"
        ></v-select>
      </v-col>
      
    </v-row>
    
  </div>
</template>

<script>
  export default {
    computed: {
      bpm: {
        get() {
          // this.internalBPM =  this.$store.getters['player/bpm'];
          return this.$store.getters['player/bpm'];
        },
        set(value) {
          this.$store.dispatch('player/changeBpm', Math.round(value));
        }
      },
      beat: {
        get() {
          let beat = this.$store.getters['player/beat'];
          return   beat;
        },
        set(value) {
          this.$store.commit('player/BEAT', value)
        }
      },
      beats() {
        let beats = this.$store.getters['player/beats'];
        let newBeats = []
        for(var i = 0; i < beats.length; i++) {
          let beat = '1/' + beats[i];
          newBeats.push(beat)
        }
        return newBeats
      }
      
    },
    data() {
        return {
          internalBPM: 120,
          rules: [v => /\d/gi.test(v) || 'Only integer numbers',
                  v => parseInt(v) <300 || '300 is max speed']
        }
      },
  }
</script>

<style lang="scss" scoped>

</style>