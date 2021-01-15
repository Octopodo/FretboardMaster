<template>
  <div>
    <v-btn
      @click.prevent="generate(false)"
    >
      Generate
    </v-btn>
    <v-btn
      @click.prevent="generate(true)"
    >
      Generate Uniq
    </v-btn>
    <v-text-field
      v-model="count"
      :rules="rules"
      label="Number of sequences"
    ></v-text-field>
    <div style="height: 500px">
      <div
        class="ml-10 mt-5"
        v-for="(sequence, index) in sequences"
        :key="index"
      >
      <span class="title" >
        {{sequence}}
      </span>
      
      </div>

    </div>
    
  </div>
</template>

<script>
  export default {
    // computed: {
    //   sequences() {
    //     return this.$_sequences
    //   }
    // },
    data() {
      return {
        sequences: [],
        count: 5,
        rules: [v => /\d/gi.test(v) || 'Only numbers']
      }
    },
    methods: {
      randomInt(min, max) {
        
        let res = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(min, max, res)
        return res
      },
      generate(uniq) {
        var number = parseInt(this.count);
        var spacing = '  -  ';
        var i, j;
        this.sequences = []
        for(i = 0; i < number; i++) {
          let positions = [1, 2, 3, 4, 5, 6, 7];
          let sequence = '';
          if(uniq) {
            for(j = positions.length - 1; j >= 0; j--) {
              // console.log('splice    ' +  positions.splice(this.randomInt(0, j - 1), 1))
              sequence = sequence +  spacing + positions.splice(this.randomInt(0, j - 1), 1) [0]
            }
          } else {
            for(j = 0; j < 7; j++) {

              sequence = sequence  +  spacing  + this.randomInt(1, 7).toString()
            }
          }
              console.log(sequence)
          sequence = sequence.replace(/ {2}- {2}/, '')
          this.sequences.push(sequence)
        }
      },
      getSequence(sequence) {
        let seq = ''
        for(var i = 0; i < sequence.length; i++) {
          seq += ' - ' + sequence.toString()
        }
        return seq
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>