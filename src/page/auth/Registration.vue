<script setup>
import { reactive, ref } from "vue";
import MyButton from "../../components/buttons/MyButton.vue";
import MyInput from "../../components/input/MyInput.vue";
import { useFileStore } from "../../store/file/useFileStore.js";
import { useAuthStore } from "../../store/auth/useAuthStore.js";
import { useRoute, useRouter } from "vue-router";
import registrationValidator from "../../api/util/validator/domain/auth/registrationValidator.js";
import { useMyErrorStore } from "../../store/error/useMyErrorStore.js";

const router = useRouter();
const fileStore = useFileStore();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();
const profileImage = ref(null);

const preview = ref(null);
const selectedFile = ref(null);
const registrationData = reactive({
  email: "",
  password: "",
  passwordChk: "",
  nick: "",
  profile: "",
});

const handleSubmit = async () => {
  const validationList = [
    registrationValidator.email(registrationData.email),
    registrationValidator.password(registrationData.password),
    registrationValidator.passwordChk(
      registrationData.password,
      registrationData.passwordChk,
    ),
    registrationValidator.nick(registrationData.nick),
    registrationValidator.profile(registrationData.profile),
  ];

  const errorList = validationList.filter((val) => val);
  if (errorList.length > 0) {
    alert(errorList.join("\n"));
    return;
  }

  try {
    await authStore.registration(registrationData);
    alert("회원가입에 성공했습니다.");
    router.replace("/login");
  } catch (error) {
    const data = error.response.data;
    if (data.code === "E11") {
      alert(data.data);
    } else if (data.code === "E21") {
      alert("잘못된양식입니다.");
    } else {
      myErrorStore.setErrorInfo(error);
      router.replace("/error");
    }
  }
};

const handleChangeProfile = async (e) => {
  // e.target은 input 태그를 가리키고 files는 input 태그에 선택한 파일들의 배열을 가리킴
  const file = e.target.files[0];
  if (file) {
    if (preview.value) {
      // 이전에 미리보기 URL을 만든적이 있다면 기존 URL을 브라우저 메모리에서 해제
      // if 안한다면 사용자가 파일을 계속 변경하면 기존 URL이 메모리에 남아 메모리 누수가 발생할 수 있음
      URL.revokeObjectURL(preview.value);
    } // API 서버에 파일 저장 요청

    const fileUri = await fileStore.uploadProfile(file); // 선택된 파일을 브라우저에서 임시로 접근할 수 있는 URL로 변환 -> 브라우저 메모리에 생성 -> preview에 저장
    if (fileUri) {
      registrationData.profile = fileUri;
      selectedFile.value = file;
      preview.value = URL.createObjectURL(file);
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <MyInput
      :type="'email'"
      :placeholder="'Email'"
      :readonly="false"
      :required="true"
      v-model="registrationData.email"
    ></MyInput>

    <MyInput
      :type="'password'"
      :placeholder="'Password'"
      :readonly="false"
      :required="true"
      v-model="registrationData.password"
    ></MyInput>
    <MyInput
      :type="'password'"
      :placeholder="'PasswordChk'"
      :readonly="false"
      :required="true"
      v-model="registrationData.passwordChk"
    ></MyInput>
    <MyInput
      :type="'text'"
      :placeholder="'Nick'"
      :readonly="false"
      :required="true"
      v-model="registrationData.nick"
    ></MyInput>
    <div
      class="preview"
      v-if="preview"
      :style="{ backgroundImage: `url(${preview})` }"
    ></div>
    <input type="file" accept="image/*" @change="handleChangeProfile" />

    <MyButton
      :btn-type="'submit'"
      :color="'pink'"
      :size="'middle'"
      :content="'Sign Up'"
    ></MyButton>
  </form>
</template>

<style scoped>
form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.preview {
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
</style>
