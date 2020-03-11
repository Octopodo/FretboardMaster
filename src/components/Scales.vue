<template>
  <div>
    <v-row class="ml-6">
      <v-col
        v-for="(group, name) in scales"
        :key="name" 
        class="scales  d-flex align-start"
        cols="2"
      >
        <scale-selector
        :group="name"
        :scales="group"
        >

        </scale-selector>
        
      {{test(group)}}
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ScaleSelector from '@/components/ScaleSelector'
  export default {
    components: {
      ScaleSelector
    },
     created() {
    },
    computed: {
      scales() {
        return this.$store.state.tone.scales
      }
    },
    methods: {
      test(obj){

      }
    }
  }
</script>

<style lang="sass" scoped>

</style>