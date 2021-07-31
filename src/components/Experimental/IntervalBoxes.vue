<template>
  <div>
    <div>
      INTERVAL BOXES
    </div>
    <v-row>
        <v-btn icon xs @click.prevent="pushBox()">
          <v-icon>mdi-plus-thick</v-icon>
        </v-btn>
    </v-row>
    <div>
      <div
        v-for="(box, index) in dBoxes"
        :key="index"
        class="mb-10"
      >
        <v-col>
          <v-btn icon xs @click.prevent="removeBox(index)">
            <v-icon>mdi-minus</v-icon>
          </v-btn>

          <v-col>
            <v-row>
              {{names[index]}}
            </v-row>
            <v-row>
              <v-btn-toggle
                color="red"
                dense

                multiple
                v-model="dBoxes[index]" 
              >
                <v-btn
                  v-for="i in tones"
                  :key="i"
                >
                  {{i }}
                </v-btn>

              </v-btn-toggle>
            </v-row>
            <v-row>
              <v-btn-toggle
                color="light-blue"
                dense

                multiple
                v-model="dBoxes[index]" 
              >
                <v-btn
                  v-for="i in tones"
                  :key="i"
                >
                  {{i -1}}
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-col>
        </v-col>
        
      </div>
    </div>
  </div>
</template>

<script>
  // import ButtonSelector from "@/components/Widgets/ButtonSelector"
  import scales from "@/lib/scales-interface"
  export default {
    computed: {
      dBoxes() {
        // return i => {
        //   this.computeScaleType(this.boxes[i], i)
          return this.boxes
        // } 
      },
    },
    data() {
      return {
        boxes: [[]],
        names: [],
        tones: 12,
      }
    },
    mounted() {
      // this.pushBox()
    },
    watch: {
      dBoxes() {
        this.boxes.forEach((box, i) => {
          this.computeScaleType(i)
        })
      }
    },

    methods: {
      pushBox() {
        this.boxes.push([])
      },
      removeBox(index) {
  
        this.boxes.splice(index, 1)
        this.names.splice(index, 1)
      },
      computeScaleType(i) {
        this.names[i] = undefined
        let intervals = this.boxes[i];
        let chroma = Array.apply(null, Array(12)).map(function () {return 0});
        intervals.forEach(interval => {
          chroma[interval] = 1
        })
        chroma = chroma.join('')
        let matches = scales.getByChroma(chroma);
        if(matches.length > 0) {
          var names = '';
          matches.forEach(s => {
            names = names + s.name +', '
          })
          
          this.names.splice(i, 1, names.slice(0, -1).toUpperCase())
          this.names.forEach((name, index, names) => {
            if(!name) {
              this.names[index] = 'Unknown'
            }
          });
        }
        
        return names
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>