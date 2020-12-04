<template>
  <v-slider
    v-model="value"
    :label="label"
    :min="min"
    :max="max"
    :step="step"
    :style="style"
  />
</template>

<script>
  import {toSnakeCase} from '@/lib/utils.js'
  export default {
    props: {
      label: {
        type: String,
        default: undefined
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
      },
      width: {
        type: Number,
        default: 50
      },
    },
    computed: {
      value: {
        get() {
          let getter = !this.module ? 'get' : `${this.module}/get`;
          return this.$store.getters[getter](this.model)
        },
        set(value) {
          let prop = toSnakeCase(this.model).split('_');
          prop = prop[prop.length - 1].toUpperCase()
          let mutation = !this.mutation ? `SET` : this.mutation;
          mutation = !this.module ? mutation : `${this.module}/${mutation}`;
          this.$store.commit(mutation, {wich: this.model, value: value})
        }
      },
      style() {
        let style = {
          maxWidth: `${this.width}px`
        }
        return style
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>