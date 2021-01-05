<template>
  <div >
    <v-row class="ml-12 mb-12">
      <div
        :style="nutStyle"
      >
        <div
          v-for="s in stringCount"
          :key="`H-${s}`"
        >
          <fret
            :width="nutWidth"
            :height="fretHeight"
            :indices="{string: s - 1, fret: 0}"
            :style="nutFretStyle(s - 1)"
            :string-height="stringHeight"
            style="margin-left: 0px!important"
          />
        </div>
      </div>
      <div :style="bareStyle"></div>
      <div :style="fretboardStyle">
        <div :style="{position: 'absolute', width: `${size.width}px`}">
          <div
            v-for="i in fretCount"
            :key="`X-${i}`"
            :style="fretbarStyle(i - 1)"
          ></div>
        </div>

        <!-- DOTS -->
        <div style="position: absolute">
          <div
            v-for="(i, index) in dots"
            :key="`A-${index}`"
            :style="dotStyle(i, 3)"
          ></div>
        </div>
        <div style="position: absolute">
          <div
            v-for="(i, index) in doubleDots"
            :key="`B-${index}`"
            :style="dotStyle(i, 1.7)"
          ></div>
          <div
            v-for="(i, index) in doubleDots"
            :key="`C-${index}`"
            :style="dotStyle(i, 4.3)"
          ></div>
        </div>

        <!-- STRINGS -->
        <div
          v-for="i in stringCount"
          :key="`D-${i}`"
          :style="stringStyle(i)"
        ></div>
      </div>
      <div
        :style="{position: 'absolute', marginLeft:`${fretbarWidth * 2}px`}"
      >
        <div
          v-for="s in stringCount"
          :key="`F-${s}`"
        > 
          <!-- <v-icon :style="fretStyle(s - 1, f - 1)">mdi-eye</v-icon> -->
          <fret
            v-for="f in fretCount"
            :key="`G-${f}`"
            :width="getFretWidth(f - 1)"
            :height="fretHeight"
            :indices="{string: s - 1, fret: f}"
            :style="fretStyle(s - 1, f - 1)"
            :string-height="stringHeight"
          />
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Fret from '@/components/Fretboard/Fret'
  export default {
    components: {
      Fret
    },
    computed: {
      //GETTERS
      ...mapGetters({
        fretbarColor: 'fretboard/fretbarColor',
        fretCount: 'fretboard/fretCount',
        fretDistances: 'fretboard/fretDistances',
        fretdotSize: 'fretboard/fretdotSize',
        fretdotColor: 'fretboard/fretdotColor',
        fretbarWidth: 'fretboard/fretbarWidth',
        stringCount: 'fretboard/stringCount',
        stringHeight: 'fretboard/stringHeight', 
      }),

      //CALCULATIONS
      fretHeight() {
        return  this.size.height / (this.stringCount - 1);
      
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
      nutStyle(){
        let height = this.size.height + this.stringHeight;
        let color = this.$fretbarColor;
        let style = {
          backgroundColor: color,
          position: 'relative',
          width: `${this.nutWidth}px`,
          height: `${height}px`,
          boxShadow: `0px -${this.size.height/8}px ${this.size.height/3}px 10px rgba(0,0,0, 0.2) inset `,
         }
         return style
      }
    },

    data() {
      return {
        dots: [3, 5, 7, 9, 15, 17, 19, 21],
        doubleDots: [12],
        nutWidth: 50
      }
    },

    methods: {
      dotStyle(fret, string) {
        let size = this.fretdotSize;
        let xOffset = this.getFretCenter(fret -1) + this.getFretWidth(fret - 1)/2 - 12
        let yOffset = this.size.height/this.stringCount * (string) - (size/2 - this.stringHeight);
        let color = this.fretdotColor;
        let style =  {
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '25px',
          backgroundColor: this.color,
          boxShadow: `${size}px ${size}px 0px ${size}px ${color} inset, 0px 0px 2px 2px rgba(0, 0, 0, 0.1)`,
          marginLeft: `${xOffset}px`,
          marginTop: `${yOffset}px`,
          position: 'absolute'
        }
        return style
      },
      fretbarStyle(index){
        let width = this.fretbarWidth/2;
        let height = this.size.height + this.stringHeight;
        const xOffset = this.fretDistances[index] 
        let style = {
          width: '0px',
          height: `${height}px`,
          backgroundColor: this.fretbarColor,
          marginLeft: `${xOffset}px`,
          paddingLeft: `${width}px`,
          paddingRight: `${width}px`,
          boxShadow:'2px 0 3px rgba(255, 255, 255, 0.6) inset ',
          display: 'inline-block',
          position: 'absolute',
        }
        return style
      },
      fretStyle(string, fret) {
        let xOffset = this.getFretCenter(fret) + this.nutWidth
        let yOffset = this.fretHeight * (string) - this.fretHeight/2;
        let style = {
          marginTop: `${yOffset}px`,
          marginLeft: `${xOffset}px`,
          position: 'absolute',
        }
        return style
      },

      nutFretStyle(string){
        let xOffset = this.getFretCenter(0)
        let yOffset = this.fretHeight * (string) - this.fretHeight/2;
        let border = string == 5 ? '': '1px solid rgba(0,0,0,0.05)' 
        let style = {
          marginTop: `${yOffset}px`,
          marginLeft: `${xOffset}px`,
          position: 'absolute',
          borderBottom: border
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

      getFretCenter(index) {
        let last = this.fretDistances[index - 1] || 0;
        let fretWidth = this.fretDistances[index] - last;
        let center = last + fretWidth/2
        return last
      },
      getFretWidth(index) {
        let last = this.fretDistances[index - 1] || 0;
        let fretWidth = this.fretDistances[index] - last;
        return fretWidth + this.fretbarWidth
      }
    }
  }
</script>

<style lang="sass" scoped>
.fretboard-container
  width: 100%
  display: block
  margin-left: auto
  margin-right: auto
</style>