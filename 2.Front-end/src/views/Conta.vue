/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Alterar Conta
*/

<template>
  <section class="scrolling-component" ref="scrollcomponent">
    <section class="container my-body">
      <h1 class="text-center mt-5">DETALHES DA CONTA</h1>
      <section v-if=isShow
        class="alert mt-3"
        role="alert"
        v-bind:class="'alert-' + message.type + ' alert-dismissible fade show'"
      >
        {{ message.msg }}
      </section>
      <form class="form-signin" v-on:submit.prevent="update">
        <section class="row mt-5">
          <section class="col-md-2">
            <input
              type="text"
              v-model="form.firstname"
              class="form-control"
              id="firstname"
              placeholder="primeiro nome..."
            />
          </section>
          <section class="col-md-2">
            <input
              type="text"
              v-model="form.lastname"
              class="form-control"
              id="lastname"
              placeholder="último nome..."
            />
          </section>
          <section class="col-md-8">
            <input
              type="text"
              v-model="form.name"
              class="form-control"
              id="name"
              placeholder="nome completo..."
            />
          </section>
        </section>
        <section class="row mt-4">
          <section class="col-md-8">
            <input
              type="text"
              v-model="form.course"
              class="form-control"
              id="course"
              placeholder="curso..."
            />
          </section>
          <section class="col-md-4">
            <input
              type="text"
              v-model="form.class"
              class="form-control"
              id="class"
              placeholder="turma..."
            />
          </section>
        </section>
        <section class="row mt-4">
          <section class="col-md-4">
            <input
              type="text"
              v-model="form.email"
              class="form-control"
              id="email"
              placeholder="email..."
            />
          </section>
          <section class="col-md-4">
            <input
              type="text"
              v-model="form.mobile"
              class="form-control"
              id="mobile"
              placeholder="telemóvel..."
            />
          </section>
          <section class="col-md-4">
            <input
              placeholder="Data de nascimento"
              class="form-control textbox-n"
              type="date"
              v-model="form.bdate"
              id="bdate"
            />
          </section>
        </section>
        <section class="row mt-4">
          <section>
            <section class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="form.notifications"
                value=""
                id="subscribenews"
                checked
              />
              <label class="form-check-label" for="subscribenews">
                Subscrever notificações?</label
              >
            </section>
          </section>
        </section>
        <section class="text-center">
          <button
            type="submit"
            class="btn btn-outline-primary mt-4 me-4 my-button"
          >
            ALTERAR
          </button>
          <button
            @click="leave()"
            type="button"
            class="btn btn-outline-primary mt-4 my-button"
          >
            SAIR
          </button>
        </section>
      </form>
      <section class="spacer"></section>
    </section>
  </section>
</template>

<style scoped>
.my-button {
  width: 120px;
}
select option[disabled]:first-child {
  display: none;
}
.my-body {
  margin-top: 0px;
}
.spacer {
  height: 200px;
}
.top-btn {
  font-weight: bold;
  width: 100px;
}
</style>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import {
  LOADING_SPINNER_SHOW_MUTATION,
  GET_USER_TOKEN_GETTER,
  GET_USER_LEVEL_GETTER,
  GET_USER_ID_GETTER,
} from "../store/storeconstants";
export default {
  name: "submit",
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        name: "",
        course: "",
        class: "",
        email: "",
        mobile: "",
        bdate: "",
        notifications: false,
      },
      message: {
        type: "",
        msg: "",
      },
      isShow: false
    };
  },
  computed: {
    ...mapGetters("auth", {
      token: GET_USER_TOKEN_GETTER,
      level: GET_USER_LEVEL_GETTER,
      _id: GET_USER_ID_GETTER,
    }),
  },
  mounted() {
    this.getStudentInfo();
  },
  methods: {
    ...mapMutations({
      showLoader: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async getStudentInfo() {
      (this.message.type = ""), (this.message.msg = ""), this.showLoader(true);
      await axios
        .get("https://cprob-api.herokuapp.com/user/" + this._id, {
        //.get("http://localhost:3000/user/" + this._id, {
          headers: {
            Authorization: this.token,
          },
        })
        .then((response) => {
          (this.form.firstname = response.data.body.firstname),
            (this.form.lastname = response.data.body.lastname),
            (this.form.name = response.data.body.name),
            (this.form.course = response.data.body.course),
            (this.form.class = response.data.body.class),
            (this.form.bdate = response.data.body.bdate),
            (this.form.email = response.data.body.email),
            (this.form.mobile = response.data.body.mobile),
            (this.form.notifications = response.data.body.notifications);
          this.showLoader(false);
        })
        .catch(() => {
          this.message.msg = "Ocorreu um problema";
          this.message.type = "warning";
          this.isShow=true
          this.showLoader(false);
        });
    },
    async update() {
      (this.message.type = ""), (this.message.msg = ""), this.showLoader(true);
      let postData = {
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        name: this.form.name,
        course: this.form.course,
        class: this.form.class,
        email: this.form.email,
        mobile: parseInt(this.form.mobile),
        bdate: this.form.bdate,
        notifications: this.form.notifications,
      };
      await axios
        .patch("https://cprob-api.herokuapp.com/user/" + this._id, postData, {
        //.patch("http://localhost:3000/user/" + this._id, postData, {
          headers: {
            Authorization: this.token,
          },
        })
        .then((response) => {
          if (response.data.http == 200) {
            this.showLoader(false);
            this.message.type = "success";
            this.message.msg = "Alterações registadas com sucesso."
            this.isShow = true
          } else {
            this.showLoader(false);
            this.message.type = "danger";
            this.message.msg = "Ocorreu um problema, tente de novo...";
          }
        })
        .catch(() => {
          this.error = "Valores inválidos!";
          this.showLoader(false);
        });
    },
    leave() {
      this.$router.replace("/");
    },
  },
};
</script>