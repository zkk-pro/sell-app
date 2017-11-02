<template lang="html">
  <!-- 通过计算属性 现在的starType就是：star-48 对应的css就是.star-48的样式-->
  <div class="star" :class="starType" >
    <span v-for="itemClass in itemClasses" class="star-item" :class="itemClass"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
  // 接收父组件传入的属性
  props: ['size', 'score'],
  // 在属性使用之前，计算属性
  computed: {
    starType () {
      return 'star-' + this.size; // 给属性添加上数字
    },
    itemClasses () {
      let result = [];
      // floor向下取整，如果score是.5以下 /2，返回的就是该整数，
      // 如果是.5以上/2，返回的就是改数+0.5，如：Math.floor(4.3*2)/2 = 4
      let score = Math.floor(this.score * 2) / 2;
      // 判断是否为整数
      let hasDecimal = score % 1 !== 0;
      // 整数的个数
      let integer = Math.floor(score);
      // 遍历整数
      for (var i = 0; i < integer; i++) {
        // 添加全星
        result.push(CLS_ON);
      }
      // 判断如果有不为整数的
      if (hasDecimal) {
        // 添加半星
        result.push(CLS_HALF);
      }
      // 判断数组的长度是否等于给定的5
      while (result.length < LENGTH) {
        // 不等于添加灰星
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="less">
  @import "../../common/less/mixin";
  .star{
    font-size: 0;
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48{
      .star-item{
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-image('../../components/star/star48_on')
        }
        &.half{
          .bg-image('../../components/star/star48_half')
        }
        &.off{
          .bg-image('../../components/star/star48_off')
        }
      }
    }
    &.star-36{
      .star-item{
        width: 15px;
        height: 15px;
        margin-right: 16px;
        background-size: 15px 15px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-image('../../components/star/star36_on')
        }
        &.half{
          .bg-image('../../components/star/star36_half')
        }
        &.off{
          .bg-image('../../components/star/star36_off')
        }
      }
    }
    &.star-24{
      .star-item{
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-image('../../components/star/star24_on')
        }
        &.half{
          .bg-image('../../components/star/star24_half')
        }
        &.off{
          .bg-image('../../components/star/star24_off')
        }
      }
    }
  }
</style>
