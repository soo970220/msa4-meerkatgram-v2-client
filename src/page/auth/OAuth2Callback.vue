<script setup>
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { usePostStatisticsStore } from "../../store/post/usePostStatisticsStore";
import MyError from "../error/MyError.vue";

const authStore = useAuthStore();
const postStatisticsStore = usePostStatisticsStore();
const route = useRoute();
const router = useRouter();
const myErrorStore = useMyErrorStore();

onBeforeMount(async () => {
  try {
    const { code, message } = route.query;

    if (!code) {
      await authStore.reissue();
      postStatisticsStore.getUserPostCount();
      return router.replace("/");
    } else if (code === "E02") {
      alert("다른 방식으로 이미 가입된 회원입니다.");
      return router.replace("/login");
    } else {
      throw myErrorStore.createErrorRedirection(code, message);
    }
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    return router.replace("/error");
  }
});
</script>

<template></template>
