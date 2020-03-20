
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
      stringHeight: 4
    },
    PAR: PAR
  },
  getters: {
    fretboardSize: state => state.fretboardSize, 
    fretSize: state => state.fretSize,
    stringSize: state => state.stringSize,
  },
  mutations: {
    SET_FRET_SIZE(state, fretCount) {
      state.fretSize.width = state.fretboardSize.width / fretCount;
      // state.fretSize.height = state.fretboardSize.height / fretCount; 
    },
    SET_FRETBOARD_SIZE(state) {
      state.fretboardSize.height = window.innerHeight * fbRatio;
      state.fretboardSize.width = window.innerWidth * fbRatio;
    }
  },
  actions: {
    setFretboardSize({commit, rootGetters}) {
      commit('SET_FRETBOARD_SIZE')
      commit('SET_FRET_SIZE', rootGetters.fretCount);
      
    }
  }
}