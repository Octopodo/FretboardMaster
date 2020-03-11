<template>
  
    <div class="fret-group">
      
      <fret-tone 
        :index="index"
        :stringIndex="stringIndex"
        :root="root"
        class="fret-tone"
      ></fret-tone>
      <div v-if="!top && !hidden" class="fret-container">
        <div class="fret fret-color"></div>
        <div class="diapason diapason-color"></div>
        <div class="fret fret-color"></div>
      </div>
      <div v-else>
        <div class="fret hidden-fret"></div>
        <div class="diapason hidden-fret"></div>
        <div class="fret hidden-fret"></div>
      </div>
      <div v-if="!hidden">
        <div class="string string-color"></div>
      </div>
      <div v-else>
        <div class="string hidden"></div>
      </div>
      <div v-if="!bottom && !hidden" class="fret-container">
        <div class="fret fret-color"></div>
        <div class="diapason diapason-color"></div>
        <div class="fret fret-color"></div>
      </div>
      <div v-else>
        <div class="fret hidden-fret"></div>
        <div class="diapason hidden-fret"></div>
        <div class="fret hidden-fret"></div>
      </div>
      
    </div>
</template>

<script>
  import FretTone from "@/components/FretTone.vue";
  export default {
    components: {
      FretTone
    },
    props: {
      top: {
        type: Boolean,
        default: false
      },
      bottom: {
        type: Boolean,
        default: false
      },
      marker: {
        type: String,
        default: undefined
      },
      hidden: {
        type: Boolean,
        default: false
      },
      tone: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0
      },
      stringIndex: {
        type: Number,
        default: 0
      },
      root: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      edge(e) {
        if(e == 'top') {
          return this.top ? true : false
        }
        if(e == 'bottom') {
          return this.bottom ? true : false
        } 
        return false
      }
    },
  }
</script>

<style lang="sass" scoped>
.fret-container
  display: grid
  grid-template-columns: map-get($fret, width) map-get($diapason, width)  map-get($fret, width)

.fret-group
  display: inline-block
  vertical-align: top
.diapason
  height: map-get($diapason, height)
  
.fret
  height: map-get($fret, height)

.string
  width: map-get($fret-group, width)
  height: map-get($string, height)

.diapason-color
  background-color: map-get($diapason, color)

.fret-color
  background-color: map-get($fret, color)

.hidden-fret
  background-color: rgba(1, 0, 0, 0)

.string-color
  background-color: map-get($string, color)

.fret-tone
  position: absolute!important

  z-index: 1

.top-edge
  padding-top: map-get($diapason, height)!important
  

</style>


