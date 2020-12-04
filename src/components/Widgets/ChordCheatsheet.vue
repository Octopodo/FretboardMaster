<template>
  <div>
    <div>
      KEY CHORDS CHEATSHEET
    </div>
    <v-btn-toggle class="grey lighten-5">
      <v-btn
        v-for="(item, index) in availableKeys"
        :key="index"
        @click="changeKey(index)"
      >
        {{ item }} 
      </v-btn>
    </v-btn-toggle>
    <v-card>
      <v-data-table 
        :headers="headers"
        :items="table"
        disable-sort
        hide-default-footer
      >
        <template v-slot:item.chord="{ item }">
          <v-card
            class=" py-4 pr-0 subtitle-2"
            style="cursor: pointer"
            :color= "chordButtonStyle(item)"
            @click.prevent="chordClick(item)"
            dark
          >
            {{ item.chord }}
          </v-card>
        </template>
      </v-data-table>
    </v-card>
  </div>
  
</template>

<script>
  import {Chord} from '@tonaljs/tonal'
  import _ from 'lodash'
  export default {
    computed: {
      availableKeys() {
        return this.$store.state.tone.availableKeys
      },
      key() {
        let key = this.$store.getters['tone/getKey'] 
        return key
      },
      headers() {
        let headers = this.key.grades.map(function(value, i, arr){
          return {
            text: '',
            align: 'center',
            value: value,
          }
        })
        headers.unshift(
          {
            text: 'Chord',
            align: 'center',
            value: 'chord'
          })
        return headers
      },
      table() {
        let k = this.key
        let selectedChords = this.$store.getters['tone/chords']
        let table = this.key.chords.map((value, i) =>{
          let chord = Chord.get(value);
          let notes = chord.notes;
          let row =  {
            chord: `${chord.tonic} ${chord.quality}`,
            symbol: chord.symbol,
            selected: selectedChords.some( item =>{ return chord.symbol == item.symbol })
          }

          this.key.grades.forEach((value, i) =>{
            row[value] = notes[i]
          })
          return row
        })
        return table
      },

    },
    methods: {
      getChordNotes(chord) {
        let notes = Chord.get(chord).notes
        return notes
      },

      changeKey(index) {
        this.$store.dispatch('tone/changeKey', index)
      },
      
      chordClick(item) {
        item.selected = !item.selected
        let selected = this.setSelectedChords()
      },
      chordButtonStyle(item){
        return item.selected ? 'deep-orange darken-1' : 'grey darken-4'

      },
      setSelectedChords() {
        let selected = this.table.filter( item => { return item.selected });
        this.$store.commit('tone/SET', {wich: 'chords', value: selected})
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>