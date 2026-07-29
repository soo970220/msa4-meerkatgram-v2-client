import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";

export const usePostWriteStore = defineStore("PostWriteStore", () => {
  // 1. State

  // 2. Getters

  // 3. Actions
  const writePost = async (formData) => {
    try {
      const url = "/api/posts";

      const result = await myAxios.post(url, formData);

      return result.data.data;
    } catch (error) {
      return null;
    }
  };

  return {
    writePost,
  };
});
