<template>
  <v-col >
    <v-row class="d-flex justify-center" :style="style">
      <v-expand-x-transition origin="top left">
          <v-autocomplete
            v-model="value"
            dense
            filled
            label="Busca una escala"
            :items="scales"
            @change="show = false"
            prepend-inner-icon="mdi-magnify"
            max-width="400"
          ></v-autocomplete>
      </v-expand-x-transition>
    </v-row>
  </v-col>
</template>

<script>
  import _ from 'underscore'
  export default {
    props: {
      maxWidth: {
        type: Number || String,
      }
    },
    computed: {
      scales(){
        let scales = this.$store.getters['tone/getScales'] (true, true)
        return _.map(scales, function(scale) {
          return this.$options.filters.capitalize( scale.name )
        }, this)
      },
      value: {
        get(){
          let scale = this.$store.getters['tone/activeScale'];
          return this.$options.filters.capitalize( scale.name )
        },
        set(value) {
          this.$store.dispatch('tone/updateScale', value)
        }
      },
      style() {
        let maxWidth = typeof this.maxWidth === 'string' ? parseInt(this.maxWidth) : this.maxWidth;
        maxWidth = isNaN(maxWidth) ? this.defaultMaxWidth : maxWidth
        let style = {
          maxWidth: `${maxWidth}px`
        }
        return style
      }
    },
    data() {
      return {
        defaultMaxWidth: 600
      }
    },
  }
</script>

<style lang="sass" scoped>

</style>