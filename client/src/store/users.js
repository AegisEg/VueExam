import axios from "axios";
import config from "../config";
export default {
  namespace: true,
  state: {
    isLoading: true,
    users: [],
    isGetted: false,
  },
  mutations: {
    addUsers: (state, users) => {
      state.users = [...state.users, ...users];
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    getted: (state) => {
      state.isGetted = true;
    },
    changeUser: (state, user) => {
      state.users = state.users.map((item) => {
        if (item.id == user.id) return user;
        else return item;
      });
    },
    addNewUser: (state, user) => {
      state.users = [...state.users, user];
    },
    removeUser: (state, id) => {
      state.users = state.users.filter((item) => item.id != id);
    },
  },
  getters: {
    users: (state) => state.users,
    usersLoading: (state) => state.isLoading,
    usersGetted: (state) => state.isGetted,
  },
  actions: {
    async loadUsers({ commit, state }, email) {
      commit("startLoading");
      return await axios
        .post(config.apiUrl + "/api/user/getUsers", {
          last: state.users.length,
        })
        .then(({ data }) => data)
        .then(({ users }) => {
          commit("stopLoading");
          if (users.length == 0) commit("getted");
          else commit("addUsers", users);
          commit("stopLoading");
          return {
            error: false,
          };
        })
        .catch(() => {
          return {
            error: true,
          };
        });
    },
    async addNewUser({ commit, state }, user) {
      await axios
        .post(config.apiUrl + "/api/user/addNewUser", {
          user,
        })
        .then(({ data }) => data)
        .then(({ error, newUser }) => {
          if (!error && state.isGetted) {
            commit("addNewUser", newUser);
          }
          return error;
        })
        .catch(() => {
          return true;
        });
    },
    async changeUser({ commit, state }, user) {
      await axios
        .post(config.apiUrl + "/api/user/changeUser", {
          user,
        })
        .then(({ data }) => data)
        .then(({ error }) => {
          if (!error) {
            commit("changeUser", user);
          }
          return error;
        })
        .catch(() => {
          return true;
        });
    },
    async removeUser({ commit, state }, id) {
      await axios
        .post(config.apiUrl + "/api/user/deleteUser", {
          userId: id,
        })
        .then(({ data }) => data)
        .then(({ error }) => {
          if (!error) {
            commit("removeUser", id);
          }
          return error;
        })
        .catch(() => {
          return true;
        });
    },
  },
};
