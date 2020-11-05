import router from '../../router'
import request from '../../utils/request'

const state = {
  step:{
    payAccount : '123456',
    receiverAccount:{
      type:'bank',
      number:"123"
    }
  },
}

const mutations = {
  saveStepFormData(state,{payload}){
    state.step = {
      ...state.step,
      ...payload 
    }
  }
}

const actions = {
  async submitStepForm({commit},{payload}){
    await request({
      url:"/api/form",
      method:"POST",
      data:payload.payload
    });
    commit("saveStepFormData",{payload})
    router.push("/form/step-form/result")
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}