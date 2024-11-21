<template>
  <!-- <div class="button"> -->
  <button :type="props.type ? props.type : 'submit'" :class="props.style">
    {{ props.content }}
  </button>
  <!-- </div> -->
</template>

<script setup>
const props = defineProps(['style', 'content', 'type'])
// export default {
//   props: {
//     content: {
//       type: String,
//       require: true,
//     },
//     onClick: {
//       type: Function,
//       // require: true,
//     },
//     style: {
//       type: String,
//     },
//   },
// }
</script>

<style scoped>
</style>
