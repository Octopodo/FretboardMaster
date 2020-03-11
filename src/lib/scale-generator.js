import ScaleMaker from 'scale-maker'
import Scales from '@/note-maps/scales.js'

const sharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const flats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const usesFlats = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'd', 'g', 'c', 'f', 'bb', 'eb'];
const steps = {
  "m": 1,
  "M": 2,
  "A": 3,
  "X": 4
}

class Scale {
  constructor(tonic) {
    this.tonic = tonic;
    this.usesFlats = false;
    this.chromaticScale = []
  }

  chromatic() {
    this.usesFlats = usesFlats.includes(this.tonic) 
    this.chromaticScale = this.usesFlats ? flats : sharps 
    return  this.chromaticScale
  }



  interval(intervals) {
    const currTonic = this.tonic[0].toUpperCase() + this.tonic.slice(1);
    let scalePos = this.chromatic().indexOf(currTonic);
    let newIntervals = intervals instanceof Array ? this.intervalsToNotation(intervals) : intervals
    return [...newIntervals].map((step) => {
      const nextNote = this.chromatic()[scalePos]
      scalePos = (scalePos + steps[step]) % this.chromatic().length;
      return nextNote
    });
  }
  intervalsToNotation(intervals) {
    let newIntervals = '';
    for(var i = 0; i < intervals.length; i++) {
      let current = intervals[i];
      let next = intervals[i + 1];
      let step = next - current;
      newIntervals += this.findStep(step) 
    }
    return newIntervals
  }
  findStep(count) {
    let step = '';
    for (var i in steps) {
      step = steps[i] == count ? step = i : step
    }
    return step
  }
}


export default {
  ScaleMaker: ScaleMaker, 
  scales: Scales,
  sharps: sharps,
  flats: flats,
  chromaticScale(type, reorder) {
    if((type == 'b' || type == 'flats') && reorder) {
      return flats.slice(7).concat(flats.slice(0, 7));
    }
    return type == 'b' || type == 'flats' ? flats : sharps;
  },

  make(scaleId, root, notes) {
    let r = root + '0'
    let tonic = this.getScaleType(scaleId) == 'minor' ? root.toLowerCase() : root;
    let scale = ScaleMaker.makeScale(scaleId, r, notes);
    let noteScale = new Scale(tonic)
    scale.notes = noteScale.interval(scale.inSemiTones);
    scale.usesFlats = noteScale.usesFlats;
    scale.chromatic = noteScale.chromaticScale
    this.scaleLift(scale)
    return scale
  },

  scaleLift(scale) {
    let root = scale.notes[0];
    let last = scale.notes.length
    for(var n= 1; n < scale.notes.length; n++) {
      if(scale.notes[n] == root) {
        last = n;
        break;
      }
    }
    scale.notes.splice(last);
    scale.inSemiTones.splice(last);
    scale.inHertz.splice(last)
    scale.inCents.splice(last)
  },

  scaleExists(id) {
    let scales = ScaleMaker.getScaleNames();
    return scales.indexOf(id) != -1 ? true : false
  },

  getToneIntervals(tone, scale) {
    let grade = scale.notes.indexOf(tone);
    let step = scale.inSemiTones[grade];
    return step;
  },

  generateScalePaterns(group) {
    for(var i in group) {
      let scale = group[i];

      if(scale.children != undefined ) {
        this.generateScalePaterns(scale.children)
        continue 
      }
      let exists = this.scaleExists(scale.id);
      if(!exists && scale.steps != undefined) {
        ScaleMaker.addScale(scale.id, scale.steps);
      }
    }
  },

  getLowestTone (scale) {
    let lowestTone = scale[0];
    let note = scale[0];
    let isLower = false;
    for(let i = 0; i < scale; ++i){
      note = note[0] < scale[i][0] ? note : scale
    }
    return note;
  },

  arrangeScaleOctaves(scale) {
    let root = scale.indexOf('C');
    root = root != -1 ? root : scale.indexOf('C#');
    root = root != -1 ? root : scale.indexOf('Cb');
    root = root != -1 ? root : scale.indexOf(this.getLowestTone(scale))
    if(root == 0) {
      return scale
    }
    let newScale = scale.slice(root);
    newScale = newScale.concat(scale.slice(0, root));
    scale = newScale
    return scale

  },

  getScaleType(id) {
    let scale = this.getScaleDef(id);
    return scale.type
  },

  getScaleDef(id, group){
    let g = !group ? Scales : group;
    let def;
    for(var i in g) {
      let scale = g[i];
      if(def != undefined) {
        break
      }
      if(scale.children != undefined ) {
        def = this.getScaleDef(id, scale.children)
        continue 
      }
      if(scale.id == id) {
        def = scale
      }
    }
    return def
  },

  isHigherPitch(scale, pitch, than) {
    if(pitch.oct > than.oct) {
      return true
    }
    if(scale.indexOf(pitch.tone) > scale.indexOf(than.tone)){
      return true
    }
    return false
  },

  generatePositions(fingers, baseScale, fretboard){
    let string;
    let strings = [];
    let positions = [];
    let pivots = [];
    let scale = this.arrangeScaleOctaves(baseScale)
    let rootString = fretboard[fretboard.length - 1];
    for (var i = 0; i < fretboard.length; i++) {
      pivots.push(0)
    }

    for(i = 0; i < fretboard.length; i++) {
      string = fretboard[i];
      string = this.getStringPositions(scale, string);
      strings.push(string)
    }
  
    let masterString = strings[strings.length - 1];

    for (let fret = 0; fret < masterString.length - (fingers - 1); fret++){
      let position = {matrix: []};
      let lastNote = ''
      for(let s = strings.length - 1; s >= 0  ; s--) {
        let stringPosition = [];
        let finger = 0;
        string = strings[s];
        pivots[s] = fret;

        for(let n = pivots[s]; n < string.length; n++) {
          if(finger >= fingers) {
            break
          }
          let note = string[n];
          let higer = lastNote == '' || this.isHigherPitch(scale, note, lastNote);
          if(higer) {
            stringPosition.push(note.fret);
            pivots[s]++
            finger++
            lastNote = note
          }
          
        }
        position.matrix.push(stringPosition)
      }
      position.root = position.matrix[0][0];
      position.matrix.reverse();
      position.number = baseScale.indexOf(rootString[position.root].tone);
      positions.push(position)
    }
    return positions
  },

  getStringPositions(scale, string) {
    let indices = [];
    
    for(var i = 0; i < string.length; i++) {
      if(scale.indexOf(string[i].tone) != -1) {
        indices.push(string[i])
      }
    }

    return indices
  },

  findNote(stringIndex, index, positions, matrix) {
    let isNote = false;
    for(var p = 0; p < positions.length; p++) {
      let string = matrix[positions[p]][stringIndex];
      if(string.indexOf(index) != -1) {
        return true
      }
    }
    return false
  },
  init() {
    this.generateScalePaterns(Scales)
  },

}
