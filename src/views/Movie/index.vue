<template>
  <div id="main">
    <Header title="喵喵电影" />
    Movie
    <TabBar />
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
export default {
  name: "Movie",
  components: {
    Header,
    TabBar,
  },
};
</script>

<style scoped>
</style>