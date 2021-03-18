<template>
  <v-card elevation="2">
    <v-card-title>{{ user.last_name }} {{ user.first_name }}</v-card-title>
    <v-card-subtitle>{{ user.email }}</v-card-subtitle>
    <v-card-subtitle>{{ user.gender }}</v-card-subtitle>
    <v-card-subtitle>{{ user.ip_address }}</v-card-subtitle>
    <v-card-actions>
      <router-link :to="'/user/' + user.id">
        <v-btn outlined rounded text> change </v-btn>
      </router-link>
      <v-btn
        depressed
        outlined
        color="error"
        rounded
        text
        @click="dialogRemove(user)"
      >
        Remove
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Remove: {{ user.last_name }} {{ user.last_name }}
        </v-card-title>
        <v-card-text> Are you sure you want to delete this user? </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="closeDialog"> I reject </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="remove()"> I accept </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "user",
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
  computed: {
    userAuth() {
      return this.$store.getters.user;
    },
  },
  methods: {
    ...mapActions(["removeUser"]),
    dialogRemove: function () {
      if (this.user.id == this.userAuth.id) {
        this.$toast.warning("You cannot delete yourself", {
          timeout: 2000,
        });
      } else {
        this.dialog = true;
      }
    },
    closeDialog: function () {
      this.dialog = false;
    },
    remove: async function () {
      this.removeUser(this.user.id).then((error) => {
        if (error) {
          this.$toast.error("An error has occurred", {
            timeout: 2000,
          });
        } else {
          this.$toast.success("Successful deletion", {
            timeout: 2000,
          });
        }
        this.dialog = false;
      });
    },
  },
};
</script>
