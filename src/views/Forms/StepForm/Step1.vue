<template>
  <div>
    <a-form layout="horizontal"
      :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
          'payAccount',
            {
              initialValue:step.payAccount,
              rules:[{required:true,message:'请输入付款账号'}],
              validator:(rule,value,callback)=>{
                if(value && value.number){
                  callback();
                }else{
                  callback(false)
                }  
              }
            }]"
          placeholder="请输入付款账号"></a-input>
      </a-form-item>
      <a-form-item
        label="收款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol">
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    handleSubmit(){
      const {form,$router,$store} = this
      form.validateFields((err,values)=>{
        if(!err){
          $store.commit({
            type:"form/saveStepFormData",
            payload:values
          })
        }
        // 跳转第二步
        $router.push("/form/step-form/confirm")
      })
    }
  },
  created() {},
  mounted() {},
  computed:{
    step(){
      return this.$store.state.form.step
    }
  }
};
</script>
<style scoped lang=''>
</style>