<template>
  <div>
    <v-card>
      <v-list>
        <v-subheader>
          Key: {{key.root}}
        </v-subheader>
        <v-list-item
          v-for="(chord, index) in key.chords"
          :key="index"
        >
          <v-list-item-content>
            <v-row>
              <v-col class="grey darken-4 font-weight-black white--text pl-8">
                {{chord}}
              </v-col>
              <v-col
                align-self="start"
                v-for="(note, i) in getChordNotes(chord)"
                :key="i"
              >{{note}}</v-col>
            </v-row>
            
          </v-list-item-content>
          
        </v-list-item>
      </v-list>
    </v-card>
  </div>
  
</template>

<script>
import {Chord} from '@tonaljs/tonal'
  export default {
    computed: {
      key() {
        return this.$store.getters['tone/getKey'] 
      },
    },
    methods: {
      getChordNotes(chord) {
        let notes = Chord.get(chord).notes
        return notes
      },

    },
  }
</script>

<style lang="scss" scoped>

</style>