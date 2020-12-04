import { Fretboard } from '@/lib/fretboard.js'
import ChordsInterface from '@/lib/chords-interface.js'
import IntervalMaps from '@/constants/interval-map'
import Scales from '@/lib/scales-interface'
import Vue from 'vue'
import _ from 'underscore'


const standartTunning = [
  'E4',
  'B3',
  'G3',
  'D3',
  'A2',
  'E2', 
]

const majorScale = Scales.getTypeByName('major')

export default {
  namespaced: true,
  state: {
    //SCALES
    availableKeys: ['Major', 'Natural Minor', 'Harmonic Minor', "Melodic Minor"],
    activeScale: majorScale,
    activeScales: [majorScale],
    chromaticScale: Scales.getByName('C2', 'chromatic').notes,
    currentTone: 'C2',
    chords: [],
    fingers: 2,
    fretboard: undefined,
    intervalsMap: IntervalMaps.map,
    key: 'Major',
    
    maxFingers: 3,
    positions: [],
    positionsCount: 7,
    scaleNotes: [],
    tunning: standartTunning,
    userScales: []
  },

  getters: {
    //SIMPLE
    activeScale: state => state.activeScale,
    chords: state => state.chords,
    currentTone: state => state.currentTone,
    fingers: state => state.fingers,
    maxFingers: state => state.maxFingers,
    positions: state => state.positions,
    positionsCount: state => state.positionsCount,
    stringCount: state=> state.stringCount,
    toneSize: state => state.toneSize,
    userScales: state => state.userScales,
    

    //COMPLEX

    getKey(state) {
      return ChordsInterface.getKey(state.currentTone, state.key)
    },

    getScaleType(state) {
      return intervals => {
        return intervals instanceof Array ? Scales.getTypeByIntervals(intervals) : Scales.getTypeByName(intervals)
      }
    },

    getScale(state) {
      return intervals => {
        return intervals instanceof Array ? Scales.getByIntervals(state.currentTone, intervals) : Scales.getByName(state.currentTone, intervals)
      }
    },

    getScales(state) {
      return (flatten, sorted) => {
        if(!flatten) {
          return Scales.getScales()
        } 

        let scales = !sorted ? Scales.getScales(true) : _.sortBy(Scales.getScales(true), function(scale) {
          return scale.name
        });
        
        return scales
      }
    },

    getCurrentScaleId(state) {
      return  scales => {
        return scales[state.currentScaleId] != undefined ? state.currentScaleId : undefined
      }
    },

    getPitch(state) {
      return (string, fret) => {
        return state.fretboard.getPitch(string, fret)
      }
    },

    pitchIsSelected(state){
      return(string, fret) => {
        return true
      }
      
    }
  },

  mutations: {

    ADD_SCALE(state, scale) {
      state.activeScales.push(scale)
    },

    CHANGE_KEY(state, index) {
      state.key = state.availableKeys[index]
    },
    CHANGE_TONE(state, index) {
      state.currentTone = state.chromaticScale[index]
    },

    CURRENT_SCALE(state, scale) {
      state.currentScale = scale
    },

    GENERATE_POSITIONS(state) {
      state.fretboard.generatePositions( state.activeScale, state.fingers + 1)
    },

    NEW_FRETBOARD(state, fretCount) {
      state.fretboard= new Fretboard(state.tunning, fretCount);
    },

    SET(state, payload) {
      state[payload.wich] = payload.value
    },

    SET_ROOT_TONE(state, root) {
      state.currentTone = root
    },

    UPDATE_FINGERS(state, fingers) {
      state.fingers = fingers;
      state.fretboard.generatePositions( state.activeScale, state.fingers + 1)
    },

    UPDATE_SCALE(state, scale) {
      let scaleName = state.activeScale.type ||state.activeScale.name;
      let newScale = !scale ? Scales.getByName(state.currentTone, scaleName) : scale
      newScale = typeof scale === 'string' ? Scales.getByName(state.currentTone, scale.toLocaleLowerCase()) : newScale
      Vue.set(state, 'activeScale', newScale);
      state.fretboard.addScale(state.activeScale);
      state.scaleNotes = newScale.notes
      Vue.set(state,'positionsCount',  newScale.notes.length)
    },
  },
 

  actions: {
    initialize({commit, rootGetters, dispatch}) {
      Scales.init()
      commit('NEW_FRETBOARD', rootGetters['fretboard/fretCount']);
      commit('UPDATE_SCALE');
      commit('GENERATE_POSITIONS')
    },

    async updateScale({commit}, scale) {
      await commit('UPDATE_SCALE', scale);
      await commit('GENERATE_POSITIONS')
    },

    changeTone({commit, rootGetters}, newTone) {
      commit('CHANGE_TONE', newTone);
      commit('UPDATE_SCALE');
      commit('GENERATE_POSITIONS')
    },

    async changeFingerCount({commit}, value) {
      await commit('SET_FINGER_COUNT', value)
      await commit('SET_POSITIONS')
    },
    generatePositions({commit, rootGetters}) {
      commit('SET_POSITIONS', rootGetters['fretboard/fingerCount'])
    },

    changeKey({commit}, index) {
      commit('CHANGE_KEY', index)
    },

    addChord({state}, chord) {
      let c = chord;
      let s = state;
      let a = 0;
    }
  }
}