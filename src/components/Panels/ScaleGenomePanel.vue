<template>
  <div >
    <div>
      <v-col >
        <scale-selector class="ml-24"/>
        <genome class="ml-24"/>
        <v-col class="ml-6 mt-8 justify-center">
          
          <v-card 
            max-width="700"
            flat 
            class="d-flex justify-center expand-button"
            @click="expand"
          >
            <div >
              <v-icon v-if="expandInfo" x-large>mdi-chevron-up</v-icon>
              <v-icon v-if="!expandInfo" x-large>mdi-chevron-down</v-icon>
            </div>
          </v-card>
          <v-expand-transition >
            <scale-info
              v-show="expandInfo"
            />
          </v-expand-transition>
        </v-col>
        
      </v-col>
    </div>
  </div>
</template>

<script>
  import Genome from '@/components/Scales/Genome(Original)'
  import ScaleInfo from '@/components/Scales/ScaleInfo'
  import ScaleSelector from "@/components/Scales/ScaleSelector";
  export default {
    components: {
      Genome,
      ScaleInfo,
      ScaleSelector,
    },
    data() {
      return {
        expandInfo: false
      }
    },
    methods: {
      expand(){
        this.expandInfo = !this.expandInfo
      }
    }
  }
</script>

<style lang="sass" scoped>
.expand-button
  cursor: pointer
  &:hover
    box-shadow: 3px 1px 10px 0px rgba(0, 0, 0, 0.2)

.ml-24
  margin-left: 100px
</style>