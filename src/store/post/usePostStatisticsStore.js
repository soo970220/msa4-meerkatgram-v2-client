import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";
import { ref } from "vue";

export const usePostStatisticsStore = defineStore("postStatisticsStore", () => {
  // 1. State
  const postCount = ref(0);

  // 2. Getter

  // 3. Actions
  const decrementPostCount = () => {
    postCount.value--;
  };

  const increasePostCount = () => {
    postCount.value++;
  };

  const getUserPostCount = async () => {
    try {
      const url = `/api/posts/statistics/user-post-count`;

      const response = await myAxios.get(url);

      postCount.value = response.data.data.postCount;
    } catch (error) {
      console.error(error);
      postCount.value = "-";
    }
  };
  return {
    postCount,
    decrementPostCount,
    getUserPostCount,
    increasePostCount,
  };
});
