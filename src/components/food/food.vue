<template lang="html">
  <transition name="move">
    <div class="food" ref="food" v-show="showFlog">
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
          <h1 class="title">{{ food.name }}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <!--加入购物车按钮-->
          <div class="add">
            <!--<transition name="fade" mode="out-in">-->
            <div class="add-cart" v-show="!food.count || food.count === 0" @click="showCart">加入购物车</div>
            <!--</transition>-->
            <div class="cartconctrol-wrapper" v-show="food.count">
              <Cartcontrol :food="food"></Cartcontrol>
            </div>
          </div>
        </div>
        <!--</div>-->
        <!--分隔组件-->
        <Split></Split>
        <!--商品介绍-->
        <div class="food-detail">
          <h1 class="title">商品介绍</h1>
          <p class="detail" v-if="food.info">{{food.info}}</p>
          <p class="detail" v-else="food.info">没有相关介绍</p>
        </div>
        <Split></Split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <Ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc"
                        :ratings="food.ratings" ref="ratingselect"></Ratingselect>
          <!--评论区-->
          <div class="ratings-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="ratingsList in food.ratings" class="ratings-list"
                  v-show="needShow(ratingsList.rateType, ratingsList.text)">
                  <div class="user">
                    <span class="time">{{ratingsList.rateTime | formatDate}}</span>
                    <span class="user-message"><span class="neme">{{ratingsList.username}}</span><img
                      :src="ratingsList.avatar"></span>
                  </div>
                  <div class="rating">
            <span class="icon"
                  :class="{'icon-thumb_up':ratingsList.rateType===0,'icon-thumb_down':ratingsList.rateType===1}"
            ></span>
                    <span class="text">{{ratingsList.text}}</span>
                  </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import Cartcontrol from '@/components/cartcontrol/cartcontrol';
  import Split from '@/components/split/split';
  import Ratingselect from '@/components/ratingselect/ratingselect';

  //  const POSTIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: ['food'],
    data() {
      return {
        showFlog: false,
        showCartOption: true,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          postive: '推荐',
          negative: '吐槽'
        }
      };
    },
    components: {Cartcontrol, Split, Ratingselect},
    filters: {
      formatDate(time) {
        return new Date(parseInt(time)).toLocaleDateString();
      }
    },
    methods: {
      show() {
        this.showFlog = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
          console.log(!!'' === true);
          console.log(this.onlyContent ? 1 : 2);
        });
      },
      _back() {
        this.showFlog = false;
      },
      showCart() {
        Vue.set(this.food, 'count', 1);
        return this.food.count;
      },
      needShow(type, text) {
//        如果选择只看有内容评价 并且 文本的内是不空
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
//      onSelectType() {
//        this.$refs.ratingselect.$on('select', type => {
//          this.selectType = type;
//        });
//      },
//      onToggleContent() {
//        this.$refs.ratingselect.$on('changeContent', onlyContent => {
//          this.onlyContent = !onlyContent;
//        });
//      }
    },
//    监听子组件的数据
    mounted() {
      this.$refs.ratingselect.$on('select', type => {
        this.selectType = type;
        this.$nextTick(() => {
//          重新更新DOM滚动高度
          this.scroll.refresh();
        });
      });
      this.$refs.ratingselect.$on('changeContent', onlyContent => {
        this.onlyContent = !onlyContent;
//        if (!this.onlyContent) {
//        }
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      });
    }
  };
</script>

<style type="text/less" lang="less">
  /*@import "../../common/less/mixin.less";*/

  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    /*height: 94%;*/
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
      position: relative;
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
      position: relative;
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
        &.span:first-child {
          margin-right: 12px;
        }
      }
      .price {
        padding: 18px 0;
        .now {
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
          line-height: 24px;
        }
        .old {
          font-size: 10px;
          font-weight: 700;
          color: rgb(147, 153, 159);
          line-height: 24px;
          text-decoration: line-through;
        }
      }
      .add {
        position: absolute;
        right: 18px;
        bottom: 18px;
        .add-cart {
          /*position: absolute;*/
          /*right:18px;*/
          /*bottom:18px;*/
          /*z-index: 10;*/
          width: 74px;
          height: 24px;
          line-height: 24px;
          font-size: 10px;
          box-sizing: border-box;
          text-align: center;
          background: rgb(0, 160, 220);
          color: #fff;
          border-radius: 12px;

        }
      }
    }
    .food-detail {
      padding: 18px;
      .title {
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .detail {
        padding: 0 8px;
        font-size: 12px;
        font-weight: 200;
        color: rgb(77, 85, 93);
        line-height: 24px;
      }
    }
    .rating {
      .title {
        margin: 18px;
        font-size: 14px;
        line-height: 14px;
        padding-bottom: 12px;
      }
      .ratings-wrapper {
        .ratings-list {
          padding: 16px 16px 0;
          .user {
            margin-bottom: 6px;
            overflow: hidden;
            span {
              font-size: 10px;
              line-height: 12px;
              color: rgb(147, 153, 159);
              display: inline-block;
            }
            .time {
              float: left;
            }
            .user-message {
              float: right;
              .neme {
                margin-right: 6px;
                vertical-align: top;
              }
              img {
                width: 12px;
                border-radius: 50%;
                vertical-align: top;
              }
            }
          }
          .rating {
            font-size: 0;
            vertical-align: top;
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(7, 17, 27, .1);
            .icon {
              margin-right: 4px;
              line-height: 24px;
              font-size: 12px;
              &.icon-thumb_up {
                color: rgb(0, 160, 220);
              }
              &.icon-thumb_down {
                color: rgb(147, 153, 159);
              }
            }

            .text {
              vertical-align: top;
              font-size: 12px;
              color: rgb(7, 17, 27);
              line-height: 24px;
            }
          }
        }

      }
    }
  }

  /*}*/

</style>
