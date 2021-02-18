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
              {{i}}
            </v-btn>

          </v-btn-toggle>
        </v-col>
        
      </div>
    </div>
  </div>
</template>

<script>
  // import ButtonSelector from "@/components/Widgets/ButtonSelector"
  export default {
    computed: {
      dBoxes() {
        return this.boxes 
      }
    },
    data() {
      return {
        boxes: [[]],
        tones: 12,
      }
    },
    mounted() {
      // this.pushBox()
    },

    methods: {
      pushBox() {
        this.boxes.push([])
      },
      removeBox(index) {
        console.log(index)
        this.boxes.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>