<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="maxNum">
  					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
  					<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged()" ref="num">
  					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  				</div>
</template>

<script>
  import mui from '../../lib/mui/js/mui.js'
  export default{
    mounted(){
      mui(".mui-numbox").numbox()
    },
    methods:{
      countChanged(){
        this.$emit('getCount', parseInt(this.$refs.num.value))
      }
    },
    props:['maxNum'],
    watch:{
      'maxNum' : function(newVal,oldVal){
        mui(".mui-numbox").numbox().setOption('max',newVal)
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
</style>
