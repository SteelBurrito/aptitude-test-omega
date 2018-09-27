import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import jwt from 'jsonwebtoken';

Vue.use(Vuex);

const state = {
  testToken: '',
  tests: [],
  testID: '',
  tokenCreation: '',
  tokenExpiry: '',
};

const mutations = {
  RECEIVE_TESTS(state, test) {
    state.tests = test;
  },
  SET_TEST_TOKEN(state, token) {
    state.testToken = token;
  },
  RECEIVE_TOKEN_EXPIRY_TIME(state, iat, exp) {
    state.tokenCreation = iat;
    state.tokenExpiry = exp;
  },
};

const actions = {
  TEST_SAMPLE({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('https://aptitudetestapibyome.ga/tests/5b9b36adb3ae9b33042a928a').then((res) => {
        commit('RECEIVE_TESTS', res.data);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  },
  // VERIFY_TOKEN({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     axios.get('https://aptitudetestapibyome.ga/tests/applicant-aptitude-test/', {
  //       params: {
  //         token: state.testToken,
  //       },
  //     }).then((res) => {
  //       commit('RECEIVE_TEST', res.data);
  //       resolve(res);
  //     }, (err) => {
  //       reject(err);
  //     });
  //   });
  // },
  GET_TOKEN_EXPIRATION({ commit }, token) {
    return new Promise((resolve, reject) => {
      jwt.decode(token).then((res) => {
        commit('RECEIVE_TOKEN_EXPIRY_TIME', res.iat, res.exp);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  },
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
});
export default store;
