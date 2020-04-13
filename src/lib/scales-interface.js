import {Scale, ScaleType, Note, Interval, Pcset} from '@tonaljs/tonal'
import _ from 'underscore'

const grades =['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];


export default {
  map: {},

  findScaleSet(intervals) {
    let map = {
      _5: 'pentatonics',
      _6: 'hexatonics',
      _7: 'heptatonics',
      _8: 'octotonics',
      _9: 'eneatonics',
      _10: 'decatonics',
      _11: 'endecatonics',
      _12: 'dodecatonics'
    }
    intervals = intervals instanceof Array ? intervals.length : intervals;
    return this[map['_' + intervals.toString()]]  
  },


  init() {
    let pc = Pcset;
    let chroma = pc.get(["1P", "2M", '3M', '4P', '5P', '6M', '7M', '8P']);
    let sc = Scale.get(chroma.chroma)
    for(var i = 5; i < 13; i++) {
      let scaleSet = this.findScaleSet(i);
      let scales = ScaleType.all();
      let scaleNames = _.filter(scales, function(type, key) {
        return type.intervals.length === i
      });

      for(var s = 0; s < scaleNames.length; s++) {
        let scale = scaleNames[s];
        let key = '_' + scale.intervals.join('_') + '_8P';
        this.map[key] = scale
      }
    }
    let stop = 0;
  },

  makeScale(root, intervals) {
    let name = 'Personalizada'//'_' + intervals.join('_');
    ScaleType.add(intervals, name);
    let scale = Scale.get(`${root} ${name}`)
    return scale
  },


  getTypeByIntervals(intervals) {
    let chroma = Pcset.get(intervals).chroma;
    return ScaleType.get(chroma)
  },

  getTypeByName(name) {
    let stop = 0;
    return ScaleType.get(name)
  },

  getByIntervals(root, intervals) {
    let chroma = Pcset.get(intervals).chroma;
    let scale = ScaleType.get(chroma);
    scale = scale.name == "" ? this.makeScale(root, intervals) : Scale.get( `${root} ${scale.name}`);
    return scale
  },

  getByName(root, name) {
    return Scale.get( `${root} ${name}`)
  }
}