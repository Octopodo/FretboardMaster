import Vue from 'vue'
import _ from 'underscore'

Vue.filter('capitalize', function(string) {
  let words = string.split(" ");
  words = _.map(words, function(word) {
    return word[0].toUpperCase() + word.substr(1)
  })
  return words.join(' ')
})