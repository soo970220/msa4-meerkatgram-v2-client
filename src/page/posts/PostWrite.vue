<script setup>
import { reactive, ref, watch } from "vue";
import MyButton from "../../components/button/MyButton.vue";
import MyInput from "../../components/input/MyInput.vue";
import { useFileStore } from "../../store/file/useFileStore.js";
import { useRouter } from "vue-router";
import { usePostWriteStore } from "../../store/post/usePostWriteStore.js";
import { usePostStatisticsStore } from "../../store/post/usePostStatisticsStore.js";

const router = useRouter();
const fileStore = useFileStore();
const postWriteStore = usePostWriteStore();
const postStatisticsStore = usePostStatisticsStore();

const preview = ref(null);
const selectedFile = ref(null);

const postData = reactive({
  content: "",
  image: "",
});

const handleSubmit = async () => {
  try {
    // 제출 시점에 파일 업로드 실행
    postData.image = await fileStore.uploadPost(selectedFile.value);
    if (!postData.image) {
      alert("파일 업로드 실패");
      return;
    }

    const result = await postWriteStore.writePost(postData);
    postStatisticsStore.increasePostCount();
    router.replace(`/posts/${result.id}`);
  } catch (error) {
    alert("게시글 생성 실패");
  }
};
// 파일 변경 감시자 (미리보기 및 선행 업로드 처리)
watch(selectedFile, async () => {
  if (selectedFile.value) {
    if (preview.value) {
      URL.revokeObjectURL(preview.value);
    }

    // 파일 객체를 브라우저에서 접근 가능한 임시 URL로 변환
    preview.value = URL.createObjectURL(selectedFile.value);
  }
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <MyInput
      mode="textarea"
      :placeholder="'내용을 입력하세요'"
      :readonly="false"
      :required="true"
      v-model="postData.content"
    />

    <MyInput
      mode="file"
      accept="image/*"
      :required="true"
      v-model="selectedFile"
    />
    <div
      class="preview"
      v-if="preview"
      :style="{ backgroundImage: `url(${preview})` }"
    ></div>

    <MyButton
      :btn-type="'submit'"
      :btnContent="'저장'"
      :btnStyle="'gray'"
      :btnSize="'middle'"
    ></MyButton>
  </form>
</template>

<style scoped>
form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.preview {
  width: 100%;
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
</style>
