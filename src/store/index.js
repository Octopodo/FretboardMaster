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
  mutations: {
  },
  actions: {
  },
  // plugins: [vuexPersist.plugin]
})
