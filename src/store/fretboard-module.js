
const fbRatio = 0.8;
const PAR = 1;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
export default {
  namespaced: true,
  state: {
    //DIMENSIONS
    fbRatio: fbRatio,
    fretbarWidth: 4,
    fretboardSize: {
      width: windowWidth * fbRatio,
      height: 200,
    },
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
    fretboardSize: state => state.fretboardSize,
    fretCount: state => state.fretCount,
    stringColor: state => state.stringColor,
    stringCount: state => state.stringCount,
    stringHeight: state => state.stringHeight,
    toneColor: state => state.toneColor,
    toneSize: state => state.toneSize,
    toneRoundness: state => state.toneRoundness,

    //COMPLEX
  },
  
  mutations: {
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