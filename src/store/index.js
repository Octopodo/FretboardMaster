import Vue from 'vue'
import Vuex from 'vuex'
import ToneModule from '@/store/tone-module'
import FretboardModule from '@/store/fretboard-module'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexPersist = new VuexPersistence({
  storage: window.localStorage
})

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
  // plugins: [vuexPersist.plugin]
})
