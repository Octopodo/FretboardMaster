<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          Tonalidad: {{tone}}
        </v-btn>
      </template>
      <v-list>
          <v-list-item
            v-for="(item, index) in availableTones"
            :key="index"
            @click="changeTone(index)"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        
      </v-list>
    </v-menu>
    <v-treeview 
      class="custom-treeview"
      activatable
      dense
      :active="[active]"
      :hoverable="true"
      :items="scales"
      
      @update:active="changeScale"
    >

    </v-treeview>
  </div>
</template>

<script>
  export default {
    props: {
      group: {
        type: String,
        default: ''
      },

    },
    computed: {
      scales() {
        return this.$store.state.tone.scales
      },
      tone(){
        return this.$store.state.tone.currentTone
      },
      availableTones() {
        return this.$store.state.tone.availableTones
      },
      active() {
        return this.$store.state.tone.currentScaleId
      }
    },
    data() {
      return {
        currentTone: 0,
        openedGroups: ['main']
      }
    },
    methods: {
      changeScale(items) {
        this.$store.dispatch('tone/setCurrentScale', items[0])
      },
      changeTone(tone){
        this.$store.dispatch('tone/changeTone', tone)
      },
      getOpenedGroups(items) {
        
      }
    }
  }
</script>

<style lang="sass" scoped>
.tone-selector
  display: inline-block!important
.scale-selector
  display: inline-block!important


.v-treeview::v-deep
  .v-treeview-node__root
    height: 25px!important
  .v-treeview-node--leaf
    cursor: pointer!important
    font-size: 15px!important
    height: 25px!important
</style>