<template lang="html">
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease " v-show="food.count > 0" @click="decreaseCount">
        <transition name="inner">
          <span class="inner icon-remove_circle_outline"></span>
        </transition>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>

    <div class="cart-add icon-add_circle" @click.stop.prevent="addCount"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: ['food'],
    methods: {
      addCount(event) {
        if (!this.food.count) {  // 判断count是否存在
          Vue.set(this.food, 'count', 1); // 不存在就给该数据添加一个count，并设置为1
        } else {
          this.food.count++;
        }
        this.$emit('add-count', event.target);  // 传递给父组件goods的事件
      },
      decreaseCount() {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style type="text/less" lang="less">
  .cartcontrol {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      /*执行过渡时候的状态*/
      &.move-enter-active, &.move-leave-active {
        transition: all .2s;
        transform: translate3d(0, 0, 0) rotateZ(0);
      }
      /*enter 进入前的状态，leave-to 离开后的状态*/
      &.move-enter, &.move-leave-to {
        opacity: 0;
        transform: translate3d(24px, 0, 0)  rotateZ(180deg);

      }
      .inner {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
        padding:0 6px;
      }

    }
    .cart-count {
      display: inline-block;
      width: 12px;
      height: 12px;
      vertical-align: top;
      /*padding-top: 6px;*/
      font-size: 10px;
      line-height: 24px;
      text-align: center;
      color: rgb(147, 153, 159);
    }
    .cart-add {
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
      padding: 0 6px;
    }
  }
</style>
