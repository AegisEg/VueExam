import axios from "axios";
import config from "../config";
export default {
  namespace: true,
  state: {
    token: "",
    user: false,
  },
  mutations: {
    setUser: (state, user, token) => {
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = false;
      state.token = false;
    },
  },
  getters: {
    user: (state) => state.user,
  },
  actions: {
    async log_in({ commit }, email) {
      return await axios
        .post(config.apiUrl + "/api/auth/login", {
          email: email,
        })
        .then(({ data }) => data)
        .then((response) => {
          commit("setUser", response.user, response.token);
          window.axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.token;
          return {
            error: false,
            token: response.token,
          };
        })
        .catch(() => {
          return {
            error: true,
          };
        });
    },
    logout({ commit }) {
      commit("logout");
    },
    async CHECK_AUTH({ commit }, token) {
      window.axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return await axios
        .post(config.apiUrl + "/api/auth/checkAuth", {
          token,
        })
        .then(({ data }) => data)
        .then((response) => {
          commit("setUser", response.user, response.token);

          return {
            error: false,
            token: response.token,
          };
        })
        .catch(() => {
          return {
            error: true,
          };
        });
    },
  },
};
