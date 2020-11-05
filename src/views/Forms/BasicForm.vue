<template>
  <a-form :layout="formLayout" :form="form">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group default-value="horizontal" @change="handleFormLayoutChange">
        <a-radio-button value="horizontal">
          Horizontal
        </a-radio-button>
        <a-radio-button value="vertical">
          Vertical
        </a-radio-button>
        <a-radio-button value="inline">
          Inline
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      {{fieldA}}
      <a-input 
        v-decorator="['fieldA', {
         initialValue:fieldA,
         rules:[
          {
           help:'必须超过5个字符',
           validateStatus:'error',
           min:5
          }
         ]
       }]"
       placeholder="input placeholder" />
    </a-form-item>
    <a-form-item
      label="Field B"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input placeholder="input placeholder" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit">
         Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    this.form = this.$form.createForm(this)

    return {
      formLayout: 'horizontal',
      fieldA : "hello",
      // fieldAStatus:"",
      // fieldAMsg:""
    };
  },
  watch:{
    // fieldA(val){
    //   if(val.length <= 5){
    //     this.fieldAStatus = 'error'
    //     this.fieldAMsg = '必须超过5个字符'
    //   }else{
    //     this.fieldAStatus = ''
    //     this.fieldAMsg = ''
    //   }
    // }
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
  },
  methods: {
    handleSubmit(){
      this.form.validateFields((err,values)=>{
        if(!err){
          // this.fieldA = values.fieldA
          Object.assign(this,values);
        }
      })
    },
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
  },
  mounted(){
    // this.form.setFieldsValue 可以手动去改动fieldA的值，但是目前也不清楚有什么用。但是数据还是需要手动同步。
    // setInterval(() => {
    //   this.form.setFieldsValue({fieldA:"helllll"+ Math.random(0,100)})
    //   this.handleSubmit()
    // }, 3000);
  },
};
</script>
<style scoped lang=''>
</style>