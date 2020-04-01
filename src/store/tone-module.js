
import ScaleGenerator from '@/lib/scale-generator'
import Fretboard from '@/lib/fretboard'
import IntervalMaps from '@/note-maps/interval-map'
import Vue from 'vue'
ScaleGenerator.init()

const chromaticScale = ScaleGenerator.make('chromatic', 'C', 13);
const majorScale = ScaleGenerator.make('major', 'C', 13);
const standartTunning = [
  {tone:'E', oct: 4, fret: 0, grade: 3},
  {tone:'B', oct: 3, fret: 0, grade: 7},
  {tone:'G', oct: 3, fret: 0, grade: 5},
  {tone:'D', oct: 3, fret: 0, grade: 2},
  {tone:'A', oct: 2, fret: 0, grade: 6},
  {tone:'E', oct: 2, fret: 0, grade: 3}, 
]

export default {
  namespaced: true,
  state: {
    //SCALES
    availableTones: ScaleGenerator.sharps,
    chromaticScale: ScaleGenerator.chromaticScale(),
    currentScale: majorScale,
    currentScaleId: 'major',
    currentTone: 'C',
    intervalsMap: IntervalMaps.map,
    scales: ScaleGenerator.scales,
    activePositions: [],
    fretboard: new Fretboard('standart', 24, majorScale),
    positions: [],
    tunning: standartTunning,
    
  },

  getters: {
    //SIMPLE
    toneSize: state => state.toneSize,
    stringCount: state=> state.stringCount,

    //COMPLEX
    getCurrentScaleId(state) {
      return  scales => {
        return scales[state.currentScaleId] != undefined ? state.currentScaleId : undefined
      }
    },

    getHarmonicColor(state) {
      return tone => {
        let steps = ScaleGenerator.getToneIntervals(tone, state.currentScale);
        let note = state.intervalsMap.find(tone => tone.steps == steps)
        return note.visible ? note.color : state.toneColor
      }
    },
    
    getScaleHarmonicFrets(state) {
      let frets = [];
      let lastName = '';
      let outputName = '';
      let next = false
      let steps = state.currentScale.inSemiTones;
      for(var i = 0; i < steps.length; i++) {
        let step = steps[i];
        let fret = state.intervalsMap.find(interval => interval.steps == step);
        if(fret != undefined) {
          outputName = fret.name.split(' ')[0];
          next = outputName == lastName;
          outputName =  fret.name.split('::');
          fret.outputName = next && outputName[1] != undefined ? outputName[1] : outputName[0];
          lastName = fret.outputName.split(' ')[0];
          frets.push(fret)
        }
      }
      return frets
    },

    getScaleTone(state) {
      return index => {
        return state.currentScale.notes[index]
      }
    },

    getTone(state) {
      return (index, stringIndex) => {
        return state.fretboard.matrix[stringIndex][index]
      }
    },

    stringTune(state) {
      return index => {
        return state.fretboard.tunning()[index] 
      }
    },

    toneIsVisible(state) {
      return indices => {
        let string = indices.string;
        let fret = indices.fret;
        let note = state.fretboard.matrix[string][fret];
        let isInPosition = false 
        if(state.activePositions.length > 0) {
          for(var p = 0; p < state.positions.length; p++) {
            let position = state.positions[p];
            if(state.activePositions.indexOf(position.number) == -1) {
              continue
            }

            isInPosition = position.matrix[string].indexOf(fret) != -1;
            if(isInPosition) {
              note.visible = true
              break
            }
            // isInPosition = 1
          }
        }
        return note.visible 
      }
    },

    toneIsSelected(state) {
      return indices => {
        return state.fretboard.matrix[indices.string][indices.fret].selected 
      }
    }
    
  },

  mutations: {
    SET_ACTIVE_POSITIONS(state, value){
      Vue.set(state, 'activePositions', value)
    },

    SET_ALL_FRET_COLORS(state, color) {
      state.allColors = color;
      for(var i = 0; i < state.intervalsMap.length; i++) {
        state.intervalsMap[i].color = color
      }
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

    SET_FINGER_COUNT(state, value) {
      state.fingerCount = value
    },

    SET_FRETBOARD(state) {
      state.fretboard = new Fretboard(state.tunning, 20, state.currentScale);
    },

    SET_HIDE_UNMARKED_NOTES(state, value) {
      state.hideUnmarkedNotes = value
    },


    SET_POSITIONS(state, fingerCount) {
      state.positions = ScaleGenerator.generatePositions(fingerCount, state.currentScale.notes, state.fretboard.matrix)

    },

    CHANGE_TONE(state, index) {
      state.currentTone = state.availableTones[index]
    },
    

    SWITCH_TONE_SELECTION(state, indices) {
      state.fretboard.switchFretValue('selected',indices.string, indices.fret, indices.value)
    },

    SWITCH_TONE_VISIBILITY(state, indices) {
      state.fretboard.switchFretValue('visible', indices.string, indices.fret, indices.value)
    }
  },
 
  

  actions: {
    setCurrentScale({commit}, id) {
      commit('SET_CURRENT_SCALE',id);
      commit('SET_FRETBOARD');
      commit('SET_POSITIONS');
    },
    changeTone({commit}, newTone) {
      commit('CHANGE_TONE', newTone);
      commit('SET_CURRENT_SCALE');
      commit('SET_FRETBOARD')
      commit('SET_POSITIONS')
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