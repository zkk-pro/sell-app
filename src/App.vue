<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller"/>
    </div>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <!-- 当点击路由的时候，需要刷新的地方 -->
    <div class="">
      <router-view :seller="seller"/>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/header/header';
  import Axios from 'axios';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {}
      };
    },
    components: {'v-header': Header},
    created() {
      Axios.get('/api/sellers').then((response) => {
        // console.log(response);
        if (response.data.errno === ERR_OK) {
          this.seller = response.data.data;
          // console.log(this.seller);
        }
      });
    }
  };
</script>

<style type="text/less" lang="less">
  @import "./common/less/mixin.less";

  #app {
    .tab {
      display: flex;
      width: 100%;
      height: 100%;
      line-height: 40px;
      // border-bottom: 1px solid #ccc;
      .border-1px(rgba(7, 17, 27, .1)); //1像素兼容
      .tab-item {
        flex: 1;
        text-align: center;
        a {
          // 为了点击旁边的空白也有效果
          display: block;
          font-size: 14px;
          color: rgb(77, 85, 93);
          // &代表父元素，.active是linkActiveClass，在路由；配置中设置的别名
          &.active {
            color: rgb(240, 20, 20);
          }
        }
      }
    }
  }

</style>
