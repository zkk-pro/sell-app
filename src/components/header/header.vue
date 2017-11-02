<template lang="html">
  <div class="header">
    <!-- 1-内容区 -->
    <div class="content-wrapper">
      <!-- 1-1-头像 -->
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <!-- 1-2-店铺标头 -->
      <div class="content">
        <!-- 1-2-1-店铺名 -->
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <!-- 1-2-2-店铺描述 -->
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!-- 1-2-3-店铺活动 -->
        <div class="support" v-if="seller.supports">
          <!-- 这里加上v-if是因为：获取数据是异步的，在没有获取成功之前，
          下面就使用了seller.supports[0],就会报错，说没有找到，说以加上判断就
          表示只有当seller.supports有值的时候才显示下面的元素 -->

          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <!-- 1-2-4-店铺活动详情 -->
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- 2-公告区 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>

    </div>
    <!-- 3-标头背景 -->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- 4-公告详情 -->
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <!-- 使用 sticky footers布局 -->
        <div class="detail-warpper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}{{seller.score}}</h1>
            <div class="star-wrapper">
              <Star :size="48" :score="seller.score" />
            </div>
            <div class="title">
              <!-- 这里使用block元素是因为inline元素在安卓手机上可能会有问题 -->
              <div class="line"></div> <!-- 线条 -->
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <div>
              <ul v-if="seller.supports" class="supports">
                <li class="supports-item" v-for="(item,index) in seller.supports">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
            </div>
            <div class="title">
              <!-- 这里使用block元素是因为inline元素在安卓手机上可能会有问题 -->
              <div class="line"></div> <!-- 线条 -->
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from '@/components/star/star';
export default {
  data () {
    return {
      detailShow: false
    };
  },
  props: ['seller'],
  methods: {
    showDetail () {
      this.detailShow = true;
    },
    closeDetail () {
      this.detailShow = false;
    }
  },
  components: {
    Star
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>

<style type="text/less" lang="less">
  @import "../../common/less/mixin";
  @import "../../common/less/icon";
  .header{
    position: relative;
    background-color: rgba(7, 17, 27, .3);
    overflow: hidden;

    // background: #999;
    color: #fff;
    .content-wrapper{
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .avatar{
        display: inline-block;
        vertical-align: top;
        img{
          border-radius: 2px;
        }
      }
      .content{
        margin-left: 16px;
        display: inline-block;
        .title{
          margin: 2px 0 8px 0;
          .brand{
            display: inline-block;
            width: 30px;
            height: 18px;
            .bg-image("../../components/header/img/brand");
            background-size: 30px 18px;
            background-repeat: no-repeat;
            vertical-align: top;
          };
          .name{
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        };
        .description{
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
        }
        .support{
          .icon{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 10px;
            background-size: 12px;
            background-repeat: no-repeat;
            &.decrease{
              .bg-image("../../components/header/img/decrease_1")
            };
            &.discount{
              .bg-image("../../components/header/img/discount_1")
            };
            &.guarantee{
              .bg-image("../../components/header/img/guarantee_1")
            };
            &.invoice{
              .bg-image("../../components/header/img/invoice_1")
            };
            &.special{
              .bg-image("../../components/header/img/special_1")
            }
          }
          .text{
            line-height: 12px;
            font-size: 10px;
          }
        }
      }
      .support-count{
        position: absolute;
        right: 12px;
        bottom: 18px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0, 0, 0, .2);
        text-align: center;
        .count{
          font-size: 10px;
          vertical-align: top;
        };
        .icon-keyboard_arrow_right{
          margin-left: 2px;
          font-size: 10px;
          line-height: 24px;
        }
      }
    };
    .bulletin-wrapper{
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      position: relative;
      background-color: rgba(7, 17, 27, .2);
      // 文字溢出显示...
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      // font-size会影响...的显示，解决方式是HTML标签之间不要有空隙
      // font-size: 0;
      .bulletin-title{
        display: inline-block;
        width: 22px;
        height: 12px;
        vertical-align: top;
        margin-top: 8px;
        .bg-image('../../components/header/img/bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
      };
      .bulletin-text{
        margin: 0 4px;
        font-size: 10px;
        vertical-align: top;
      };
      .icon-keyboard_arrow_right{
        position: absolute;
        font-size: 10px;
        right: 12px;
        top: 8px;
      }
    };
    // 把图片作为背景
    .background{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px); // 背景图模糊效果
    }
    .detail{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: rgba(7, 17, 27, 0.8);
      // backdrop-filter:blur(10px);

      .detail-warpper{
        min-height: 100%;
        width: 100%;
        .detail-main{
          margin-top: 64px;
          padding-bottom: 64px;
          .name{
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }
          .star-wrapper{
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
          .title{
            display: flex;
            width: 90%;
            margin: 28px auto 24px auto;
            .line{
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255,255,255,.2);
            }
            .text{
              padding: 0 12px;
              font-size: 14px;
              font-weight: 700;
            }
          }
          .supports{
            width: 80%;
            margin: 0 auto;
            .supports-item{
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child{
                margin-bottom: 0;
              }
              .icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 16px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                &.decrease{
                  .bg-image("../../components/header/img/decrease_2")
                };
                &.discount{
                  .bg-image("../../components/header/img/discount_2")
                };
                &.guarantee{
                  .bg-image("../../components/header/img/guarantee_2")
                };
                &.invoice{
                  .bg-image("../../components/header/img/invoice_2")
                };
                &.special{
                  .bg-image("../../components/header/img/special_2")
                }
              }
              .text{
                line-height: 16px;
                font-size: 12px;
              }
            }
          }
          .bulletin{
            width: 80%;
            margin: 0 auto;
            .content{
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;
            }
          }
        }
      };
      .detail-close{
        position: relative;
        width: 32px;
        // height: 32px;
        margin: -64px auto;
        font-size: 32px;

      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .8s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }
</style>
