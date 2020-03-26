
const fbRatio = 0.8;
const PAR = 1;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
export default {
  namespaced: true,
  state: {
    diapasonColor: '#FFCC9A',
    fretbarColor: '#686868',
    stringColor: '#000000',
    fbRatio: fbRatio,
    fretboardSize: {
      width: windowWidth * fbRatio,
      height: windowHeight * fbRatio,
    },
    fretSize: {
      width: (windowWidth * fbRatio) / 20,
      height: 15,
      barWidth: 4,
    },
    stringHeight: 4,
    PAR: PAR
  },
  getters: {
    fretboardSize: state => state.fretboardSize, 
    fretSize: state => state.fretSize,
    stringHeight: state => state.stringHeight,
    fretHeight: state => state.fretSize.height,
    fretWidth: state => state.fretSize.width,
    fretbarWidth: state => state.fretSize.barWidth

  },
  mutations: {
    SET_FRET_SIZE(state, fretCount) {
      state.fretSize.width = state.fretboardSize.width / fretCount;
      // state.fretSize.height = state.fretboardSize.height / fretCount; 
    },
    SET_FRET_HEIGHT(state, value) {
      state.fretSize.height = value;
      // state.fretSize.height = state.fretboardSize.height / fretCount; 
    },
    SET_FRETBOARD_SIZE(state) {
      state.fretboardSize.height = window.innerHeight * fbRatio;
      state.fretboardSize.width = window.innerWidth * fbRatio;
    },
    SET_COLOR(state, payload) {
      state[payload.wich + 'Color'] = payload.color;
    },
    SET_STRING_HEIGHT(state, value) {
      state.stringHeight = value 
    },
    SET_FRETBAR_SIZE(state, value) {
      state.fretSize.barWidth = value 
    },
    SET_FRETBAR_WIDTH(state, value) {
      state.fretSize.barWidth = value
    }
  },
  actions: {
    setFretboardSize({commit, rootGetters}) {
      commit('SET_FRETBOARD_SIZE')
      commit('SET_FRET_SIZE', rootGetters.fretCount);
      
    }
  }
}