<template>
  <div>
    <v-row>
      <v-menu
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on }">
          <div :style="boxStyle" v-on="on" />
        </template>
        <v-color-picker v-model="color">
        </v-color-picker>
      </v-menu>
      <div class="title-label">
        {{label}}
      </div>
    </v-row>
  </div>
</template>

<script>
  export default {
    props: {
      model: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      module: {
        type: String,
        default: undefined,
      },
      mutation: {
        type: String,
        default: undefined
      }
    },
    computed: {
      color: {
        get() {
          let stop = 0
          return this.module != undefined 
            ? this.$store.state[this.module][`${this.model}Color`] 
            : this.$store.state[`${this.model}Color`] 
        },
        set(value) {
          let mutation = this.mutation ? this.mutation : 'SET_COLOR'
          mutation = this.module != undefined ? `${this.module}/${mutation}` : this.mutation
          this.$store.commit(mutation, {wich: this.model, color:value})
        }
      },
      boxStyle() {
        let color = this.color;
        return {
          'background-color': color + '!important',
          'cursor': 'pointer',
          'border': '4px solid white',
          height: '30px',
          width: '50px',
        }
      },
    },
  }
</script>

<style lang="sass" scoped>
.title-label
  margin-left: 10px
  margin-top: auto
  margin-bottom: auto
</style>
