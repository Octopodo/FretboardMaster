<template>
  <div>
    <v-expansion-panels 
      expand
      focusable
      hover
    >
      <v-expansion-panel
        v-for="(scale, i) in scales"
        :key="i"
      >
        <v-expansion-panel-header>{{scale.name}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card>
            
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
  export default {
    computed: {
      userScales() {
        return this.$store.getters['tone/userScales'] 
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>