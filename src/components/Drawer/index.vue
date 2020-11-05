<template>
  <div>
    <a-drawer
      class="drawer"
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
    <template v-slot:handle>
      <div class="setting-drawer-handle" 
        @click="toggleDrawer">
        <a-icon :type="drawerMenuIcon"></a-icon>
      </div>
    </template>
    <div>
      <h2>整体风格定制</h2>
        <!--change 按钮组选择发生改变时触发 -->
        <!-- <a-radio-group 
          @change="changeTheme"
          :value="navTheme">
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group> -->
        <a-tag @change="changeTheme">

        </a-tag>
      <h2>导航模式</h2>
      <a-radio-group 
          @change="changeLayout" 
          :value="navLayout">
        <a-radio value="left">左侧</a-radio>
        <a-radio value="top">顶部</a-radio>
      </a-radio-group>
    </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    

    changeTheme(e){
      this.$router.push({query:{...this.$route.query,"navTheme":e.target.value}})
    },
    changeLayout(e){
      this.$router.push({query:{...this.$route.query,"navLayout":e.target.value}})
    },
    handleChange(){

    },
    afterVisibleChange(val) {
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    toggleDrawer(){
      return this.visible=!this.visible
    }
  },
  computed:{
    drawerMenuIcon(){
      return this.visible?'close':'setting'
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
<style lang="less" src="./index.less">

</style>