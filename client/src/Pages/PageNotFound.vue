<template>
  <div>
    <img class="page404" :src="page404" alt="" />
  </div>
</template>
<script>
import page404 from "../images/404.png";
export default {
  data() {
    return {
      page404,
    };
  },
};
</script>
<style scoped>
.page404{
    width: 560px;
    max-width: 100%;
}
</style>
