import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import findLast from 'lodash/findLast'
import { check, isLogin } from "./utils/auth";
// import NotFound from "./views/404";

Vue.use(Router);

// 获取原型对象上的push函数
const originPush  = Router.prototype.push
// 修改原型对象中的方法
Router.prototype.push = function(location){
  return originPush.call(this,location).catch(err=>err)
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register")
        }
      ]
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      children: [
        // dashboard
        {
          path: "/",
          meta:{authority:["user","admin"]},
          redirect: "/dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { icon: "dashboard", title: "仪表盘" },
          title:"仪表盘",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              meta: { title: "分析页" },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis")
            }
          ]
        },
        // form
        {
          path: "/form",
          name: "form",
          component: { render: h => h("router-view") },
          meta: { icon: "form", title: "表单" , authority: ["admin"] },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              meta: { title: "基础表单" },
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm.vue")
            },
            {
              path: "/form/step-form",
              name: "stepform",
              hideChildrenInMenu: true,
              meta: { title: "分布表单" },
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1")
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2")
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path:"/403",
      name:"403",
      hideInMenu:true,
      component:() => import(/*webpackChunkName: "exception" */"./views/Exception/403")
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: ()=>import(/*webpackChunkName: "exception" */"./views/Exception/404.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
    // 1.当没有权限访问时,则跳转403
  // 2.当没有登录时则跳转登录页
  // findLast 从右向左遍历
  const record = findLast(to.matched,record => record.meta.authority)
  if(record && !check(record.meta.authority)){
    if(!isLogin() && to.path !== '/user/login'){
      next({
        path:'./user/login'
      })
    }else if(to.path !== './403'){
      // notification:
      notification.error({
        message:"403",
        description:"你没有权限访问，请联系管理员咨询"
      });
      next({
        path:"/403"
      })
    }
  }
  next();
});

router.afterEach(() => {
  NProgress.done();

});

export default router;