import {Key, Chord, Note} from '@tonaljs/tonal'
import _ from 'lodash'


export default {

  getKey(pitch, type) {
    let note = Note.pitchClass(pitch)
    let c = Chord;
    let key = {}
    if(type.toLowerCase() == 'major') {
      key = Key.majorKey(note)
    } else {
      let keySubClass= {};
      let keyClass = type.split(' ')[0].toLowerCase();
      let minorKey = Key.minorKey(note);
      key = _.pickBy(minorKey, function( value, prop,) {
        if( prop == 'natural' || prop == 'harmonic' || prop == 'melodic') {
          if(prop === keyClass) {
            keySubClass = value
          } 
        } else {
          return prop + value
        }
      })
      key = _.merge(key, keySubClass)
    }
    
    return key
  }

}