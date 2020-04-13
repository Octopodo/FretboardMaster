import _ from 'underscore';
import { Scale, ScaleType, Note, AbcNotation as Notation} from '@tonaljs/tonal';


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
          fret: f
        }
        string.push(pitch);
        fret++
      }
      this.matrix.push(string)
    }
    var stop = 0;
  }

  this.addScale = function(scale) {
    scale = typeof scale === 'string' ? Scale.get(`${getPureNote(this.root)} ${scale.toLowerCase()}`) : scale;
    this.clearScale()
    this.walk(function(fret) {
      let inScale = _.find(scale.notes, function(n) { 
        let note = getPureNote(n);
        let fretNote =  getPureNote(fret.note);
        let hen = Note.enharmonic(fretNote);
        return  note == fretNote || note == Note.enharmonic(fretNote)
      });
      if(inScale) {
        fret.scales.push(scale.name)
      }
    })
  }

  this.walk = function (callback) {
    _.each(this.matrix, function(string) {
      _.each(string, function(fret) {
        callback(fret)
      })
    })
  }

  this.getPitch = function(string, fret) {
    return this.matrix[string][fret]
  }

  this.getStringPitch = function(string, fret) {
    return this.getPitch(this.tunning[string], fret)
  }

  this.clearScale = function () {
    this.walk(function(note) {
      note.scales = []
    })
  }

  this.generate()
}

export { Fretboard }



