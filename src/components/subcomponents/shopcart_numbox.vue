<template>
  <div class="mui-numbox" data-numbox-min="1" style="height: 25px;">
  					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
  					<input id="test" class="mui-input-numbox" type="number" :value="initCount" @change="countChanged()" ref="num" readonly>
  					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  				</div>
</template>

<script>
  import mui from '../../lib/mui/js/mui.js'
  export default{
    data(){
      return{

      }
    },
    mounted(){
      mui(".mui-numbox").numbox()
    },
    methods:{
      countChanged() {
          this.$store.commit('updateGoodsInfo',{id: this.id, count: this.$refs.num.value})
      },

  },
  props:["initCount","id"]
 }
</script>

<style lang="scss" scoped="scoped">
</style>
