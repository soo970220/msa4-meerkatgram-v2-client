<script setup>
import { onBeforeMount, onBeforeUnmount } from "vue";
import { NavigationFailureType, useRoute, useRouter } from "vue-router";
import { usePostShowStore } from "../../store/post/usePostShowStore";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useMyErrorStore } from "../../store/error/useMyErrorStore";
import { usePostStatisticsStore } from "../../store/post/usePostStatisticsStore";

const route = useRoute();
const router = useRouter();
const postShowStore = usePostShowStore();
const postStatisticsStore = usePostStatisticsStore();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();

const handleDelete = async () => {
  try {
    await postShowStore.deletePost(route.params.id);
    postStatisticsStore.decrementPostCount();
    router.push("/");
  } catch (error) {
    alert("게시글 삭제 실패했습니다.");
  }
};
onBeforeMount(async () => {
  try {
    await postShowStore.getPost(route.params.id);
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace("/error");
  }
});

onBeforeUnmount(postShowStore.clearPostShow);
</script>

<template>
  <div class="container" v-if="postShowStore.post">
    <div
      class="image"
      :style="{ backgroundImage: `url(${postShowStore.post?.image})` }"
    ></div>
    <div class="option-box">
      <div
        class="delete-icon"
        v-if="
          authStore.userInfo?.id != null &&
          postShowStore.post?.userId != null &&
          String(postShowStore.post.userId) === String(authStore.userInfo.id)
        "
        @click="handleDelete"
      ></div>
      <div v-else></div>
      <!-- v-else로 자식을 만들어도되고  div로 delete-icon을 감싸줘도 된다  -->
      <div class="like-box">
        <span> 1004 </span>
        <div class="like-icon"></div>
      </div>
    </div>
    <p class="content">{{ postShowStore.post?.content }}</p>
  </div>
</template>

<style scoped>
.container {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.image {
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.option-box {
  display: flex;
  justify-content: space-between;
}

.like-box {
  display: flex;
  font-size: 20px;
  gap: 30px;
}

.delete-icon {
  width: 40px;
  height: 50px;
  background-image: url("/icons/trash-can.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
}

.like-icon {
  width: 55px;
  height: 50px;
  background-image: url("/icons/like_1 2.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.content {
  white-space: pre-wrap;
}
</style>
