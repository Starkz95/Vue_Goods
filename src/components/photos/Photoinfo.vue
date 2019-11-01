<template>
  <div class="img-container">
    <h3>
      {{photoinfo.title}}
    </h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
      <span>点击：{{photoinfo.click}}次</span>
    </p>
    <hr />
    <div class="img-content">
    <vue-preview :slides="slide1" @close="handleClose" ></vue-preview>
    </div>
    <div class="content" v-html="photoinfo.content">
    </div>
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
  import comment from '../subcomponents/comment.vue'
  export default{
    data(){
      return{
          id: this.$route.params.id,
          photoinfo: {},
          slide1:[]
      }
    },
    created(){
      this.getPhotoinfo()
      this.getThumbs()
    },
    methods:{
      getPhotoinfo(){
        this.$http.get('api/getimageinfo/'+ this.id).then(result => {
          if (result.body.status === 0) {
            this.photoinfo = result.body.message[0]
          } else {
            Toast("加载图片详情失败")
          }
        })
      },
      getThumbs(){
        this.$http.get('api/getthumimages/'+ this.id).then(result => {
          if (result.body.status === 0) {
              result.body.message.forEach(item=>{
                item.msrc=item.src
                item.alt=''
                item.title=''
                item.w=600
                item.h=400

            })
            this.slide1 = result.body.message
          } else {
            Toast("加载缩略图失败")
          }
        })
      },
      handleClose () {
              console.log('close event')
            }
    },
    components:{
      'comment-box': comment
    }
  }
</script>

<style lang="scss">
  .img-container{
    padding: 3px;
    h3{
      color: #242424;
      font-size: 15px;
      text-align: center;
      margin: 15px 0;
    }
    .subtitle{
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }
    .content{
      font-size: 13px;
      line-height: 30px;
      display: inline-block;
    }
    .img-content{
      img{
        height: 100px;
        box-shadow: 0 0 8px #999999;
        display: inline-block;
        float: left;
        margin: 8px;
      }
    }
  }

</style>
