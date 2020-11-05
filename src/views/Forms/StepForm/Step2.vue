<template>
  <div>
    <a-form layout="horizontal"
      :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol">
        {{step.payAccount}}
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol">
        <receiver-account
          v-decorator="[
          'receiverAccount',
            {
              initialValue:step.receiverAccount,
              rules:[
              {
                required:true,message:'请输入付款账号',
                validator:(rule,value,callback)=>{
                  if(value && value.number){
                    callback();
                  }else{
                    callback(false)
                  }  
                }
              }
              ],
            }
          ]">
        </receiver-account>
      </a-form-item>
      <a-form-item>
        <a-button style="margin-left:8px;" @click="onPrev">上一步</a-button>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import receiverAccount from '@/components/ReceiverAccount'
export default {
  components:{receiverAccount},
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
    onPrev(){
      this.$router.push("/form/step-form/info")
    },
    handleSubmit(){
      const {form,$store,step} = this
      form.validateFields((err,values)=>{
        if(!err){
          this.$store.dispatch({
            type:"form/submitStepForm",
            payload:{...step,...values}
          })
        }
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