import axios from "axios"
import {Divider, notification} from 'ant-design-vue/es'


function request(options){
  return axios(options)
            .then(res=>{
              return Promise.resolve(res)
            })
            .catch(error=>{
              const {status,statusText} = error
              notification.error({
                message: h => <div>请求错误:<span style="color:red;">{status}</span>:{options.url}</div>,
                description: statusText
              });
              return Promise.reject(error)
            })
}

export default request;