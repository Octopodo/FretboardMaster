<template>
  <div class="scale-info">
    <v-card
      dark
      flat
      width="700"
      class="ml-0  pl-0"
    >
      <v-card-text>
        <v-row>
          <v-col cols="8">
            <div> Escala </div>
            <p class="display-1">{{scaleName | capitalize}}</p>
            <div> Notas</div>
            <p class="headline blue--text">{{notes}}</p>
            <div> Semitonos </div>
            <p class="headline green--text">{{steps}}</p>
          </v-col>
          <v-col cols="4">
            <div dark> Alias </div>
            <v-col>
              <p
                v-for="(alias, i) in scale.aliases"
                :key="i"
                class="subtitle-1"
              >
                {{alias | capitalize}}
              </p>
            </v-col>
          </v-col>
        </v-row>
        
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import _ from 'underscore'
  export default {
    computed: {
      scale() {
        return this.$store.getters['tone/activeScale']   
      },
      notes() {
        let notes = _.map(this.scale.notes, function(note, key, list){
          let name =  note.replace(/[0-9]/g, '');
          name = key == list.length - 1 ? name : name + ' - '
          return name
        }).join('');
        return notes
      },
      steps() {
        let steps = this.scale.steps.join(' - ')
        return steps
      },
      scaleName() {
        let name = this.scale.name.split(' ');
        let root = name.shift()[0];
        return  `${name.join(' ')} (${root})`
      }
    },
  }
</script>

<style lang="sass" scoped>
.scale-info
  margin-right: 200
</style>