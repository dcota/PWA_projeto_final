/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Gestão de Alunos (Admin)
*/

<template>
  <section class="container">
    <section class="row mt-3 text-center">
      <h1 class="text-center">GESTÃO DE ALUNOS</h1>
    </section>
    <section id="box"></section>
    <section class="row mt-3">
      <h4>Alunos inscritos:</h4>
    </section>
    <section class="card mt-2">
      <section class="card-body">
        <table class="table mt-2">
          <tbody>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Curso</th>
              <th class="text-center">Ações</th>
            </tr>
            <tr v-for="user of this.usersAccepted" :key="user._id">
              <td>{{ user.firstname + " " + user.lastname }}</td>
              <td>{{ user.course }}</td>
              <td>{{ user.class }}</td>
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-warning btn-sm me-2 ac-btn"
                >
                  <i class="fas fa-edit me-1 act-btn" aria-hidden="true"></i
                  >Editar
                </button>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#ver"
                  class="btn btn-success btn-sm me-2 ac-btn"
                >
                  <i class="fas fa-search me-1" aria-hidden="true"></i>Detalhes
                </button>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#remover"
                  class="btn btn-danger btn-sm me-2 ac-btn"
                >
                  <i class="far fa-trash-alt me-1" aria-hidden="true"></i
                  >Remover
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
    <section class="row mt-3">
      <h4>Pedidos pendentes:</h4>
    </section>
    <section class="card mt-2">
      <section class="card-body">
        <table class="table mt-2">
          <tbody>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Curso</th>
              <th class="text-center">Ações</th>
            </tr>
            <tr v-for="user of this.usersToAccept" :key="user._id">
              <td>{{ user.firstname + " " + user.lastname }}</td>
              <td>{{ user.course }}</td>
              <td>{{ user.class }}</td>
              <td>
                <button
                  @click="acceptStd(user._id)"
                  type="button"
                  class="btn btn-success btn-sm me-2 ac-btn"
                >
                  <i class="fas fa-check me-1 act-btn" aria-hidden="true"></i
                  >Aceitar
                </button>
                <button
                  @click="deleteStd(user._id)"
                  type="button"
                  class="btn btn-danger btn-sm me-2 ac-btn"
                >
                  <i class="far fa-trash-alt me-1" aria-hidden="true"></i
                  >Rejeitar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  </section>
  <section class="spacer"></section>
</template>

<style scoped>
.ac-btn {
  width: 120px;
  color: white;
  font-weight: bold;
}

.spacer {
  height: 200px;
}
</style>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import {
  LOADING_SPINNER_SHOW_MUTATION,
  GET_USER_TOKEN_GETTER,
  GET_USER_LEVEL_GETTER,
} from "../store/storeconstants";
export default {
  data() {
    return {
      data: localStorage.token,
      usersAccepted: [],
      usersToAccept: [],
    };
  },
  computed: {
    ...mapGetters("auth", {
      token: GET_USER_TOKEN_GETTER,
      level: GET_USER_LEVEL_GETTER,
    }),
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    ...mapMutations({
      showLoader: LOADING_SPINNER_SHOW_MUTATION,
    }),

    async getUsers() {
      this.usersAccepted = [];
      this.usersToAccept = [];
      this.showLoader(true);
      await axios
        .get("http://localhost:3000/user", {
          headers: {
            Authorization: this.token,
          },
        })
        .then((response) => {
          this.showLoader(false);
          let users = response.data.body;
          for (let i = 0; i < users.length; i++) {
            if (users[i].accepted == true && users[i].level == "student") {
              this.usersAccepted.push({
                _id: users[i]._id,
                firstname: users[i].firstname,
                lastname: users[i].lastname,
                course: users[i].course,
                class: users[i].class,
              });
            } else if (
              users[i].accepted == false &&
              users[i].level == "student"
            ) {
              this.usersToAccept.push({
                _id: users[i]._id,
                firstname: users[i].firstname,
                lastname: users[i].lastname,
                course: users[i].course,
                class: users[i].class,
              });
            }
          }
        })
        .catch((error) => {
          this.showLoader(false);
          alert(error);
        });
    },
    acceptStd(_id) {
      axios
        .put("http://localhost:3000/user/" + _id)
        .then(() => {
          this.getUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteStd(_id) {
      axios
        .delete("http://localhost:3000/user/" + _id)
        .then(() => {
          this.getUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>