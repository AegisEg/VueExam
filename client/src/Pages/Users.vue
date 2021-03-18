<template>
  <div class="user-list">
    <router-link :to="'/addNewUser'">
      <v-btn class="addNew">Add new User</v-btn></router-link
    >
    <perfect-scrollbar
      ref="scrollbar"
      @ps-scroll-y="onScroll"
      class="user-list-scroll"
    >
      <userComponent v-for="(user, key) in users" :key="key" :user="user"></userComponent>
      <div class="loading" v-if="usersLoading">
        <img :src="loading" alt="loading" />
      </div>
    </perfect-scrollbar>   
  </div>
</template>
<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import loading from "../images/giphy.gif";
import { mapActions } from "vuex";
import userComponent from '../components/User.vue';
export default {
  components: {
    PerfectScrollbar,
    userComponent
  },

  mounted: function () {
    if (!this.getted && this.users.length === 0) this.loadUsers();
  },
  data() {
    return {
      loading,      
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    usersLoading() {
      return this.$store.getters.usersLoading;
    },
    getted() {
      return this.$store.getters.usersGetted;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    ...mapActions(["removeUser", "loadUsers"]),   
    onScroll: function (e) {
      let scrollbar = this.$refs.scrollbar.ps;
      let diff =
        scrollbar.contentHeight -
        (scrollbar.containerHeight + scrollbar.lastScrollTop);
      if (diff < 600 && !this.getted && !this.usersLoading) {
        this.loadUsers();
      }
    },
  },
};
</script>
<style>
.addNew {
  margin: auto;
  display: block;
  margin-bottom: 15px;
}
.user-list-scroll {
  height: calc(100vh - 131px);
  max-height: calc(100vh - 131px);
}
.user-list {
  padding: 5px 15px;
  width: 450px;
  max-width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}
.user-list .v-card {
  margin-bottom: 10px;
}
.loading {
  text-align: center;
}
.loading img {
  width: 60px;
}
.v-card__actions > * {
  margin-right: 15px;
}
.user-list a {
  color: inherit;
  text-decoration: none;
}
</style>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>