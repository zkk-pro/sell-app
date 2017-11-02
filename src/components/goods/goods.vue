<template lang="html">
  <div>
    <div class="goods">
      <!-- 左侧导航 -->
      <div class="menu-wrapper" ref="menu">
        <ul>
          <li v-for="(itemGoods,index) in goods" class="menu-item" :class="{'current':currentIndex === index}"
              @click="selectMenu(index)">
            <span class="text border-1px"><i v-show="itemGoods.type>0" class="icon"
                                             :class="classMap[goods[index].type]"></i>{{itemGoods.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 右侧商品区 -->
      <div class="foods-wrapper" ref="foods">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook" >
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <!-- 注意这里是遍历item.foods -->
              <li v-for="food in item.foods" class="food-item" @click="selectFood(food)">
                <div class="icon">
                  <img :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="description">{{food.description}}</p>
                  <div class="sales">
                    <span>月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span>￥{{food.price}}</span>
                    <!-- 原价需要判断 没有就不显示-->
                    <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <Cartcontrol :food="food" @add-count="addCount"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!--底部购物车-->
      <Shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                :minPrice="seller.minPrice"/>

    </div>
    <div>
      <Food :food="selectedFood" ref="foodTag"></Food>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios';
  import BScroll from 'better-scroll';
  import Shopcart from '@/components/shopcart/shopcart';
  import Cartcontrol from '@/components/cartcontrol/cartcontrol';
  import Food from '@/components/food/food';

  const ERR_NO = 0;
  export default {
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    props: ['seller'],
    components: {Shopcart, Cartcontrol, Food},
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
//      创建selectFoods
      selectFoods() {
        let foods = [];
        this.goods.forEach(good => { // 遍历goods得到good
          good.foods.forEach(food => {   // 遍历good里的foods数据 得到foods
            if (food.count) { // 判断food里面是否含有count
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    // 请求数据goods数据
    created() {
      Axios.get('/api/goods').then(response => {
        if (response.data.errno === ERR_NO) {
          this.goods = response.data.data;
          this.$nextTick(() => {
            this.initScroll();
            this.calculateHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
//      初始化
      initScroll() {
        this.menuScroll = new BScroll(this.$refs.menu, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foods, {
          click: true,
          probeType: 3  // 这个属性实时监听该节点滚动的位置
        });
//        定义一个滚动事件，回调函数的参数是滚动的位置（x和y）
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },

//      获取元素节点的高
      calculateHeight() {
//        获取全部类型的节点（是一个数组）
        let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
//        遍历数组里的节点（每一种类型）
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
//          把每一个类型的高度累加给height
          height += item.clientHeight;

          this.listHeight.push(height);
        }
      },

      selectMenu(index) {
//        if (!$event._constructed) {
//          return;
//        }
        let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
        let el = foodList[index];
//        使用butter-scroll 的scrollToElement方法（滚动的位置，时间）
        this.foodScroll.scrollToElement(el, 200);
      },
      addCount(target) {
        this.$refs.shopcart.drop(target);  // 访问原生组件DOM，并调用子组件的方法
      },

      selectFood(food) {
        this.selectedFood = food;
        this.$refs.foodTag.show();
      }
    }
  };
</script>

<style type="text/less" lang="less">
  @import "../../common/less/mixin";
  // 使用flex布局
  .goods {
    position: absolute;
    display: flex;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    // 左侧导航
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px; //这是为了兼容不支持flex属性的设置
      background: #f3f5f7;
      .menu-item {
        display: table;
        line-height: 14px;
        width: 56px;
        height: 54px;
        padding: 0 12px;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          /*font-size: 20px;*/
          .text {
            .border-none();
            font-weight: 700;
          }
        }
        .text {
          font-size: 12px;
          vertical-align: top;
          display: table-cell;
          vertical-align: middle;
          line-height: 14px;
          /*width: 56px;*/
          .border-1px(rgba(7, 17, 27, 0.1)); // 1像素兼容
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
            &.decrease {
              .bg-image("../../components/goods/img/decrease_3")
            }
          ;
            &.discount {
              .bg-image("../../components/goods/img/discount_3")
            }
          ;
            &.guarantee {
              .bg-image("../../components/goods/img/guarantee_3")
            }
          ;
            &.invoice {
              .bg-image("../../components/goods/img/invoice_3")
            }
          ;
            &.special {
              .bg-image("../../components/goods/img/special_3")
            }
          }
        }
      }

    }
    // 右侧商品
    .foods-wrapper {
      flex: auto; // 右侧自适应
      .food-list {
        .title {
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d9dde1;
          font-size: 12px;
          color: rba(147, 153, 159);
          background: #f3f5f7;
        }
        .food-item {
          display: flex;
          margin: 18px;
          padding-bottom: 18px;
          .border-1px(rgba(1, 17, 27, .1));
          &:last-child { // 清除最后一个的下划线
            .border-none();
            margin-bottom: 0;
          }
          .icon {
            flex: 0 0 57px;
            img {
              width: 57px;
              height: 57px;
            }
          }
          .content {
            flex: 1;
            margin-left: 10px;
            .name {
              font-size: 12px;
              line-height: 12px;
              color: rgb(7, 17, 27);
              font-weight: bold;
              margin: 2px 0 8px 0;
            }
            .sales {
              font-size: 10px;
              line-height: 10px;
              color: rgb(147, 153, 159);
            }
            .description {
              font-size: 10px;
              line-height: 12px;
              color: rgb(147, 153, 159);
              margin: 8px 0;
            }
            .sales span:first-child {
              margin-right: 12px;
            }
          }
          .price {
            font-weight: 700;
            line-height: 24px;

            span:first-child {
              color: #f01414;
              font-size: 14px;
              /*font-weight: 700;*/
              line-height: 24px;
              margin-right: 8px;
            }
            span:last-child {
              color: rgb(147, 153, 159);
              font-size: 10px;
              text-decoration: line-through;
              /*font-weight: 700;*/
              /*line-height: 24px;*/
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
</style>
