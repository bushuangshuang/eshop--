<template>
  <div class="input-box">
    <span class="icon"></span>
    <input type="text" class="search" placeholder="搜索你想要的内容">
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.input-box{
  position: relative;
  .icon{
    position: absolute;
    display: inline-block;
    .w(30);
    .h(30);
    top:55%;
    .mt(-18);
    .left(20);
    background-image: url("../assets/image/search-f.png");
    background-size: cover;
  }
  .search{
    .b-radius(50);
    .lh(65);
    width: 100%;
    outline: none;
    .pl(65);
    .pr(65);
    .fs(30);
    color: #000;
  }
}
</style>
