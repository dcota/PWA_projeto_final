/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Login
*/

<template>
  <section class="container">
    <section class="wrapper">
      <form class="form-signin" v-on:submit.prevent="login">
        <section class="alert alert-danger" v-if="error">{{ error }}</section>
        <h2 class="form-signin-heading">Login</h2>
        <input
          type="text"
          v-model="form.username"
          class="form-control mt-4"
          id="username"
          placeholder="username"
          required=""
          autofocus=""
        />
        <input
          type="password"
          v-model="form.password"
          class="form-control mt-4"
          id="password"
          placeholder="password"
          required=""
        />
        <button class="btn btn-lg btn-primary btn-block mt-4" type="submit">
          Submeter
        </button>
      </form>
    </section>
  </section>
</template>

<style scoped>
.wrapper {
  margin-top: 80px;
  margin-bottom: 80px;
}

.form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import {
  LOADING_SPINNER_SHOW_MUTATION,
  LOGIN_ACTION,
  GET_USER_LEVEL_GETTER,
} from "../store/storeconstants";
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      error: "",
    };
  },
  computed: {
    ...mapGetters("auth", {
      level: GET_USER_LEVEL_GETTER,
    }),
  },
  methods: {
    ...mapActions("auth", {
      _login: LOGIN_ACTION,
    }),
    ...mapMutations({
      showLoader: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async login() {
      this.error = "";
      this.showLoader(true);
      let response = await this._login({
        username: this.form.username,
        password: this.form.password,
      }).catch(() => {
        this.error = "Username ou password incorreta!";
        this.showLoader(false);
      });
      if (response) {
        this.showLoader(false);
        if (this.level == "admin") this.$router.replace("/Admin");
        else if (this.level == "student") this.$router.replace("/");
      } else {
        this.error = "Username ou password incorreta!";
        this.showLoader(false);
      }
    },
  },
};
</script>