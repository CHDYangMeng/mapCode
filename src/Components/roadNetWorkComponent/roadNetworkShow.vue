<template>
  <div>
    <iframe class="bm-view" :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'src/Components/htmlComponent/NetWork.html',
    }
  },

}
</script>

<style lang="scss" scoped>
.bm-view {
  height: 650px;
  width: 2023px;
}
</style>