import IntervalsMap from "@/note-maps/interval-map.js";

const tunnings = {
  standart:[
  {tone:'E', oct: 4, fret: 0, grade: 3},
  {tone:'B', oct: 3, fret: 0, grade: 7},
  {tone:'G', oct: 3, fret: 0, grade: 5},
  {tone:'D', oct: 3, fret: 0, grade: 2},
  {tone:'A', oct: 2, fret: 0, grade: 6},
  {tone:'E', oct: 2, fret: 0, grade: 3}, 
  ]
}

export default function(newTunning, newFrets, scale) {
  const frets = newFrets;
  const tunning = newTunning instanceof Array? newTunning : tunnings[newTunning.toLowerCase()];
  var intervals = scale.chromatic
  this.matrix = [];

  this.getFrets = function() {
    return frets
  },

  this.switchFretValue = function(name, string, fret, value) {
    this.matrix[string][fret][name] = !value ? !this.matrix[string][fret][name] : value
  }

  this.getStrings= function() {
    return tunning.length
  }

  this.tunning = function() {
    return tunning
  }

  this.tuneFret = function(tone, root){
    let octCount = Math.floor(frets/scale.chromatic.length);
    let rootStep = scale.chromatic.indexOf(root.tone);
    let toneStep = scale.chromatic.indexOf(tone);
    let fret = rootStep < toneStep ? toneStep - rootStep : scale.chromatic.length - toneStep - 1;
    let oct = rootStep < toneStep ? root.oct : rootOct - 1;
    let toneData = {
      root: tone,
      frets: [],
      octaves: [],
      grade: scale.indexOf(tone) + 1
    }
    for(let i = 1; i <= octCount; i++) {
      toneData.fret.push(fret * i);
      toneData.octaves.push(oct + i);
    }
    return toneData
  }

  this.tuneString = function(root, scale) {
    let string = [];
    for(var i = 0; i < intervals.length; i++) {
      let root = intervals[i];

    }
  }

  this.generate = function(scale) {
    let map = IntervalsMap.map;
    for(var t = 0; t < tunning.length; t++) {
      let tune = tunning[t]
      let string = [tune];
      let oct = tune.oct;
      let fret = intervals.indexOf(tune.tone);
      let i = 0;
      while(i < frets) {
        fret++
        oct =  fret >= intervals.length ? oct + 1 : oct
        fret = fret >= intervals.length ? 0 : fret;
        let grade = scale.notes.indexOf(intervals[fret]) + 1;
        let visible = grade != 0;

        let tone= {
          tone: intervals[fret], 
          oct: oct, 
          fret: i + 1,
          string: t,
          grade: grade,
          visible: visible,
          selected: false,
          // steps: step.steps
        };
        string.push(tone)
        i++
      }
      this.matrix.push(string);
    }
    this.print()
    let stop = 0;
  }

  this.print = function(value) {
    let output = '';
    for(var s = 0; s < this.matrix.length; s++) {
      output += '||--';
      for(var f = 0; f < this.matrix[s].length; f++) {
        let fret = this.matrix[s][f];
        let data = fret[value || 'tone'].toString();
        output = data.length > 1 ? output + data + '--': output + `${data}---` 
      }
      output += '||\n'
    }
    console.log(output)
  }

  this.generate(scale)
}