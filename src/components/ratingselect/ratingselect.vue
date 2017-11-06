<template lang="html">
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2)" :class="{'active':selectType == 2}">{{desc.all}}</span>
      <span @click="select(0)" :class="{'active':selectType == 0}">{{desc.postive}}</span>
      <span @click="select(1)" :class="{'active':selectType == 1}">{{desc.negative}}</span>
    </div>
    <div class="switch" @click="toggleContent">
      <span class="icon-check_circle" :class="{'active':onlyContent}"></span>
      <span>只看有内容的评价</span>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  //  const POSTIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
//      评价
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
//      选择查看的类型
      selectType: {
        type: Number,
        default: ALL
      },
//      是否只看有内容的
      onlyContent: {
        type: Boolean,
        default: false
      },
//      评价的类型
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            postive: '满意',
            negative: '不满意'
          };
        }
      }

    },
    computed: {
      ratetime() {
        this.ratings.forEach(item => {
          item.rateTime.toLocaleString();
        });
      }
    },
    methods: {
      select(type) {
//        this.selectType = type;
//        通知父组件数据的改变
        this.$emit('select', type);
      },
      toggleContent() {
//        this.onlyContent = !this.onlyContent;
        this.$emit('changeContent', this.onlyContent);
      }
    }
  };
</script>

<style type="text/less" lang="less">
  @import "../../common/less/base.less";

  .ratingselect {
    .rating-type {
      font-size: 0;
      margin: 0 18px;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      span {
        padding: 8px 12px;
        margin-right: 8px;
        font-size: 12px;
        line-height: 16px;
        display: inline-block;
        border-radius: 1px;
      }
      & span:nth-child(1), & span:nth-child(2) {
        color: rgb(77, 85, 93);
        background: rgba(0, 160, 220, .2);
        &.active {
          color: #fff;
          background: rgb(0, 160, 220);
        }
      }
      & span:nth-child(3) {
        color: rgb(77, 85, 93);
        background: rgba(77, 85, 93, .2);
        &.active {
          color: #fff;
          background: rgb(77, 85, 93);
        }
      }
    }
    .switch {
      padding: 12px 0 12px 18px;
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      font-size: 0;
      span {
        color: rgb(147, 153, 159);
        line-height: 24px;
      }
      span:nth-child(1) {
        font-size: 24px;
        margin-right: 4px;
        vertical-align: top;
        &.active {
          /*background: #adff2f;*/
          color: #00b43c;
        }

      }
      span:nth-child(2) {
        font-size: 12px;
        vertical-align: top;
      }
    }

  }
</style>
