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
        :style="{position: 'absolute', marginLeft:`${fretbarWidth * 1.5}px`}"
      >
        <div
          
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
        stringCount: 'fretboard/stringCount',
        stringHeight: 'fretboard/stringHeight', 
      }),

      //CALCULATIONS
      fretSize() {
        let width = this.size.width / this.fretCount + this.fretbarWidth;
        let height = this.size.height / (this.stringCount - 1);
        return {
          width: width,
          height:height
        }
      },

      size() {
        return {
          width: this.$store.getters['fretboard/fretboardWidth'],
          height: this.$store.getters['fretboard/fretboardHeight']
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
           boxShadow: `0px -${size.height/8}px ${size.height/3}px 10px rgba(0,0,0, 0.2) inset `
         }
         return style
      },
    },

    data() {
      return {
        fretPoints: [3, 5, 7, 9, 15, 17, 19, 21]
      }
    },

    methods: {
      fretbarStyle(index){
        let width = this.fretbarWidth/2;
        let height = this.size.height;
        let offset = this.size.width / (this.fretCount - 1) * (index -1) + width * 2;
        let style = {
          width: '0px',
          height: `${height}px`,
          backgroundColor: this.fretbarColor,
          marginLeft: `${offset}px`,
          paddingLeft: `${width}px`,
          paddingRight: `${width}px`,
          position: 'absolute',
          boxShadow:'2px 0 3px rgba(255, 255, 255, 0.6) inset '
        }
        return style
      },
      fretStyle(string, fret) {
        let xOffset = this.size.width / (this.fretCount - 1) * (fret -1) - this.fretSize.width + this.fretbarWidth;
        let yOffset = this.fretSize.height * (string -1) - this.fretSize.height/2;
        let style = {
          marginTop: `${yOffset}px`,
          marginLeft: `${xOffset}px`,
          position: 'absolute',
        }
        return style
      },

      stringStyle(index) {
        let size = this.size;
        let color = this.$store.getters['fretboard/stringColor'];
        let height = this.stringHeight/2;
        let offset =  this.size.height / (this.stringCount -1) * (index -1);
        let style = {
          backgroundColor: color,
          width: `${this.size.width}px`,
          height: '0px',
          marginTop: `${offset}px`,
          paddingTop: `${height}px`,
          paddingBottom: `${height}px`,
          position: 'absolute',
          boxShadow: '0 3px 4px rgba(0, 0, 0, 0.2)'
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