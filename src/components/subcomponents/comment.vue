<template>
  <div class="container">
     <h3>评论区</h3>
     <hr>
     <textarea placeholder="请输入评论内容" v-model="msg"></textarea>
     <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
     <div class="cmt-list">
       <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
         <div class="cmt-title">
           {{i+1}}-----用户：{{item.user_name}}-----发表时间：{{item.add_time | dateFormat}}
         </div>
         <div class="cmt-body">
              {{item.content === '' ? 'no content' : item.content}}
         </div>
       </div>
     </div>
     <mt-button type="danger" size="large" @click="getMoreComments()" plain>加载更多</mt-button>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default{
    data(){
      return{
         pageIndex: 1,
         comments: [],
         msg: ''
      }
    },
    created(){
      this.getComments()
    },
    methods:{
      getComments(){
        this.$http.get('api/getcomments/'+ this.id + '?pageindex=' + this.pageIndex).then(result => {
          if(result.body.status === 0){
            this.comments=this.comments.concat(result.body.message)
          }
          else{
            Toast("加载评论失败")
          }
         })
      },
      getMoreComments(){
        this.pageIndex++
        this.getComments()
      },
      postComment(){
        if(this.msg.length===0){
          Toast("评论不能为空")
        }
        this.$http.post('api/postcomment/'+ this.id, {content: this.msg}).then(function(result){
          if(result.body.status===0){
              var cmt={user_name:'匿名用户', add_time: Date.now(), content: this.msg}
              this.comments.unshift(cmt)
              this.msg=''
          }
        })
      }
    },
    props: ["id"]
  }
</script>

<style lang="scss" scoped="scoped">
  .container{
    h3{
      font-size: 18px;
    }
    textarea{
      font-size: 14px;
      height: 85px;
      margin: 0;
    }
  }

  .cmt-list{
    margin: 10px 0;

    .cmt-item{
      font-size: 13px;

      .cmt-title{
          line-height: 35px;
          background-color: #DDDDDD;
        }
        .cmt-body{
            text-indent: 2em;
            line-height: 35px;
        }
      }
    }

</style>
