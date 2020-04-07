<template>
  <div>
    <v-treeview 
      class="custom-treeview"
      activatable
      open-all
      dense
      :multiple-active="true"
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
        this.$store.dispatch('tone/setScales', items)
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