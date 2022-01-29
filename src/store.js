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
  sampleApplicant: '',
  applicantResults: [],
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
  SET_APPLICANT_SAMPLE(state, applicant) {
    state.sampleApplicant = applicant;
  },
  STORE_RESULTS(state, answers) {
    state.applicantResults = answers;
  },
};

const actions = {
  CREATE_SAMPLE_APPLICANT({ commit }, applicant) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env}/applicants`, {
        name: applicant.name,
        jobtitleApplied: applicant.jobtitleApplied,
        email: applicant.email,
      }).then((res) => {
        commit('SET_APPLICANT_SAMPLE', res.data);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  },
  ASSIGN_SAMPLE_APPLICANT_TEST() {
    return new Promise((resolve, reject) => {
      axios.put(`${process.env}/applicants/${state.sampleApplicant._id}`, {
        aptitudeTest: '5be3ea706afee74a26c60135',
      }).then((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  },
  GENERATE_TOKEN({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env}/applicants/generate/${state.sampleApplicant._id}`).then((res) => {
        commit('SET_TOKEN', res.data.token);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  },
  VERIFY_TOKEN_AND_RETRIEVE_TEST({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env}/tests/applicant-aptitude-test/${state.testToken}`, {
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
      axios.get(`${process.env}/tests`, {
        params: {
          testID: state.testID,
        },
      }).then((res) => {
        commit('RECEIVE_TESTS', res.data.id);
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
  GENERATE_SAMPLE_TOKEN({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env}/applicants/generate/5b9b1781174fb73f788f312a`).then((res) => {
        commit('SET_TOKEN', res.data.token);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  },
  SUBMIT_APPLICANT_ANSWERS({ commit }, submission) {
    return new Promise((resolve, reject) => {
      axios.put(`${process.env}/applicants/submit/${state.testToken}`, {
        results: submission,
      }).then((res) => {
        commit('STORE_RESULTS', submission);
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
