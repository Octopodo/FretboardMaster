<template>
  <div class="ma-6">
     <div 
      v-if="title"
      class="mb-3 ml-6"
    >
      {{title}}
    </div>
    <v-row>
      <v-btn-toggle 
        class="ml-6"
        v-model="value"
        :multiple="multiple"
      >
      <v-btn
        v-for="(i) in $_items"
        :key="i"
        class="font-weight-bold"
      >
        {{i}}
      </v-btn>
      </v-btn-toggle>
    </v-row>
  </div>
</template>

<script>
  import _ from 'underscore'
  export default {
    props: {
      model: {
        type: String,
      },
      module: {
        type: String,
        default: undefined
      },
      mutation: {
        type: String,
        default: undefined
      },
      items: {
        type:String
      },
      title: {
        type: String
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      value:{
        get() {
          let getter = !this.module ? this.model : `${this.module}/${this.model}`
          return this.$store.getters[getter] 
        },
        set(value) {
          let mutation = !this.mutation ? 'SET' : this.mutation;
          mutation = !this.module ? mutation : `${this.module}/${mutation}`;
          if(!this.mutation) {
            this.$store.commit(mutation, {wich: this.model, value: value })
          } else {
            this.$store.commit(mutation, value)
          }
        }
      },
      $_items() {
        if(_.isArray(this.items) || _.isObject(this.items)) {
          return this.items
        } else {
          let getter = !this.module ? this.items : `${this.module}/${this.items}`
          return this.$store.getters[getter]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>