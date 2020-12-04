import {Scale, ScaleType, Note, Interval, Pcset} from '@tonaljs/tonal'
import _ from 'underscore'

const grades =['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];


export default {
  map: {},
  scales: {},
  flattenScales: [],
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
    return map['_' + intervals.toString()]
  },


  init() {
    let pc = Pcset;
    let chroma = pc.get(["1P", "2M", '3M', '4P', '5P', '6M', '7M', '8P']);
    let sc = Scale.get(chroma.chroma)
    for(var i = 5; i < 13; i++) {
      let scaleSet = this.findScaleSet(i);
      let scales = ScaleType.all();
      this.scales[scaleSet] = _.filter(scales, function(type, key) {
        return type.intervals.length === i
      });
    }
    this.flattenScales = this.getScales(true)
    let stop = 0;
  },

  getScales(flat) {
    if(!flat) {
      return this.scales
    }

    let scales = [];
    for(var i in this.scales) {
      scales.push(this.scales[i])
    }

    scales = _.flatten(scales, true)
    return scales
  },
  

  makeScale(root, intervals) {
    let name = 'Personalizada'//'_' + intervals.join('_');
    ScaleType.add(intervals, name);
    let scale = Scale.get(`${root} ${name}`)
    return scale
  },

  getSteps(scale) {
    scale.steps = _.map(scale.intervals, function(interval) {
      return Interval.semitones(interval)
    })
    return scale.steps
  },

  getTypeByIntervals(intervals) {
    let chroma = Pcset.get(intervals).chroma;
    let scale = ScaleType.get(chroma)
    this.getSteps(scale)
    return scale
  },

  getTypeByName(name) {
    let stop = 0;
    let scale = ScaleType.get(name)
    this.getSteps(scale)
    return scale
  },

  getByIntervals(root, intervals) {
    let chroma = Pcset.get(intervals).chroma;
    let scale = ScaleType.get(chroma);
    scale = scale.name == "" ? this.makeScale(root, intervals) : Scale.get( `${root} ${scale.name}`);
    this.getSteps(scale)
    return scale
  },

  getByName(root, name) {
    let scale = Scale.get( `${root} ${name}`)
    this.getSteps(scale)
    return scale
  }
}