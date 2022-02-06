/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the navbar
*/

<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <section class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <button
        class="navbar-toggler cust-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon cust-toggler"></span>
      </button>
      <section
        class="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav">
          <li class="nav-item" v-if="isAuthenticated && level == 'student'">
            <router-link to="/" class="nb">VER CONTA</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link to="/Enrollment" class="nb">INSCRIÇÕES</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link to="/News" class="nb">NOTÍCIAS</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link to="/" class="nb">SOBRE O CLUBE</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link to="/" class="nb">PROJETOS</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link to="/" class="nb">CONTACTOS</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated && level == 'admin'">
            <router-link to="notif" class="nb">CRIAR NOTIFICAÇÃO</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated && level == 'admin'">
            <router-link to="/Admin" class="nb">GESTÃO DE ALUNOS</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link to="/Login" class="nb">LOGIN</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <a href="#" class="nb" @click.prevent="logout()">LOGOUT</a>
          </li>
        </ul>
      </section>
    </section>
  </nav>
</template>

<style scoped>
.cust-toggler {
  border-color: white;
}
.cust-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}
.navbar {
  position: relative;
  height: auto;
  background-color: #2b589f !important;
}
.nav {
  border-color: #2b589f !important;
  border-width: 2px !important;
  text-decoration: none !important;
  padding: 10px;
}
.nav-item {
  text-decoration: none !important;
  padding-top: 20px;
  padding-bottom: 20px;
}
.nb {
  color: white !important;
  font-weight: bold;
  text-decoration: none !important;
  border-right: #2b589f;
  border-right-style: solid;
  border-right-width: 3px;
  padding-left: 20px;
  padding-right: 20px;
}
.nb:hover {
  color: #6a8ec8 !important;
}
</style>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  IS_USER_AUTHENTICATED_GETTER,
  LOGOUT_ACTION,
  GET_USER_LEVEL_GETTER,
} from "../store/storeconstants";
export default {
  computed: {
    ...mapGetters("auth", {
      isAuthenticated: IS_USER_AUTHENTICATED_GETTER,
      level: GET_USER_LEVEL_GETTER,
    }),
  },
  methods: {
    ...mapActions("auth", {
      _logout: LOGOUT_ACTION,
    }),
    logout() {
      this._logout();
      this.$router.replace("/");
    },
  },
};
</script>


