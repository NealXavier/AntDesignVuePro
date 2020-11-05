<template>
  <div style="height:200px;"
        ref="chartDom"></div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import {addListener,removeListener} from 'resize-detector';
import random from 'lodash/random'
// 添加防抖
import debounce from "lodash/debounce";

export default {
  props: {
    option:{
      type:Object,
      default:()=>({}),
      required:false
    }
  },
  data() {
    return {};
  },
  methods: {
    resize(){
      this.myChart.resize()
    },
    renderStart(){
      // 基于准备好的dom,初始化echarts实例
      this.myChart = echarts.init(this.$refs.chartDom);  

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(this.option);
    }
  },
  watch:{
    // 深度监听可以，但是性能极低。
    // option: {
    //   handler(val) {
    //     this.myChart.setOption(val);
    //   },
    //   deep: true
    // }
    option(val){
      this.myChart.setOption(val)
    }
  },
  created(){
    this.resize = debounce(this.resize,300)
  },
  mounted() {
    this.renderStart()
    addListener(this.$refs.chartDom,this.resize)

    // 演示一下数字随机变动的效果，这就是不用深度监听的方案.
    // this.interval = setInterval(()=>{
    //   var chartOption = {};
    //   this.option.series[0].data = this.option.series[0].data.map(()=>random(100));
    //   this.$emit("update:option",{...this.option})
    // },500)
  },
  beforeDestroy(){
    removeListener(this.$refs.chartDom,this.resize)
    // 销毁实例
    this.myChart.dispose()
    // 回收实例
    this.myChart = null

    // clearInterval(this.interval);
  }
};
</script>
<style scoped lang=''>
</style>