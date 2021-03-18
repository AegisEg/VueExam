<template>
  <div>
    <v-form ref="form" class="login-form" @submit="login">
      <h1>Login</h1>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-btn class="mr-4" type="submit" :disabled="!valid"> Next </v-btn>
    </v-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  computed: {
    valid: function () {
      return this.regxEmail.test(this.email);
    },
  },
  data() {
    return {
      email: "",
      regxEmail: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => this.regxEmail.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    ...mapActions(["log_in"]),
    login: function (e) {
      e.preventDefault();
      this.log_in(this.email).then((auth) => {
        if (!auth.error) {
          this.$cookies.set("apiToken", auth.token);
          this.$toast.success("Authentication success", {
            timeout: 2000,
          });
          this.$router.push("users");
        } else {
          this.$toast.error("Email not exists", {
            timeout: 2000,
          });
        }
      });
    },
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
}
.login-form {
  text-align: center;
  background-color: #fff;
  padding: 25px;
  border-radius: 10px;
  width: 350px;
  max-width: 100%;
}
</style>