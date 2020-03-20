import Vue from 'vue'
import Vuex from 'vuex'
import ToneModule from '@/store/tone-module'
import FretboardModule from '@/store/fretboard-module'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tone: ToneModule,
    fretboard: FretboardModule
  },
  state: {
    fretCount: 20,
    stringCount: 6,
  },
  getters: {
    fretCount: state => state.fretCount,
    stringCount: state => state.stringCount
  },
  mutations: {
  },
  actions: {
  },
})
