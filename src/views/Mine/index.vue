<template>
  <div id="main">
    <Header title="我的电影" />
    Mine
    <TabBar />
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
export default {
  name: "Mine",
  components: {
    Header,
    TabBar,
  },
};
</script>

<style lang="sass" scoped>

</style>