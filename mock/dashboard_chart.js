function chart(method){
  let res = null
  switch(method){
    case "GET":
      res = [20,40,78,100,98,24];
      break;
    default:
      res = null  
  }
  return res
}

module.exports = chart