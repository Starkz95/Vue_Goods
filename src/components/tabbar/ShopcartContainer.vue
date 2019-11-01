<template>
  <div class="shopcart-container">
    <div class="goods-list">
      <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path"/>
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">${{item.sell_price}}</span>
                 <numbox :initCount="$store.getters.getGoodsCount[item.id]" :id="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计</p>
              <p>已勾选商品<span style="color: red;font-size: 16px; font-weight: bold;">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，
                 总价$<span style="color: red;font-size: 16px; font-weight: bold;">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import numbox from '../subcomponents/shopcart_numbox.vue'
  export default{
    data(){
      return{
        goodsList: []
      }
    },
    created(){
      this.getGoodsList()
    },
    methods:{
      getGoodsList(){
          var idArr = []
          this.$store.state.shopcart.forEach(item =>{
            idArr.push(item.id)
          })
          if(idArr.length<=0){
            return;
          }
          this.$http.get('api/goods/getshopcarlist/'+ idArr.join(",")).then(result => {
            if (result.body.status === 0) {
              this.goodsList = result.body.message
            } else {
              Toast("加载商品信息失败")
            }
          })
      },
      remove(id,index){
        this.goodsList.splice(index,1)
        this.$store.commit('removeGoods',id)
      },
      selectedChange(id,val){
        this.$store.commit('updateGoodsSelected',{id:id, selected:val})
      }
    },
    components:{
      numbox
    }
  }
</script>

<style lang="scss" scoped>
  .shopcart-container{
    background-color: #EFEFF4;
    overflow: hidden;
    .goods-list{
      .mui-card-content-inner{
        display: flex;
        align-items: center;
      }
      img{
        margin-left: 10px;
        width: 60px;
        height: 60px;
      }
      .info{
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .price{
          color: red;
          font-weight: bold;
        }
        h1{
          font-size: 13px;
        }
      }
    }
    .jiesuan{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
