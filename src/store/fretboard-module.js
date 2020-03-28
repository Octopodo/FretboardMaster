import { rgbToHex, hexToRgb } from '@/lib/utils.js' 

const fbRatio = 0.8;
const windowWidth = window.innerWidth;

export default {
  namespaced: true,
  state: {
    //DIMENSIONS
    fbRatio: fbRatio,
    fretbarWidth: 4,
    fretboardHeight: 200,
    fretboardWidth: windowWidth * fbRatio,
    selectedWidth: 5,
    stringHeight: 4,
    toneFontSize: 14,
    toneRoundness: 50,
    toneSize: 25,
   
    //COLORS
    allColors: '#42A5F5',
    diapasonColor: '#FFCC9A',
    fretbarColor: '#686868',
    selectedColor: 'yellow',
    stringColor: '#000000',
    toneColor: '#42A5F5',
    toneSelectedColor: '#FF0000',
    toneTextColor: '#FFFFFF' ,
    
    //USER
    allSelected: false,
    fingerCount: 3,
    fretCount: 20,
    maxFingers: 4,
    stringCount: 6,
    hideUnmarkedNotes: false,
  },
  getters: {
    //SIMPLE
    diapasonColor: state=> state.diapasonColor,
    fretbarWidth: state => state.fretbarWidth,
    fretbarColor: state => state.fretbarColor,
    fretboardHeight: state => state.fretboardHeight,
    fretboardWidth: state => state.fretboardWidth,
    fretCount: state => state.fretCount,
    stringColor: state => state.stringColor,
    stringCount: state => state.stringCount,
    stringHeight: state => state.stringHeight,
    toneColor: state => state.toneColor,
    toneTextColor: state => state.toneTextColor,
    toneSize: state => state.toneSize,
    toneRoundness: state => state.toneRoundness,

    //COMPLEX
    toneSelectedColor(state) {
      return type => {
        let color = state.toneSelectedColor;
        return type == 'rgb' ? hexToRgb(color) : color
      }
    }
  },
  
  mutations: {
    SET_COLOR(state, payload) {
      state[payload.wich + 'Color'] = payload.color;
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
    }

    
  },
  actions: {
    setFretboardSize({commit, rootGetters}) {
      commit('SET_FRETBOARD_SIZE')
      commit('SET_FRET_SIZE', rootGetters.fretCount);
      
    }
  }
}