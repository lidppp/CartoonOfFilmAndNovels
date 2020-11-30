import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Home from '@/views/home'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:"/search/:type/:queryString",
    name:"Search",
    component: ()=>import("@/views/search")
  },
  {
    // 漫画列表
    path:"/mhDetails/:url",
    name:"mhDetails",
    component: ()=>import("@/views/mh-details")
  },
  {
    // 影视列表
    path:"/ysDetails/:url/:index?",
    name:"ysDetails",
    component: ()=>import("@/views/ys-details")
  },
  {
    // 小说列表
    path:"/xsDetails/:url",
    name:"xsDetails",
    component: ()=>import("@/views/xs-details")
  },
  {
    // 漫画查看页面
    path: "/mhShow/:url/:index",
    name:"mhShow",
    component: ()=>import("@/views/mh-show")
  },
  {
    // 小说查看页面
    path: "/xsShow/:url/:index",
    name:"xsShow",
    component: ()=>import("@/views/xs-show")
  },
  {
    // 影视查看页面
    path:"/ysShow/:url/:index",
    name:"ysShow",
    component: ()=>import("@/views/ys-show")
  },
  {
    // 历史记录
    path: "/history",
    name: "history",
    component: () => import("@/views/history")
  },
  {
    // 历史记录
    path: "/collection",
    name: "collection",
    component: () => import("@/views/collection")
  },
  ,
  {
    // 中间代理跳转
    path: "/proxy",
    name: "proxy",
    component: () => import("@/views/proxy")
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})


// router.beforeEach((to,from,next)=>{
  // if(to.name === from.name && (to.name === "xsShow" || to.name === "mhShow" || to.name === "ysShow")){
  //   next({
  //     name:"proxy",
  //     params:{
  //       name:to.name,
  //       ...to.params
  //     }
  //   })
  // }else{
  //   next()
  // }
// })

export default router
