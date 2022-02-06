/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the Criar Notificação
*/

<template>
  <section class="scrolling-component" ref="scrollcomponent">
    <section class="container my-body">
      <h1 class="text-center mt-5">CRIAR NOTIFICAÇÃO/AVISO</h1>
      <section class="alert mt-3" v-bind:class="'alert-' + message.type">
        {{ message.msg }}
      </section>
      <form class="form-signin" v-on:submit.prevent="createNotif">
        <section class="row mt-5">
          <section class="col-md-6">
            <label for="title" class="form-label">Título:</label>
            <input
              type="text"
              v-model="form.title"
              class="form-control"
              id="title"
              placeholder="título..."
            />
          </section>
        </section>
        <section class="row mt-4">
          <section class="col-md-12">
            <label for="title" class="form-label"
              >Resumo(100 caracteres):</label
            >
            <textarea
              v-model="form.summary"
              type="text"
              class="form-control"
              id="title"
              rows="5"
            ></textarea>
          </section>
        </section>
        <section class="row mt-4">
          <section class="col-md-12">
            <label for="text" class="form-label">Texto:</label>
            <textarea
              v-model="form.text"
              type="text"
              class="form-control"
              id="text"
              rows="5"
            ></textarea>
          </section>
        </section>
        <section class="row mt-4">
          <section>
            <section class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="form.notifEmail"
                value=""
                id="notifEmail"
                checked
              />
              <label class="form-check-label" for="subscribe_news">
                Enviar notificação por email</label
              >
            </section>
            <section class="form-check mt-2">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="form.notifPage"
                value=""
                id="notifPage"
              />
              <label class="form-check-label" for="subscribe_news">
                Publicar na página Avisos</label
              >
            </section>
          </section>
        </section>
      </form>
      <section class="text-center">
        <button
          type="submit"
          v-on:click="createNotif"
          class="btn btn-outline-primary mt-4 me-4 my-button"
        >
          CRIAR
        </button>
        <button
          v-on:click="cleanForm"
          type="button"
          class="btn btn-outline-primary mt-4 my-button"
        >
          LIMPAR
        </button>
      </section>
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
import { mapMutations } from "vuex";
import { LOADING_SPINNER_SHOW_MUTATION } from "../store/storeconstants";
export default {
  name: "submit",
  data() {
    return {
      form: {
        title: "",
        summary: "",
        text: "",
        notifEmail: true,
        notifPage: false,
      },
      message: {
        type: "",
        msg: "",
      },
    };
  },
  methods: {
    ...mapMutations({
      showLoader: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async createNotif() {
      console.log("chama");
      this.message.type = "";
      this.message.msg = "";
      this.showLoader(true);
      let postData = {
        title: this.form.title,
        summary: this.form.summary,
        text: this.form.text,
        notifEmail: this.form.notifEmail,
        notifPage: this.form.notifPage,
      };
      console.log(postData);
      await axios
        .post("http://localhost:3000/notification", postData)
        .then((response) => {
          console.log(response);
          if (response.data.http == 201) {
            this.showLoader(false);
            this.message.type = "success";
            this.message.msg = "Notificação criada com sucesso.";
            this.cleanForm();
          } else if (response.data.http == 200) {
            this.showLoader(false);
            this.message.type = "warning";
            this.message.msg = "Notificação existente.";
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
    cleanForm() {
      (this.form.title = ""),
        (this.form.summary = ""),
        (this.form.text = ""),
        (this.form.notifEmail = true),
        (this.form.notifPage = false);
    },
  },
};
</script>