<template>
  <div style="z-index: -1!important">
    <v-row>
      <div :style="bareStyle"></div>
      <div :style="fretboardStyle">
        <v-row>
          <div
            v-for="i in fretCount"
            :key="i"
            :style="fretbarStyle(i)"
          ></div>
        </v-row>
        <div
          v-for="i in stringCount"
          :key="i"
          :style="stringStyle(i)"
        ></div>
      </div>
      <div
        style="position: absolute"
        v-for="f in fretCount"
        :key="f"
      >
        <fret
          v-for="s in stringCount"
          :key="s"
          :width="fretSize.width"
          :height="fretSize.height"
          :indices="{string: s, fret: f}"
          :style="fretStyle(s, f)"
        />
      </div>
    </v-row>
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Fret from '@/components/Fret'
  export default {
    components: {
      Fret
    },
    computed: {
      //GETTERS
      ...mapGetters({
        fretbarColor: 'fretboard/fretbarColor',
        fretCount: 'fretboard/fretCount',
        fretbarWidth: 'fretboard/fretbarWidth',
        size: 'fretboard/fretboardSize',
        stringCount: 'fretboard/stringCount',
        stringHeight: 'fretboard/stringHeight', 
      }),

      //CALCULATIONS
      fretSize() {
        let width = this.size.width / this.fretCount + this.fretbarWidth;
        let height = this.size.height / (this.stringCount - 1);
        return {
          width: Math.floor(width),
          height: Math.floor(height)
        }
      },

      //STYLES
      bareStyle() {
        let width = this.fretbarWidth * 2;
        let height = this.size.height + this.stringHeight
        let style = {
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: this.fretbarColor
        }
        return style
      },
      
      fretboardStyle(){
         let size = this.size;
         let color = this.$store.getters['fretboard/diapasonColor'];
         let style = {
           backgroundColor: color,
           position: 'relative',
           width: `${size.width}px`,
           height: `${size.height}px`,
         }
         return style
      },
    },

    data() {
      return {
        key: 0
      }
    },

    methods: {
      fretbarStyle(index){
        let width = this.fretbarWidth;
        let height = this.size.height;
        let offset = this.size.width / (this.fretCount - 1) * (index -1) + width * 2;
        let style = {
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: this.fretbarColor,
          marginLeft: `${offset}px`,
          position: 'absolute'
        }
        return style
      },
      fretStyle(string, fret) {
        let xOffset = Math.floor(this.fretSize.width * (fret - 1) - this.fretSize.width + this.fretbarWidth * 1.5);
        let yOffset = Math.floor(this.fretSize.height * (string -1) - this.fretSize.height/2);
        let style = {
          marginTop: `${yOffset}px`,
          marginLeft: `${xOffset}px`,
          position: 'absolute'
        }
        return style
      },

      stringStyle(index) {
        let size = this.size;
        let color = this.$store.getters['fretboard/stringColor'];
        let height = this.stringHeight;
        let offset =  this.size.height / (this.stringCount -1) * (index -1);
        let style = {
          backgroundColor: color,
          width: `${this.size.width}px`,
          height: `${height}px`,
          marginTop: `${offset}px`,
          position: 'absolute'
        }
        return style
      },
    }
  }
</script>

<style lang="sass" scoped>
.string-container
  line-height: 0px!important
  grid-template-rows: map-get

.scale-notes
  width: 600px!important
</style>