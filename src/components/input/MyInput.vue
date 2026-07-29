<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: "input", // input, textarea, file
  },
  type: String,
  placeholder: String,
  readonly: Boolean,
  required: Boolean,
  accept: String,
});

const model = defineModel();

const handleFileChange = (event) => {
  model.value = event.target.files?.[0] || null;
};
</script>

<template>
  <input
    v-if="props.mode === 'input'"
    v-model="model"
    :type="props.type"
    :placeholder="props.placeholder"
    :readonly="props.readonly"
    :required="props.required"
  />

  <textarea
    v-else-if="props.mode === 'textarea'"
    v-model="model"
    :placeholder="props.placeholder"
    :readonly="props.readonly"
    :required="props.required"
  ></textarea>

  <input
    v-else-if="props.mode === 'file'"
    type="file"
    :accept="props.accept"
    :required="props.required"
    @change="handleFileChange"
  />
</template>

<style scoped>
input,
textarea {
  width: 300px;
  padding: 10px;
  font-size: 20px;
  border: 2px solid var(--personal-color-black);
  border-radius: 10px;
}

input {
  height: 85px;
}

textarea {
  height: 200px;
  resize: none;
}

input[type="file"] {
  height: auto;
}
</style>
