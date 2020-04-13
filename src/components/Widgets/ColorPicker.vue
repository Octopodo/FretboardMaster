<template>
    <v-row :style="{height: `${height}px`, maxWidth: '300px!important'}" class="ml-0">
      <v-menu
        :dark="dark"
        :close-on-content-click="false"

      >
        <template v-slot:activator="{ on }" >
          <div :style="boxStyle" v-on="on" />
        </template>
        <v-color-picker v-model="color">
        </v-color-picker>
      </v-menu>
      <div v-if="label" :style="labelStyle" dark class="d-flex align-end">
        {{label}}
      </div>
    </v-row>
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
        default: undefined
      },
      module: {
        type: String,
        default: undefined,
      },
      mutation: {
        type: String,
        default: undefined
      },
      borderColor: {
        type: String,
        default: 'white'
      },
      dark: {
        type: Boolean,
        default: false
      },
      labelColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0.6)'
      },
      width: {
        type: Number,
        default: 50
      },
      height: {
        type: Number,
        default: 30
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
          backgroundColor: color ,
          cursor: 'pointer',
          border: `4px solid ${this.borderColor}`,
          height: `${this.height}px`,
          width: `${this.width}px`,
          // display:'inline-block',
        }
      },
      labelStyle() {
        return {
          marginLeft: '10px',
          verticalAlign: 'center',
          color: this.labelColor
        }
        
      }
    },
  }
</script>

<style lang="sass" scoped>
</style>
