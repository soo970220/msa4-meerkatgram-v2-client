<script setup>
const props = defineProps({
  btnType: {
    type: String,
    default: "button",
  }, // 'button', 'submit', reset
  btnSize: {
    type: String,
    default: "big", // 'big', 'middle', 'small'
  },
  btnStyle: {
    type: String,
    default: "", // 'black', 'white', 'gray'
  },
  btnContent: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <button :type="props.btnType" :class="[props.btnStyle, props.btnSize]">
    {{ props.btnContent }}
  </button>
</template>

<style scoped>
button {
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.big {
  width: 350px;
  height: 45px;
  font-size: 20px;
}
.middle {
  width: 300px;
  height: 70px;
  font-size: 40px;
}

.small {
  width: 90px;
  height: 45px;
  font-size: 20px;
}

.black {
  background-color: var(--personal-color-black);
  color: var(--personal-color-white);
}
.gray {
  background-color: var(--personal-color-gray);
  color: var(--personal-color-white);
}
.white {
  background-color: var(--personal-color-white);
  color: var(--personal-color-black);
}
.pink {
  background-color: #f8b9de;
  color: #fcf7f9;
  border: 2px solid #daced3;
}

.lavender {
  background-color: #eeb7ce;
  border: 2px solid #daced3;
  color: #fcf7f9;
}

.kakao {
  background-image: url("/icons/kakao_login_large_narrow.png");
}
</style>
