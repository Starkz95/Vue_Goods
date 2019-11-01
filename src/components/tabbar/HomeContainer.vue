<template>
  <div>
    <swiper :imglist="imglist" :isfull="true"></swiper>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newlist">
          <span class="mui-icon mui-icon-chatboxes"></span>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/photolist">
          <span class="mui-icon mui-icon-image"></span>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/goodslist">
          <span class="mui-icon mui-icon-starhalf"></span>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="#">
          <span class="mui-icon mui-icon-email"></span>
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="#">
          <span class="mui-icon mui-icon-videocam"></span>
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="#">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import swiper from '../subcomponents/swiper.vue'

  export default {
    data() {
      return {
        imglist: []
      }
    },
    created() {
      this.getLoopImg()
    },
    methods: {
      getLoopImg() {
        this.$http.get('api/getlunbo').then(result => {
          if (result.body.status === 0) {
            this.imglist = result.body.message
          } else {
            Toast("加载图片失败")
          }
        })
      }
    },
    components:{
      swiper
    }
  }
</script>

<style lang="scss" scoped>


  .mui-grid-view.mui-grid-9 {
    background-color: white;
    border: none;
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
  }
</style>
