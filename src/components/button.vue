<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>


<template>
  <button class="btn">{{ name }}</button>
</template>

<style scoped>
.btn {
  height: 40px;
  border: 2px solid #303030;
  border-radius: 6px;
  padding: 3px 3px;
  
  background: transparent;
  font-family: "Lexend Deca",
    sans-serif;
  color: var(--color-text);
  width: 75px;
  transition: 0.2s;
}

.btn:hover {
  cursor: pointer;
  box-shadow: 0px 0px 12px rgb(0, 0, 0);
}

.btn:active {
  background: #2020206e;
  box-shadow: 0px 0px 6px rgb(12, 12, 12) inset;
  border: 2px solid #202020
}
</style>
