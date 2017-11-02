<template lang="html">
  <div>
    <div class="shopcart">
      <div class="content" @click="showCart">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount > 0}">
              <span class="icon-shopping_cart"></span>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <!--结算-->
        <div class="content-right" @click.stop.prevent="pay"> <!--事件修饰符，阻止事件冒泡-->
          <div class="send" :class="{'highlight': totalPrice >= minPrice}">{{payDesc}}</div>
        </div>
      </div>
      <!--动画小球的实现(！未实现)-->
      <div class="ballcontainer">
        <!--<transition name="drop" tag="div">-->
        <div v-for="item in balls" v-show="item.show">
        </div>
        <!--</transition>-->
      </div>
      <!--购物车列表-->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food"></Cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>

    </div>
    <!--购物车背景-->
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Cartcontrol from '@/components/cartcontrol/cartcontrol';

  export default {
    data() {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        fold: true
      };
    },
    components: {Cartcontrol},
//    props: ['deliveryPrice', 'minPrice'],
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      }, // 总价状态
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      }, // 总数量状态
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}元起送`;
        } else {
          return '去结算';
        }
      },  // 结算按钮的状态
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return;
        }
        this.$nextTick(() => { // 为了解决在显示购物列表的情况下，better-scroll 没反应
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
        let show = !this.fold;
        return show;
      }  // 购物车显示隐藏状态
//      listShow() {
//        if (!this.totalCount) {
//          return this.fold;
//        }
//        ;
//        return !this.fold;
//      }
    },
    methods: {
//      被父组件调用的方法
      drop(el) {
//        console.log(el);
      },
      showCart() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
//      清空购物车
      empty() {
//        遍历selectFoods(选择的商品) 让选择的商品数量都为0
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
//      点击背景隐藏购物车列表，
      hideList() {
        this.fold = true;
//        通过前面的逻辑，fold为true时，购物车列表是隐藏的
      },
//      结算
      pay() {
        alert(`需要支付${this.totalPrice}元`);
      }
    }
//    transitions: {
//      drop: {
//        beforeEnter(el) {
//          let count = this.balls.length;
//          while (count--) {
//            let ball = this.balls[count];
//            if (ball.show) {  // 如果show为true
//              let rect = ball.el.getBoundingClientRect();
//              let x = rect.left - 32;
//              /* eslint-disable no-undef */
//              let client = widow.innerHeight;
//              let y = -(client - rect.top - 22);
//              el.style.display = '';
//              el.style.webkitTransfrom = `translate3d(0, ${y}px, 0)`;
//              el.style.transfrom = `translate3d(0, ${y}px, 0)`;
//              let inner = el.getElementsByClassName('inner-hook')[0];
//              inner.style.webkitTransfrom = `translate3d(${y}px,0, 0)`;
//              inner.style.transfrom = `translate3d(${y}px,0, 0)`;
//            }
//          }
//        },
//        enter(el) {
//          /* eslint-disable no-unused-vars */
//          let rf = el.offsetHeight;
//          this.$nextTick(() => {
//            el.style.webkitTransfrom = 'translate3d(0, 0, 0)';
//            el.style.transfrom = `translate3d(0, 0, 0)`;
//            let inner = el.getElementsByClassName('inner-hook')[0];
//            inner.style.webkitTransfrom = `translate3d(0,0, 0)`;
//            inner.style.transfrom = `translate3d(0,0, 0)`;
//          });
//        },
//        afterEnter(el) {
//          let ball = this.dropBalls.shift();
//          if (ball) {
//            ball.show = false;
//            el.style.display = 'none';
//          }
//        }
//      }
//    }
  };
</script>

<style type="text/less" lang="less">
  @import "../../common/less/mixin";

  .shopcart {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content {
      display: flex;
      height: 48px;
      background: #141d27;
      color: rgba(255, 255, 255, .4);
      .content-left {
        flex: 1;
        font-size: 0;
        .logo-wrapper {
          position: relative;
          left: 18px;
          bottom: 8px;
          display: inline-block;
          margin-right: 18px;
          width: 44px;
          height: 44px;
          padding: 6px;
          background: #141d27;
          text-align: center;
          vertical-align: top;
          border-radius: 50%;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(255, 255, 255, .2);
            &.highlight {
              background: rgb(0, 160, 220);
              color: #fff;
            }
            .icon-shopping_cart {
              font-size: 24px;
              line-height: 24px;
              text-align: center;
              line-height: 42px;

            }
          }
          .num {
            position: absolute;
            right: 0;
            top: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);

          }
        }
        .price {
          display: inline-block;
          box-sizing: border-box;
          margin-top: 12px;
          padding-right: 12px;
          border-right: 1px solid rgba(255, 255, 255, .1);
          font-size: 16px;
          color: rgba(255, 255, 255, .4);
          font-weight: 700;
          line-height: 24px;
          &.highlight {
            color: #fff;
          }
        }
        .desc {
          display: inline-block;
          font-size: 10px;
          vertical-align: top;
          margin: 12px 12px;
          /*font-weight: 700;*/
          line-height: 24px;
          /*padding-left: 12px;*/
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        background: rgba(255, 255, 255, .2);
        .send {
          font-size: 12px;
          height: 48px;
          line-height: 48px;
          font-weight: 700;
          text-align: center;
          &.highlight {
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    /*.ball-container {*/
    /*.ball {*/
    /*position: fixed;*/
    /*left: 32px;*/
    /*bottom: 22px;*/
    /*z-index: 200;*/
    /*&.drop-transition {*/
    /*transition: all .4s;*/
    /*}*/
    /*.inner {*/
    /*width: 16px;*/
    /*height: 16px;*/
    /*border-radius: 50%;*/
    /*background-color: rgb(0, 160, 220);*/
    /*&.drop-transition {*/
    /*transition: all .4s;*/
    /*}*/
    /*}*/
    /*}*/
    /*}*/

    .shopcart-list {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transform: translateY(-100%);
      &.fold-enter-active, &.fold-leave-active {
        transition: all .2s;
        transform: translate3d(0, -100%, 0);
      }
      /*enter 进入前的状态，leave-to 离开后的状态*/
      &.fold-enter, &.fold-leave-to {
        transform: translate3d(0, 0, 0);
      }
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
        .food {
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          .border-1px(rgba(7, 17, 27, .1));
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-weight: 700;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }

  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*z-index: 10;*/
    background: rgba(7, 17, 27, .6);
    -webkit-backdrop-filter: blur(10px);
    &.fade-enter-active, &.fade-leave-active {
      transition: all .5s;
      opacity: 1;
      background: rgba(7, 17, 27, .6);
    }
    &.fade-enter, &fade-leave-to {
      opacity: 0;
      background: rgba(7, 17, 27, 0);

    }
  }

</style>
