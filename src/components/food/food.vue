<template lang="html">
  <transition name="move">
    <div class="food" v-show="showFlog">
      <div class="food-content">
        <!--头部图片-->
        <div class="img-header">
          <img :src="food.image">
          <div class="back" @click="_back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <!--中间内容区-->
        <div class="content">
          <h1 class="title">{{ food.name }}123</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  export default {
    props: ['food'],
    data() {
      return {
        showFlog: false
      };
    },
    methods: {
      show() {
        this.showFlog = true;
      },
      _back() {
        this.showFlog = false;
      }
    }
  };
</script>

<style type="text/less" lang="less">
  @import "../../common/less/mixin.less";

  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    height: 100%;
    background: #fff;
    &.move-enter-active, &.move-leave-active {
      transition: all .2s;
      transform: translate3d(0, 0, 0);
    }
    &.move-enter, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    /*头部图片*/
    .food-content {
      .img-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%; // 小技巧，这样设置，就是该容器的宽高相等了，设置padding为100%的时候，该容器的高度 == 该容器的宽度
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .back {
          position: absolute;
          left: 10px;
          top: 10px;
          background-color: rgba(255, 255, 255, .5);
          width: 36px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          border-radius: 50%;
        }
      }
    }
    /*中间内容*/
    .content {
      margin-left: 18px;
      .title {
        margin: 18px 0 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }
      .detail {
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 10px;
        margin-bottom: 18px;
        &.span:first-child {
          margin-right: 12px;
        }
      }
      .price {
        padding: 0 0 18px 18px;
        margin-left: -18px;
        .border-1px(rgba(7, 17, 27, .1));
        .now{
          font-size: 14px;
          font-weight: 700;
          color: rgb(240,20,20);
          line-height:24px;
        }
        .old{
          font-size: 10px;
          font-weight:700;
          color:rgb(147,153,159);
          line-height:24px;
          text-decoration: line-through;
        }
      }
    }
  }
</style>
