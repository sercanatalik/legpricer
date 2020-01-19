import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
var _ = require('lodash');

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  mutations: {
    pricer_delete_allLegs: state => state.pricer_legs = [],
    pricer_addLeg(state, leg) {
      // mutate state
      state.pricer_legs.push(leg)
      //console.log('added',leg)
    },
    pricer_updateLeg(state, leg) {
      // mutate state

      state.pricer_legs[leg.id] = leg
    },

    pricer_duplicateLeg(state, legId) {
      // mutate state
      // var newleg = state.pricer_legs.slice(legId)[0]
      var newLeg = {}
      _.forOwn(state.pricer_legs.slice(legId)[0], function (value, key) {
        newLeg[key] = value

      });
      newLeg.id = state.pricer_legs.length
      state.pricer_legs.push(newLeg)

    },

    pricer_deleteLeg(state, legId) {
      _.pullAt(state.pricer_legs, [legId]);
      state.pricer_legs = resetIndex(state.pricer_legs)
    },
    setMessage (state, msg) {
      state.bottle = msg
    }

  },
  state: {
    pricer_legs: [],
    bottle:'',
  },
  actions: {

  },
  getters: {
    pricer_legs: state => state.pricer_legs,


  },


})


function resetIndex(array) {
  array = _.cloneDeep(array);

  var i = 0;
  for (var leg in array) {
    array[leg].id = i;
    i = i + 1;
  }

  return array

}

// function remove(array, element) {
//   return array.filter(el => el !== element);
// }

// const vowelsAndX = ["a", "e", "i", "o", "u", "x"];
// const vowels = remove(vowelsAndX, "x");
// vowels.toString(); // "a,e,i,o,u"