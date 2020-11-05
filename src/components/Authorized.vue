<script>
import { check } from '../utils/auth';
export default {
  props: {
    authority:{
      type:Array,
      required:true
    }
  },
  functional : true,
  render(h,context){
    const {props,scopedSlots} = context
    // scopedSlots.default() : 渲染的是包裹下的文本 :
    return check(props.authority)?scopedSlots.default():null
  }
};
</script>
<style scoped lang=''>
</style>