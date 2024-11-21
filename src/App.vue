<template>
  <component :is="layout"><router-view></router-view></component>
</template>

<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    const layout = computed(() => {
      return `${route.meta.layout}-layout`
    })

    return { router, route, layout }
  },
}
</script>

<style>
</style>
