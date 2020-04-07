import { Fretboard } from '@/lib/fretboard.js'
import ScaleGenerator from '@/lib/scale-generator'
import IntervalMaps from '@/constants/interval-map'
import Vue from 'vue'
import _ from 'underscore'
ScaleGenerator.init()

const chromaticScale = ScaleGenerator.make('chromatic', 'C', 13);
const majorScale = ScaleGenerator.make('major', 'C', 13);
const standartTunning = [
  'E4',
  'B3',
  'G3',
  'D3',
  'A2',
  'E2', 
]


export default {
  namespaced: true,
  state: {
    //SCALES
    availableTones: ScaleGenerator.sharps,
    chromaticScale: ScaleGenerator.chromaticScale(),
    currentScaleId: 'major',
    currentTone: 'C',
    intervalsMap: IntervalMaps.map,
    scales: ScaleGenerator.scales,
    activePositions: [],
    fretboard: undefined,
    positions: [],
    tunning: standartTunning,
    activeScales: [majorScale],
  },

  getters: {
    //SIMPLE
    toneSize: state => state.toneSize,
    stringCount: state=> state.stringCount,
    currentTone: state => state.currentTone,

    //COMPLEX
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
      // state.fretboard.fixScale(state.activeScales)
    },

    ADD_SCALE(state, id) {
      const newScale = ScaleGenerator.make(state.currentScaleId, state.currentTone, 13);
      state.maxFingers = state.fingerCount = newScale.fingers
      state.activeScales.push(newScale)
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

    SET_SCALE(state, id) {
      const newScale = ScaleGenerator.make(state.currentScaleId, state.currentTone, 13);
      Vue.set(state, 'activeScales', [newScale])
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
      commit('NEW_FRETBOARD', rootGetters['fretboard/fretCount'])
    },
    setScales({commit, rootGetters}, ids) {

      commit('SET_SCALES',ids);
      commit('NEW_FRETBOARD', rootGetters['fretboard/fretCount']);
      // commit('SET_POSITIONS');
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