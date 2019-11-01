import Vue from 'vue'
import App from './App.vue'

import MintUI from 'mint-ui'
Vue.use(MintUI)

import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true

import moment from 'moment'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import Vuex from 'vuex'
Vue.use(Vuex)

var shopcart = JSON.parse(localStorage.getItem('shopcart') || '[]')

var store = new Vuex.Store({
    state:{
      shopcart:shopcart
    },
    mutations:{
        addToCart(state,goodsInCart){
          var flag = false

          state.shopcart.some(item => {
            if(item.id == goodsInCart.id){
              item.count += parseInt(goodsInCart.count)
              flag = true
              return true
            }
          })

          if(!flag){
            state.shopcart.push(goodsInCart)
          }

          localStorage.setItem('shopcart',JSON.stringify(state.shopcart))

        },
        updateGoodsInfo(state,goodsInCart){
          state.shopcart.some(item => {
            if(item.id == goodsInCart.id){
              item.count = parseInt(goodsInCart.count)
              return true
            }
          })

          localStorage.setItem('shopcart',JSON.stringify(state.shopcart))
        },
        removeGoods(state,id){
          state.shopcart.some((item,i) => {
            if(item.id == id){
              state.shopcart.splice(i,1)
              return true
            }
          })
           localStorage.setItem('shopcart',JSON.stringify(state.shopcart))
        },
        updateGoodsSelected(state,info){
            state.shopcart.some(item => {
              if(item.id == info.id){
                item.selected=info.selected
              }
            })
            localStorage.setItem('shopcart',JSON.stringify(state.shopcart))
        }
    },
    getters:{
        getAllCount(state){
          var c=0;
          state.shopcart.forEach(item => {
            c += item.count
          })
          return c
        },
        getGoodsCount(state){
          var o={}
          state.shopcart.forEach(item => {
            o[item.id] = item.count
          })
          return o
        },
        getGoodsSelected(state){
          var o={}
          state.shopcart.forEach(item =>{
            o[item.id]=item.selected
          })
          return o;
        },
        getGoodsCountAndAmount(state){
          var o={
            count: 0,
            amount: 0
          }
          state.shopcart.forEach(item =>{
            if(item.selected){
              o.count += item.count
              o.amount += item.price * item.count
            }
          })
          return o
        }
    }
})

Vue.filter('dateFormat',function(dataStr,pattern="2019-MM-DD HH:mm"){
    return moment(dataStr).format(pattern)
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
