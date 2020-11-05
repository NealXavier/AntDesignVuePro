import {check} from '../utils/auth'

function install(Vue,options = {}){
  Vue.directive(options.name || "auth",{
    inserted(el,binding){
      if(!check(binding.value)){
        // 一次调用,遍地执行,不好的地方, 如果权限动态配置了,那么el已经被remove了
        // 那就无法重新配置也没有用了。
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  })
}

export default { install };
