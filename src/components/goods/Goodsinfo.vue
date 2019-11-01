<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
    <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :imglist="lunbo" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
              市场价：<del>${{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">${{goodsInfo.sell_price}}</span>
          </p>
          <p>购买数量： <numbox @getCount="getSelectCount" :maxNum="goodsInfo.stock_quantity"></numbox></p>
          <p>
            <mt-button type="primary" size="small" >立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCart()">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsInfo.goods_no}}</p>
          <p>库存情况：{{goodsInfo.stock_quantity}}</p>
          <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(goodsInfo.id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(goodsInfo.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import swiper from '../subcomponents/swiper.vue'
  import numbox from '../subcomponents/goodsinfo_numbox.vue'
  export default{
    data(){
      return{
          id: this.$route.params.id,
          lunbo: [],
          goodsInfo: {},
          ballFlag: false,
          selectedCount:1
      }
    },
    created(){
      this.getLunbo()
      this.getGoodsInfo()
    },
    methods:{
      getLunbo(){
        this.$http.get('api/getthumimages/'+ this.id).then(result => {
          if (result.body.status === 0) {
            result.body.message.forEach(item => {
              item.img = item.src
            })
            this.lunbo = result.body.message
          } else {
            Toast("加载商品图片失败")
          }
        })
      },
      getGoodsInfo(){
        this.$http.get('api/goods/getinfo/'+ this.id).then(result => {
          if (result.body.status === 0) {
            this.goodsInfo = result.body.message[0]
          } else {
            Toast("加载商品信息失败")
          }
        })
      },
      goDesc(id){
        this.$router.push('/home/goodsdesc/'+ id)
      },
      goComment(id){
        this.$router.push('/home/goodscomment/'+ id)
      },
      addToShopCart(){
        this.ballFlag = !this.ballFlag
        var goodsInCart = {id: this.id, count: this.selectedCount, price: this.goodsInfo.sell_price, selected: true}
        this.$store.commit('addToCart',goodsInCart)
      },
      beforeEnter(el){
        el.style.transform = 'translate(0,0)'
      },
      enter(el,done){
         el.offsetWidth
         var ballPosition = this.$refs.ball.getBoundingClientRect()
         var badgePosition = document.getElementById('badge').getBoundingClientRect()
         var xDist = badgePosition.left - ballPosition.left
         var yDist = badgePosition.top - ballPosition.top
         el.style.transform = 'translate('+ xDist +'px , ' +yDist +'px)'
         el.style.transition = 'all 0.8s cubic-bezier(.4,-0.3,1,.68)'
         done()
      },
      afterEnter(el){
          el.style.opacity = 1
         this.ballFlag = !this.ballFlag
      },
      getSelectCount(count){
          this.selectedCount = count
      }
    },
    components:{
      swiper,
      numbox
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .goodsinfo-container{
    background-color: #EEEEEE;
    overflow: hidden;
    .now_price{
      font-size: 16px;
      color: red;
    }

    .mui-card-footer{
      display: block;
      button{
        margin: 15px 0;
      }
    }

    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top:420px;
        left: 150px;
    }
  }

</style>
