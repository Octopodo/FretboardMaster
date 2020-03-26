<template>
  <div>
    <v-slider
      v-model="value"
      :label="label"
      :min="min"
      :max="max"
      :step="step"
    />
  </div>
</template>

<script>
  import {toUpperKebab} from '@/lib/utils.js'
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      module: {
        type: String,
        default: undefined
      },
      model: {
        type: String,
        required: true
      },
      mutation: {
        type: String,
        default: undefined
      }
    },
    computed: {
      value: {
        get() {
          let getter = !this.module ? this.model : `${this.module}/${this.model}`;
          return this.$store.getters[getter]
        },
        set(value) {
          let mutation = !this.mutation ? `SET_${toUpperKebab(this.model)}` : this.mutation;
          mutation = !this.module ? mutation : `${this.module}/${mutation}`;
          this.$store.commit(mutation, value)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>