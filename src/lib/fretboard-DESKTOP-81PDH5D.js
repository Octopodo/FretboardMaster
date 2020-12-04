import _ from 'underscore';
import { Scale, ScaleType, Note, AbcNotation as Notation, Chord} from '@tonaljs/tonal';


const ChromaticScale = require('@/constants/chromatic-scale.js').default
const tunning = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];

function getPureNote(note) {
  return note.replace(/[0-9]/g, '');
}

function getOctave(note) {
  return note.replace(/\D/g, '')
}


const Fretboard = function(tunning, fretCount, flats) {
  this.tunning = tunning;
  this.root = this.tunning[this.tunning.length - 1]
  this.fretCount = fretCount + 1;
  this.enharmonics = flats ? 'flats' : 'sharps';
  this.spine = [];
  this.matrix = []
  this.scaleFrets = [];
  this.scales = [];
  this.positions = [];
  
  this.generateSpine = function() {
    const firstFret = this.tunning[this.tunning.length - 1];
    const firstOctave = Note.octave(firstFret);
    const lastOctave = Note.octave(this.tunning[0]) + Math.floor(this.fretCount/12)
    const chromatic = Scale.get(`${firstFret} chromatic`);
    const notes = chromatic.notes;
    const stringOctaves = Math.floor(this.fretCount / notes.length);
    const octaves = lastOctave - firstOctave;
    const extra = this.fretCount - notes.length * stringOctaves
    for(var oct = firstOctave; oct < lastOctave; oct++) {
      let pitch = Note.get(firstFret).letter + oct;
      let scale = Scale.get(`${pitch} chromatic`).notes;
      scale = _.map(scale, function(n){return n})
      this.spine = this.spine.concat(scale)
    }
    let pitch = Note.get(firstFret).letter + (oct + 1);
    let scale = Scale.get(`${pitch} chromatic`).notes;
    scale = _.map(scale, function(n){return n}).slice(0, extra)
    this.spine = this.spine.concat(scale)
  }

  this.generate = function() {
    this.generateSpine();
    for (var s = 0; s < this.tunning.length; s++) {
      let root = this.tunning[s];
      let string = [];
      let fret = this.spine.indexOf(root);
      for( let f = 0; f < this.fretCount; f++) {
        let pitch = {
          note: this.spine[fret],
          scales: [],
          positions: [],
          fret: f,
          interval: '',
          chords: []
        }
        string.push(pitch);
        fret++
      }
      this.matrix.push(string)
    }
    var stop = 0;
  }

  this.addScale = function(scale, root) {
    scale = typeof scale === 'string' ? Scale.get(`${getPureNote(root)} ${scale.toLowerCase()}`) : scale;
    let scaleNotes = Scale.scaleNotes(scale.notes)
    this.clear('scales')
    this.walk(function(fret) {
      let inScale = _.find(scale.notes, function(n) { 
        let note = getPureNote(n);
        let fretNote =  getPureNote(fret.note);
        if(note == fretNote) {
          return true
        } else {
          let enharmonic = Note.enharmonic(fretNote);
          let isEnharmonic = note == enharmonic
          fret.note = isEnharmonic ? Note.enharmonic(fret.note) : fret.note
          return isEnharmonic
        }
      });
      
      if(inScale) {
        fret.scales.push(scale.name)
        fret.interval = scale.intervals[scaleNotes.indexOf(getPureNote(fret.note))]
      }
    })
  }

  this.addChord = function(chord) {
    let notes = Chord.get(chord).notes;
    this.walk(function(pitch){
      let note = Note.pitchClass(pitch.note);
      _.each(notes, n=> {
        if(n == note) {
          pitch.chords.push(chord)
        }
      })
    })
  },

  this.walk = function (callback) {
    _.each(this.matrix, function(string, stringKey) {
      _.each(string, function(pitch, fret) {
        callback(pitch, fret, stringKey)
      })
    })
  }

  this.getFirstFretInScale = function(scale, string) {
    string = !string ? this.matrix[this.matrix.length - 1] : string;
    let pureScale = Scale.scaleNotes(scale.notes)
    let stringNotes = this.getStringIndices(string, pureScale)
    return stringNotes[0]
  }

  this.getStringIndices = function ( string, scale, lastNote, context ) {
    context = !context ? this : context;
    let filtered = _.filter(string, function(pitch, i){
      return scale.indexOf(getPureNote(pitch.note)) != -1
    })
    if(!lastNote) {
      return filtered
    }

    let index = _.findIndex(filtered, function(pitch) {
      let pitchNote = context.spine.indexOf(pitch.note);
      let lastPureNote = context.spine.indexOf(lastNote.note);
      pitchNote = pitchNote == -1 ? context.spine.indexOf(Note.enharmonic(pitch.note)): pitchNote;
      lastPureNote = lastPureNote == -1 ? context.spine.indexOf(Note.enharmonic(lastNote.note)): lastPureNote;
      return pitchNote  > lastPureNote
    })

    return filtered.slice(index)
  }

  this.generatePositions = function(scale, fingers) {
    this.clear('positions')
    let lastNote = undefined;
    let pureScale = Scale.scaleNotes(scale.notes)
    let pureNote = getPureNote(this.getFirstFretInScale(scale).note);
    let position = pureScale.indexOf(pureNote);
    

    for (var s = this.matrix.length - 1; s >= 0; s--) {
      let string = this.matrix[s];
      let notesInString = this.getStringIndices(string, pureScale, lastNote, this)
      for(var p = 0; p < notesInString.length; p++) {
        for(var f = 0; f < fingers; f++) {
          let fret = notesInString[p + f];
          if(!fret) { break }
          fret.positions.push(position)
        }  
        position = (position + 1) >= pureScale.length ? 0 : position + 1
      }
      if( s == 0) { break }
      let cycle = (position + fingers) >= pureScale.length - 1;
      lastNote = notesInString[fingers - 1];
      position = pureScale.indexOf(pureNote)
    }
  }

  this.getPitch = function(string, fret) {
    return this.matrix[string][fret]
  }

  this.getStringPitch = function(string, fret) {
    return this.getPitch(this.tunning[string], fret)
  }

  this.clear = function (wich) {
    this.walk(function(note) {
      note[wich] = []
    })
  }

  this.print = function(wich) {
    let out = '';
    wich = !wich ? 'note' : wich;
    for(var s = 0; s < this.matrix.length ; s++) {
      out += '||'
      for(var p = 0; p < this.matrix[s].length; p++) {
        let pitch = this.matrix[s][p];
        if(!pitch[wich]) { 
          out += '[]--'
        }
        out += pitch[wich].toString() + '--'
      }
      out += '||\n' 
    }
    console.log(out)
  }

  this.generate()
}

export { Fretboard }



