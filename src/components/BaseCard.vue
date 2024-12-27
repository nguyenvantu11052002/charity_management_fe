<template>
  <div
    class="flex border shadow-lg hover:shadow-2xl flex-col rounded-md bg-white gap-2 cursor-pointer"
  >
    <!-- CardImage -->

    <slot name="card-image"></slot>
    <!-- <div class="h-72 w-full bg-pink-500 rounded-t-md"></div> -->
    <!-- CardTitle -->
    <slot name="card-title"></slot>

    <!-- CardContent -->
    <div class="card-content flex flex-col mx-4 py-4 gap-4">
      <slot name="card-content"></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
