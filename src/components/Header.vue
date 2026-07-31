<script setup>
import { ref } from "vue";
import MyButton from "./button/MyButton.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth/useAuthStore.js";

const router = useRouter();
const authStore = useAuthStore();

const redirectMain = () => {
  router.push("/");
};

const redirectLogin = () => {
  router.push("/login");
};

const redirectRegistration = () => {
  router.push("/registration");
};

const logout = async () => {
  await authStore.logout();
  router.replace("/");
};
</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title" @click="redirectMain()">Meerkatgram</h1>
    </div>

    <div class="btn-box">
      <MyButton
        @click="redirectLogin()"
        v-if="!authStore.isLoggedIn"
        :btnContent="'Log In'"
        :btnStyle="'pink'"
        :btnSize="'small'"
      />
      <MyButton
        v-if="!authStore.isLoggedIn"
        :btnContent="'Sign Up'"
        :btnStyle="'lavender'"
        :btnSize="'small'"
        @click="redirectRegistration"
      />

      <MyButton
        v-if="authStore.isLoggedIn"
        :btnContent="'Logout'"
        :btnStyle="'pink'"
        :btnSize="'small'"
        @click="logout"
      />
    </div>
  </div>
  <hr />
</template>

<style scoped>
.header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.title-box {
  display: flex;
  align-items: center;
}

.title {
  font-size: 20px;
  cursor: pointer;
}

.btn-box {
  display: flex;
  gap: 10px;
}
</style>
