import { rgbToHex, hexToRgb } from '@/lib/utils.js' 
import FretConstants from '@/constants/fret-constants.js'
import Vue from 'vue'

const fbRatio = 0.6;
const windowWidth = window.innerWidth;

export default {
  namespaced: true,
  state: {
    //DIMENSIONS
    fbRatio: fbRatio,
    fretbarWidth: 4,
    fretboardHeight: 250,
    fretboardWidth: windowWidth * fbRatio,
    fretdotSize: 20,
    selectedWidth: 5,
    stringHeight: 4,
    toneFontSize: 14,
    toneRoundness: 50,
    toneSize: 30,
    fretDistances: [],
   
    //COLORS
    allColors: '#42A5F5',
    diapasonColor: '#FFCC9A',
    fretbarColor: '#686868',
    fretdotColor: 'rgba(255,255,255,0.2)',
    selectedColor: 'yellow',
    stringColor: '#000000',
    toneColor: '#FF1A00',//'#42A5F5',
    toneSelectedColor: '#3294e4',
    toneTextColor: '#FFFFFF',
    functionColors: {
      d: '#D1C4E9', //'deep-purple lighten-4',
      m: '#C5CAE9', //'indigo lighten-4',
      M: '#FFECB3', //'amber lighten-4',
      A: '#FFCCBC', //'deep-orange lighten-4',
      P: '#DCEDC8', //'light-green lighten-4',
      blank: 'FFFFFF'
    },
    setColors: [
      '#607D8B',
      '#F44336', 
      '#9C27B0', 
      '#795548', 
      '#009688', 
      '#FF6F00'
    ],
    intervalColors: [
      '#F44336',
      '#004D40', 
      '#FFAB00', 
      '#795548', 
      '#FFD600', 
      '#42A5F5',
      '#7C4DFF'
    ],

    //Opacities
    ghostNotesOpacity: 0.4,
    
    //USER
    allSelected: false,
    fretCount: 17,
    maxFingers: 4,
    stringCount: 6,
    showNotes: true,
    showIntervals: false,
    hideUnmarkedNotes: false,
    ghostNotes: false,

  },

  getters: {
    //SIMPLE
    diapasonColor: state=> state.diapasonColor,
    fingerCount: state => state.fingerCount,
    fretbarWidth: state => state.fretbarWidth,
    fretbarColor: state => state.fretbarColor,
    fretboardHeight: state => state.fretboardHeight,
    fretboardWidth: state => state.fretboardWidth,
    fretCount: state => state.fretCount,
    fretDistances: state => state.fretDistances,
    fretdotColor: state => state.fretdotColor,
    fretdotSize: state => state.fretdotSize,
    ghostNotes: state => state.ghostNotes,
    ghostNotesOpacity: state => state.ghostNotesOpacity,
    hideUnmarkedNotes: state => state.hideUnmarkedNotes,
    intervalColors: state => state.intervalColors,
    showNotes: state => state.showNotes,
    stringColor: state => state.stringColor,
    stringCount: state => state.stringCount,
    stringHeight: state => state.stringHeight,
    toneColor: state => state.toneColor,
    toneTextColor: state => state.toneTextColor,
    toneSize: state => state.toneSize,
    toneRoundness: state => state.toneRoundness,
    showIntervals: state => state.showIntervals,

    get(state) {
      return wich => {
        return state[wich]
      }
    },
    //COMPLEX
    toneSelectedColor(state) {
      return type => {
        let color = state.toneSelectedColor;
        return type == 'rgb' ? hexToRgb(color) : color
      }
    }
  },
  
  mutations: {
    SET_COLOR(state, {wich, color}) {
      state[wich + 'Color'] = color;
    },

    SET(state, {wich, value}) {
      Vue.set(state, wich ,  value);
    },

    SET_HEIGHT(state,{wich, value}) {
      Vue.set(state, wich + 'Height',  value);
    },

    SET_SIZE(state, {wich, value}) {
      state[wich + 'Size'] = value;
    },

    SET_FRETBAR_SIZE(state, value) {
      state.fretbarWidth = value 
    },

    SET_FRETBAR_WIDTH(state, value) {
      state.fretbarWidth = value
    },

    SET_FRETBOARD_HEIGHT(state, value) {
      state.fretboardHeight = value
    }, 

    SET_FRETBOARD_WIDTH(state) {
      state.fretboardWidth = window.innerWidth * state.fbRatio
    },

    SET_STRING_HEIGHT(state, value) {
      state.stringHeight = value 
    },

    SET_TONE_SIZE(state, value) {
      state.toneSize = value
    },

    SET_FRET_DISTANCES(state) {
      state.fretDistances = [];
      let fc = FretConstants;
      let ratio = fc[state.fretCount - 1]
      for(var i = 0; i < state.fretCount; i++) {
        let distance = state.fretboardWidth * FretConstants[i] / ratio
        state.fretDistances.push(distance)
      }
      var stop = 0;
    },
    
  },
  actions: {
    setFretboardSize({commit, rootGetters}) {
      commit('SET_FRETBOARD_WIDTH')
      commit('SET_FRET_DISTANCES');
    },
    initialize({commit, rootState}) {
      const fretboard = rootState.fretboard
      commit('SET', {wich: 'fretCount', value: fretboard.FRETS_SHOWN})
    }
  },

  
}