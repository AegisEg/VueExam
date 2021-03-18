<template>
  <div class="content">
    <div class="loading" v-if="isLoading">
      <img :src="loading" alt="loading" />
    </div>
    <v-form v-if="!isLoading" ref="form" class="edit-form" @submit="submit">
      <h1 v-if="user.id">User changes:{{ user.id }}</h1>
      <h1 v-if="!user.id">Add new user</h1>
      <v-text-field
        v-model="user.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.first_name"
        label="First Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.last_name"
        label="Last Name"
        required
      ></v-text-field>
      <v-select
        :items="genders"
        required
        v-model="user.gender"
        label="Gender"
      ></v-select>
      <v-text-field
        v-model="user.ip_address"
        label="IP Address"
        :rules="ipRoles"
        required
      ></v-text-field>
      <v-btn class="mr-4" type="submit" :disabled="!valid"> Next </v-btn>
    </v-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import config from "../config";
import loading from "../images/giphy.gif";
export default {
  data() {
    return {
      loading,
      user: false,
      isLoading: true,
      genders: ["Female", "Male"],
      regxEmail: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => this.regxEmail.test(v) || "E-mail must be valid",
      ],
      regxIP: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      ipRoles: [
        (v) => !!v || "IP is required",
        (v) => this.regxIP.test(v) || "IP must be valid",
      ],
    };
  },
  computed: {
    valid() {
      if (
        this.regxEmail.test(this.user.email) &&
        this.regxIP.test(this.user.ip_address) &&
        !!this.user.first_name &&
        !!this.user.last_name &&
        !!this.user.gender
      )
        return true;
      else return false;
    },
  },
  mounted: function () {
    if (this.$route.name === "edit-user" && !!this.$route.params.id)
      this.getUser(this.$route.params.id);
    else {
      this.user = {
        email: "newostar1996@mail.ru",
        first_name: "EGOR",
        last_name: "VASILEV",
        gender: "Male",
        ip_address: "192.168.0.1",
      };
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions(["changeUser", "addNewUser"]),
    submit: function (e) {
      e.preventDefault();
      if (!this.user.id) this.addNew(this.user);
      else this.changeU(this.user);
    },
    addNew: function (user) {
      this.$toast.warning("Please continue a little!", {
        timeout: 2000,
      });
      this.addNewUser(user).then((error) => {
        if (error) {
          this.$toast.error("An error has occurred", {
            timeout: 2000,
          });
        } else {
          this.$router.push("/users");
          this.$toast.success("Successful addition", {
            timeout: 2000,
          });
        }
      });
    },
    changeU: function (user) {
      this.$toast.warning("Please continue a little!", {
        timeout: 2000,
      });
      this.changeUser(user).then((error) => {
        if (error) {
          this.$toast.error("An error has occurred", {
            timeout: 2000,
          });
        } else {
          this.$router.push("/users");
          this.$toast.success("Successful change", {
            timeout: 2000,
          });
        }
      });
    },
    getUser: async function (id) {
      await axios
        .post(config.apiUrl + "/api/user/get", {
          userId: id,
        })
        .then(({ data }) => data)
        .then((response) => {
          this.user = response.user;
          this.isLoading = false;
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
.content {
  background-color: rgba(255, 255, 255, 0.9);
  min-height: 350px;
  padding: 10px 15px;
  width: 450px;
  border-radius: 10px;
  max-width: 100%;
}
.loading {
  text-align: center;
}
.loading img {
  width: 60px;
}
</style>