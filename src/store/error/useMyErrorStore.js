import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyErrorStore = defineStore("myErrorStore", () => {
  //1. State(ref)
  const isError = ref(false);
  const errorCode = ref("");
  const errorMsg = ref("");

  // 2. Getters (computed)

  // 3. Actions (function)
  const setErrorInfo = (error) => {
    // ?.의 의미 : 옵셔널체이닝 = “앞에 값이 있으면 진행, 없으면 멈추고 undefined 반환”
    const errorData = error.response?.data || {
      code: "UNKNOWN_ERROR",
      message: "예기치 못한 에러가 발생했습니다",
    };
    errorCode.value = errorData.code;
    errorMsg.value = errorData.message;
    isError.value = true;
  };

  const clearErrorInfo = () => {
    errorCode.value = "";
    errorMsg.value = "";
    isError.value = false;
  };

  /**
   * 리다이렉트 처리에서 에러 발생시, 코드와 메세지로 커스텀 에러 객체 생성
   * @param {String} code
   * @param {String} messge
   * @returns Error error
   */
  const createErrorRedirection = (code, messge) => {
    const error = new Error();
    const response = {
      data: {
        code,
        messge,
      },
    };
    error.response = response;
    return error;
  };

  return {
    isError,
    errorCode,
    errorMsg,
    setErrorInfo,
    clearErrorInfo,
    createErrorRedirection,
  };
});
