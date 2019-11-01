<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,i) in imglist" :key="i">
        <img :src="item.img"  :class="{'full':isfull}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>

</template>

<script>
  export default{
    data(){
      return{

      }
    },
    props:["imglist", "isfull"]
  }
</script>

<style lang="scss" scoped="scoped">
  .mint-swipe {
    text-align: center;
    height: 230px;
    img {
      height: 100%;
    }
  }

  .full{
      width: 100%;
  }

</style>
