import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShorpcartContainer from './components/tabbar/ShopcartContainer.vue'
import Newlist from './components/news/Newlist.vue'
import Newsinfo from './components/news/Newsinfo.vue'
import PhotoList from './components/photos/PhotoList'
import Photoinfo from './components/photos/Photoinfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import Goodsinfo from './components/goods/Goodsinfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

var router =new VueRouter({
  routes:[
    { path:'/', redirect:'/home' },
    { path:'/home', component: HomeContainer },
    { path:'/member', component: MemberContainer },
    { path:'/search', component: SearchContainer },
    { path:'/shopcart', component: ShorpcartContainer },
    { path:'/home/newlist', component: Newlist },
    { path:'/home/newsinfo/:id', component: Newsinfo },
    { path:'/home/photolist/', component: PhotoList },
    { path:'/home/photoinfo/:id', component: Photoinfo },
    { path:'/home/goodslist/', component: GoodsList },
    { path:'/home/goodsinfo/:id', component: Goodsinfo },
    { path:'/home/goodsdesc/:id', component: GoodsDesc },
    { path:'/home/goodscomment/:id', component: GoodsComment },
  ],
  linkActiveClass: 'mui-active'
})

export default router
