import { Fretboard } from '@/lib/fretboard.js'
import ScaleGenerator from '@/lib/scale-generator'
import IntervalMaps from '@/constants/interval-map'
import Scales from '@/lib/scales-interface'
import Vue from 'vue'
import _ from 'underscore'
ScaleGenerator.init()

const chromaticScale = ScaleGenerator.make('chromatic', 'C', 13);
const standartTunning = [
  'E4',
  'B3',
  'G3',
  'D3',
  'A2',
  'E2', 
]

const majorScale = Scales.getByName('C2', 'major')

export default {
  namespaced: true,
  state: {
    //SCALES
    activePositions: [],
    activeScale: majorScale,
    activeScales: [majorScale],
    availableTones: ScaleGenerator.sharps,
    chromaticScale: ScaleGenerator.chromaticScale(),
    currentTone: 'C2',
    fretboard: undefined,
    intervalsMap: IntervalMaps.map,
    positions: [],
    scales: ScaleGenerator.scales,
    tunning: standartTunning,
    userScales: []
  },

  getters: {
    //SIMPLE
    toneSize: state => state.toneSize,
    stringCount: state=> state.stringCount,
    currentTone: state => state.currentTone,
    userScales: state => state.userScales,
    activeScale: state => state.activeScale,
    

    //COMPLEX
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
  },

  mutations: {
    NEW_FRETBOARD(state, fretCount) {
      state.fretboard= new Fretboard(state.tunning, fretCount);
    },

    ADD_SCALE(state, scale) {
      state.activeScales.push(scale)
    },

    CURRENT_SCALE(state, scale) {
      state.currentScale = scale
    },

    SET_SCALES(state, ids) {
      state.activeScales = [];
      _.each(ids, function(id){
        const newScale = ScaleGenerator.make(id, state.currentTone, 13);
        state.maxFingers = state.fingerCount = newScale.fingers
        state.activeScales.push(newScale)
      })
      
    },
    
    REMOVE_SCALE(state, id) {
      const newScales = _.reject(this.activeScales, function(scale) {
        scale.definition.id == id
      }, this);
      Vue.set(state, 'activeScales', newScales)
    },

    SET_ROOT_TONE(state, root) {
      state.currentTone = root
    },

    UPDATE_SCALE(state, scale) {
      scale = !scale ? state.activeScale : scale
      Vue.set(state, 'activeScale', scale);
      state.fretboard.addScale(state.activeScale);
    },

    SELECT_ALL_FRETS(state, value) {
      state.allSelected = value;
      for(var i = 0; i < state.intervalsMap.length; i++) {
        state.intervalsMap[i].visible = value
      }
    },

    SET_CURRENT_SCALE(state, id) {
      state.currentScaleId = id || state.currentScaleId;
      state.currentScale = ScaleGenerator.make(state.currentScaleId, state.currentTone, 13);
      state.maxFingers = ScaleGenerator.getScaleDef(state.currentScaleId).fingers
      state.fingerCount = state.maxFingers
    },

    CHANGE_TONE(state, index) {
      state.currentTone = state.availableTones[index]
    },
    
  },
 

  actions: {
    initialize({commit, rootGetters}) {
      Scales.init()
      commit('NEW_FRETBOARD', rootGetters['fretboard/fretCount']);
      commit('UPDATE_SCALE')
    },

    updateScale({commit}, scale) {
      commit('UPDATE_SCALE', scale);
    },

    changeTone({commit, rootGetters}, newTone) {
      commit('CHANGE_TONE', newTone);
      commit('SET_CURRENT_SCALE');
      commit('NEW_FRETBOARD', rootGetters['fretboard/fretCount'])
      // commit('SET_POSITIONS')
    },

    changeFingerCount({commit}, value) {
      commit('SET_FINGER_COUNT', value)
      commit('SET_POSITIONS')
    },
    generatePositions({commit, rootGetters}) {
      commit('SET_POSITIONS', rootGetters['fretboard/fingerCount'])
    }
  }
}