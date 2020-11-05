<template>
  <div :class="[`nav-theme-${navTheme}`,`nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!--根据路由参数拿到主题颜色,刚好可以利用计算属性navTheme-->
      <a-layout-sider
        :theme="navTheme" 
        v-if="navLayout === 'left'"
        :trigger="null" 
        v-model="collapsed" 
        collapsible
        width="256px"
        >
        <div class="logo"></div>
        <SiderMenu :theme="navTheme" :collapsed="collapsed"/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff;padding: 0;">
            <a-icon
              :type="selectMenuIcon"
              @click="toggle" 
              class="trigger"/>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer/>
        </a-layout-footer>
      </a-layout>
      <Authority :authority="['admin']">
        <SettingDrawer/>
      </Authority>
    </a-layout>
  </div>
  <!-- drawer 设置处-->
</template>
<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SiderMenu from "./SiderMenu.vue";
import SettingDrawer from '../components/Drawer/index'
export default {
  components:{
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods:{
    toggle(){
      return this.collapsed = !this.collapsed
    },
  },
  computed:{
    selectMenuIcon(){
      return this.collapsed?'menu-unfold':'menu-fold'
    },
    navTheme(){
      return this.$route.query.navTheme || 'dark'
    },
    navLayout(){
      return this.$route.query.navLayout || 'left'
    }
  }
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.trigger{
  padding:0 20px;
  font-size:20px;
}
/* .logo{
  color:white;
  font-size:1.5rem;
  text-align: center;
  border-radius:20px;
  line-height: 30px;
} */
</style>