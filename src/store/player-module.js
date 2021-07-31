import Vue from 'vue';

window.AudioContext = window.AudioContext || window.webkitAudioContext;



function generateSequence(uniq, numberNotes){
  var sequence = []
  var count = numberNotes || 7;
  var i, j;
  function randomInt(min, max) {  
    let res = Math.floor(Math.random() * (max - min + 1)) + min;
    return res
  }

  let positions = [];
  if(uniq) {
    for(i = 0; i < count; i++) {
      positions.push(i)
    }
    for(i = positions.length - 1; i >= 0; i--) {
      sequence.push(positions.splice(randomInt(0, i - 1), 1) [0])
    }
  } else {
    for(i = 0; i < count; i++) {

      sequence.push(randomInt(0, count - 1))
    }
  }
  return sequence

}

export default {
  namespaced: true,
  state: {
    bpm: 120,
    beat: 7,
    beats: [1, 2, 3, 4, 5, 6 , 7, 8],
    playing: false,
    interval: 0,
    sequence: [],
    uniq: true,
    count: 7,
    type: 'positions',
    intervalID: '',
    currentPoint: 0,
    bipFrequency: 300
  },
  getters: {
    bpm: state => state.bpm,
    beat: state => state.beat,
    beats: state => state.beats,
    sequence: state => state.sequence,
    uniq: state => state.uniq,
    count: state => state.count,
    playing: state => state.playing,
    type: state => state.positions,
    intervalID: state => state.intervalID,
    interval: state => state.interval,
    currentPoint: state => state.currentPoint,
    bip: state => state.note,
    bipFrequency: state => state.noteFrequency
  },
  mutations: {
    BPM(state, bpm) {
      state.bpm = bpm
    },
    BEAT(state, beat) {
      state.beat = beat
    },
    PLAY(state) {
      state.playing = true
    },
    STOP(state) {
      state.playing = false
    },
    INTERVAL(state) {
      state.interval = (60000/state.bpm)*state.beats[state.beat]
    },
    REDUCE_SEQUENCE(state, index) {
      state.sequence.splice(index, 1)
    },
    NEW_SEQUENCE(state) {
      state.sequence = generateSequence(state.uniq, state.count)
    },
    INTERVAL_ID(state, id){
      state.intervalID = id
    },
    CURRENT_POINT(state, point) {
      state.currentPoint = point
    }
  },
  actions: {
    async update({getters, commit}) {
      let sequence = getters.sequence;
      await commit('INTERVAL');
      if(sequence.length <= 0) {
        await commit('NEW_SEQUENCE');
        sequence = getters.sequence
      }
      await commit('CURRENT_POINT', sequence[0]);
      await commit('REDUCE_SEQUENCE', 0);
      await commit('tone/SET', {wich: 'positions', value: [getters.currentPoint]}, {root: true})

    },
    async play({commit, dispatch, getters}) {
      await commit('PLAY');
      await commit('INTERVAL')
      await commit('NEW_SEQUENCE');

      dispatch('update')
      let intervalID = setInterval(() => {
        dispatch('update');

      }, getters.interval)
      commit('INTERVAL_ID', intervalID)
    },
    async changeBpm ({commit, dispatch, getters}, bpm) {
      let wasPlaying = getters.playing
      await dispatch('stop')
      await commit('BPM', bpm);
      wasPlaying && await dispatch('play');
    },
    async changeBeat ({commit, dispatch, getters}, beat) {
      let wasPlaying = getters.playing
      await dispatch('stop')
      await commit('BEAT', beat);
      wasPlaying && await dispatch('play');
    },
    stop({commit, getters}) {
      commit('STOP');
      clearInterval(getters.intervalID)
    },
    async playBip({getters}) {
      let bip = getters.bip;
      bip.start();
      bip.stop(0.5);

    }
  }
}
