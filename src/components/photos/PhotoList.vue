<template>
  <div>
    <div id="slider" class="mui-slider">
    				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted" data-scroll="1">
    					<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
    						<a :class="['mui-control-item', item.id==0? 'mui-active' : '']" href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="item in category" :key="item.id"
                @click="getImages(item.id)">
    							{{item.title}}
    						</a>
    					</div>
    				</div>

    			</div>
        <div class="photo-list">
          <ul>
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
              <img v-lazy.photo-list="item.img_url">
              <div class="info">
                <div class="info-title">
                  <h1>{{item.title}}</h1>
                  <div class="info-body">
                    {{item.zhaiyao}}
                  </div>
                </div>
              </div>
            </router-link>
          </ul>
        </div>
  </div>
</template>

<script>
  import mui from '../../lib/mui/js/mui.js'
  import {Toast} from 'mint-ui'

  export default{
    data(){
      return{
        category:[],
        list: []
      }
    },
    created(){
      this.getCategory()
      this.getImages(0)
    },
    mounted(){
      mui('.mui-scroll-wrapper').scroll({
      	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },
    methods:{
        getCategory(){
          this.$http.get('api/getimgcategory').then(result => {
            if (result.body.status === 0) {
              this.category = result.body.message
              this.category.unshift({title: '全部', id: 0})
            } else {
              Toast("加载分类失败")
            }
          })
        },
        getImages(cateId){
          this.$http.get('api/getimages/' + cateId).then(result => {
            if (result.body.status === 0) {
              this.list = result.body.message
            } else {
              Toast("加载图片失败")
            }
          })
        }
    }
  }
</script>

<style lang="scss" scoped="scoped">
.photo-list{
  ul{
    list-style: none;
    margin: 0;
    padding: 20px;
    padding-bottom: 0;
    li{
      background-color: #EFEFF4;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 9px #BBBBBB;
      position: relative;
      img{
        width: 100%;
        vertical-align: middle;
      }
      img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
    }
  }
}

.info{
  color: white;
  text-align: left;
  position: absolute;
  bottom: 0;
  background-color: rgba($color: black, $alpha: 0.4);
  max-height: 84px;
  .info-title{
    h1{
      font-size: 14px;
      }

  }
  .info-body{
    font-size: 13px;
  }
}
</style>
