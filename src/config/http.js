wx.setStorageSync('asd', 'https://api.rinlink.com');

class Http { 
    constructor(obj){
        this.baseUrl = obj.n
        this.responseFun = obj.responseFun
        this.requestFun = obj.requestFun 
        this.header = obj.header || {}
     }
    // 响应拦截器
    response (res) {
     //console.log('响应拦截器', res);
     if(this.responseFun){
      return this.responseFun(res)
     }
     return res
   }
 
    // 请求拦截器
    request (req) {
     //console.log('请求拦截器', req);
     if(this.requestFun){
       return this.requestFun(req)
     }
     return req
   }
 
   send(req={}){
      let that = this
      let url = req.url || ''
      let data = req.data || {}
      let method = req.method || 'POST'
      let header = req.header || {}
      header = {...that.header,...req.header}
      let complete = req.complete || null
      req = {url,data,method,header,complete}
    
      
      let r = this.request(req)
      if(r){
        req={...req,...r}
       }
      return new Promise((resolve, reject) => {
         wx.request({
           url: `${that.baseUrl()}${req.url}`,
           data:req.data,
           header: req.header,
           method:req.method,
           dataType: 'json',
           success: res => {
             // 拦截 响应
             res= this.response(res);
             // 成功
             if(res.ERROR){
               reject(res);
             }else{
               resolve(res);
             }
             
           },
           fail: res => {
             // 失败
             res= this.response(res);
             reject(res);
           },
           complete: res=>{
             res.complete&&res.complete()
           },
         })
      })
   }
 }
 
 let methodsList = ['get','post','put','delete']
 
 methodsList.forEach(i=>{
   Http.prototype[i] = function (url='',data){
      let method = i.toLocaleUpperCase()
      let req = {method,url,data}
      return this.send(req)
   }
 })
 
 
 export default Http