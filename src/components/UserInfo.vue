<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth/useAuthStore";
import { usePostStatisticsStore } from "../store/post/usePostStatisticsStore";
// import { onMounted } from "vue";

const authStore = useAuthStore();
const router = useRouter();
const postStatisticsStore = usePostStatisticsStore();

/** onMounted(async () => {
  if (!authStore.authInitialized) {
    try {
      await authStore.reissue();
    } catch (error) {
      return;
    }
  }
  // 로그인이 복구된 다음 게시글 개수 조회
  if (authStore.isLoggedIn) {
    await postStatisticsStore.getUserPostCount();
  }
});  */

const redirectWrite = () => {
  router.push("/posts/write");
};
</script>

<template>
  <div class="container" v-if="authStore.isLoggedIn && authStore.userInfo">
    <div class="profile-box">
      <div
        class="bg-image-circle profile"
        :style="{ backgroundImage: `url(${authStore.userInfo.profile})` }"
      ></div>
    </div>

    <div class="info-box">
      <div class="nick">{{ authStore.userInfo.nick }}</div>
      <div class="write-count">POST {{ postStatisticsStore.postCount }}</div>

      <div class="redirect-box">
        <div
          class="bg-image-square redirect-icon-posts-index"
          style="
            background-image: url(/public/icons/free-icon-gallery-833281.png);
          "
        ></div>

        <div
          class="bg-image-square redirect-icon-posts-create"
          style="
            background-image: url(/public/icons/plus-sign.png);
            cursor: pointer;
          "
          @click="redirectWrite"
        ></div>

        <div
          class="bg-image-square redirect-icon-users-info"
          style="
            background-image: url(/public/icons/free-icon-person-2815428tt.png);
          "
        ></div>
      </div>
    </div>
    <hr />
  </div>
</template>

<style scoped>
.container {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.redirect-box {
  padding-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
}

.nick {
  padding-left: 50px;
  font-size: 30px;
  font-weight: 900;
}

.write-count {
  padding-left: 50px;
  font-size: 30px;
}
</style>
