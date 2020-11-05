<!--  -->
<template>
  <div>
    {{ $t('message')['app.dashboard.analysis.timeLabel'] }}
    <div>
      <a-button @click="en">English</a-button>
      <a-button @click="zh">中文</a-button>
    </div>
    <Chart :option.sync="option"/>
  </div>
</template>

<script>
import request from "@/utils/request";
import Chart from "@/components/Chart";
export default {
  data() {
    return {
      option:{} 
    };
  },
  components:{
    Chart,
  },

  methods: {
    getChartData(){
      request({
        url:"/api/dashboard/chart",
        method:"GET",
        params:{ID:12345}
      })
        .then(response=>{
          // 指定图表的配置项和数据
          this.option = {
            title: {
              text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
              data:['销量']
            },
            xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: response.data
            }]
          };
        }).catch(err=>{
        })
    },
    en(){
      this.$i18n.locale = 'enUS'
    },
    zh(){
      this.$i18n.locale = 'zhCN'
    },
  },
  // watch:{
  // },
  created() {
  },
  mounted() {
    this.getChartData()
    // this.interval = setInterval(()=>{
    //   this.getChartData()
    // },3000)
  },
  beforeDestroy(){
    clearInterval(this.interval);
  }
};
</script>
<style scoped lang=''>
</style>