<!--  -->
<template>
  <div>
    <a-input-group compact>
      <a-select v-model="type" 
                style="width:130px;" 
                @change="handleTypeChange">
        <a-select-option value="alipay">
          支付宝
        </a-select-option>
        <a-select-option value="bank">
          银行账户
        </a-select-option>
      </a-select>
      <a-input
          v-model="number"  
          style="width:calc(100% - 130px)" 
          @change="handleNumberChange"/>
    </a-input-group>
  </div>
</template>

<script>
export default {
  props: {
    value:{
      type:Object,
    }
  },
  data() {
    const {type,number} = this.value || {}
    return {
      type : type || 'alipay',
      number : number || ''
    };
  },
  methods: {
    handleTypeChange(){
      this.$emit("change",{...this.type,...this.number})
    },
    handleNumberChange(){
      this.$emit("change",{...this.type,...this.number})
    }
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang=''>
</style>