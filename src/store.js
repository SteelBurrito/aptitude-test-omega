import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import jwt from 'jsonwebtoken';

Vue.use(Vuex);

const state = {
  testToken: '',
  tests: [],
  testID: '',
  tokenExpiry: '',
};

const mutations = {
  RECEIVE_TEST(state, test) {
    state.tests = test;
  },
  RECEIVE_TEST_ID(state, testid) {
    state.testID = testid;
  },
  SET_TEST_TOKEN(state, token) {
    state.testToken = token;
  },
  RECEIVE_TOKEN_EXPIRY_TIME(state, exp) {
    state.tokenExpiry = exp;
  },
  SET_TOKEN(state, token) {
    state.testToken = token;
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
  VERIFY_TOKEN_AND_RETRIEVE_TEST({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`https://aptitudetestapibyome.ga/tests/applicant-aptitude-test/${state.testToken}`, {
      }).then((res) => {
        commit('RECEIVE_TEST', res.data);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  },
  RETRIEVE_TEST({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('https://aptitudetestapibyome.ga/tests', {
        params: {
          testID: state.testID,
        },
      }).then((res) => {
        commit('RECEIVE_TESTS', res.data);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  },
  GET_TOKEN_EXPIRATION({ commit }) {
    const decodedToken = jwt.decode(state.testToken);
    commit('RECEIVE_TOKEN_EXPIRY_TIME', decodedToken.exp);
  },
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
});
export default store;
