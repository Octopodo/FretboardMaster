<template>
  <div>
    <v-row>
      <v-col xs="10">
        <fretboard class="fretboard" />
        <div class="divider"></div>
        <scales-panel/>
      </v-col>
      
    </v-row>
    
  </div>
</template>

<script>
import Fretboard from "@/components/Fretboard/Fretboard";
import ScalesPanel from "@/components/Panels/ScalesPanel";

export default {
  name: 'App',
  components: {
    Fretboard,
    ScalesPanel,
  }
}
</script>

<style lang="sass" scoped>
.tone-selector
  margin-left: 25%!important
  margin-top:2%
  margin-bottom: 2%

.fretboard
  margin-top: 50px!important

.divider
  height: 2px
  background-color: LightGray

</style>