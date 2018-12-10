const timeFn = (min, max=new Date()) => {
    if(!min || !max){
      return ''
    }
    let value = new Date(max).getTime() - new Date(min.replace(/-/g, "/")).getTime();
    // let value = new Date(max).getTime() - new Date(min).getTime();
    if (value >= 31104000000){
      return Math.floor(value / 31104000000) + '年前'
    } else if (value >= 2592000000){
      return Math.floor(value / 2592000000) + '个月前'
    } else if (value >= 86400000){
      return Math.floor(value / 86400000) + '日前'
    } else if (value >= 3600000){
      return Math.floor(value / 3600000) + '小时前'
    } else if (value >= 60000){
      return Math.floor(value / 60000) + '分钟前'
    } else if (value < 60000){
      return '刚刚'
    }
  }

  export default {
    timeFn,
  }