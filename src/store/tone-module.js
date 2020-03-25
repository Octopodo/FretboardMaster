
import ScaleGenerator from '@/lib/scale-generator'
import Fretboard from '@/lib/fretboard'
import IntervalMaps from '@/note-maps/interval-map'
ScaleGenerator.init()

const chromaticScale = ScaleGenerator.make('chromatic', 'C', 13);
const standartTunning = [
  {tone:'E', oct: 4, fret: 0},
  {tone:'B', oct: 3, fret: 0},
  {tone:'G', oct: 3, fret: 0},
  {tone:'D', oct: 3, fret: 0},
  {tone:'A', oct: 2, fret: 0},
  {tone:'E', oct: 2, fret: 0}, 
]

export default {
  namespaced: true,
  state: {
    fretboard: new Fretboard('standart', 20, chromaticScale),
    chromaticScale: ScaleGenerator.chromaticScale(),
    currentScale: ScaleGenerator.make('major', 'C', 13),
    currentScaleId: 'major',
    scales: ScaleGenerator.scales,
    availableTones: ScaleGenerator.sharps,
    currentTone: 'C',
    positions: [],
    activePositions: [],
    fingerCount: 3,
    maxFingers: 4,
    tunning: standartTunning,
    intervalsMap: IntervalMaps.map,
    toneColor: '#42A5F5',
    allColors: '#42A5F5',
    allSelected: false,
    hideUnmarkedNotes: false,
    toneSize: 25,
    toneRoundness: 50,
    toneFontSize: 14,
    toneTextColor: '#FFFFFF' ,
    selectedColor: 'yellow',
    selectedWidth: 5
  },
  mutations: {
    SET_TONE_TEXT_COLOR(state, payload) {
      state.toneTextColor = payload.color
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

    SET_HIDE_UNMARKED_NOTES(state, value) {
      state.hideUnmarkedNotes = value
    },

    SET_FRETBOARD(state) {
      let fretboard = new Fretboard(state.tunning, 20, state.currentScale);
      state.fretboard = fretboard
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

    SET_POSITIONS(state) {
      state.positions = ScaleGenerator.generatePositions(state.fingerCount, state.currentScale.notes, state.fretboard.matrix())

    },
    SET_ACTIVE_POSITIONS(state, value){
      state.activePositions = value
    },

    SET_FINGER_COUNT(state, value) {
      state.fingerCount = value
    },
    SET_TONE_SIZE(state, value) {
      state.toneSize = value;
      state.toneRoundness = value * 2;
      state.toneFontSize = (value + 4) / 2
    }
  },
  getters: {
    getScaleTone(state) {
      return index => {
        return state.currentScale.notes[index]
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

    getHarmonicColor(state) {
      return tone => {
        let steps = ScaleGenerator.getToneIntervals(tone, state.currentScale);
        let note = state.intervalsMap.find(tone => tone.steps == steps)
        return note.visible ? note.color : state.toneColor
      }
    },
    stringTune(state) {
      return index => {
        return state.fretboard.tunning()[index] 
      }
    },
    fretTone(state) {
      return (index, stringIndex) => {
        return state.fretboard.matrix()[stringIndex][index]
      }
    },
    toneIsVisible(state) {
      return (tone, index, stringIndex) => {
        if(state.currentScale == [] || state.currentScale.notes.length == 0) {
          return true
        }
        let isInPosition =  state.activePositions.length <= 0 || state.positions.length <= 0 ? true : false;
        let isInScale = state.currentScale.notes.indexOf(tone) != -1;
        if(isInScale && !isInPosition) {
          for(var p = 0; p < state.positions.length; p++) {
            let position = state.positions[p];
            if(state.activePositions.indexOf(position.number) == -1) {
              continue
            }

            isInPosition = position.matrix[stringIndex].indexOf(index) != -1;
            if(isInPosition) {
              break
            }
            // isInPosition = 1
          }
        } 
        let isHidenNote = state.intervalsMap.find(interval => {
            let steps = ScaleGenerator.getToneIntervals(tone, state.currentScale);
            return interval.steps == steps && interval.visible
        }) == undefined && state.hideUnmarkedNotes
        return isInPosition && isInScale && !isHidenNote
      }
    },
    getCurrentScaleId(state) {
      return  scales => {
        return scales[state.currentScaleId] != undefined ? state.currentScaleId : undefined
      }
    },
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
    }
  }
}