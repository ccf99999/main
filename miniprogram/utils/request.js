// 基础的url
const URI = {
  baseURL:"http://dida100.com"
}
// {name:"mumu",age:18} => name=mumu&age=18
function tansParams(obj){
  var  str = "";
  for(var k in obj){
    str+=k+"="+obj[k]+"&";
  }
  //移除最后一个&
  return str.slice(0,-1);
}
function request(option){
  debugger
  console.log('option',option)
  var url = option.url;
  debugger
  // 01 可以添加baseURL
  // 是不是以http开头的，是用url不是加上baseURL
  url = url.startsWith("http")?url:URI.baseURL+url;
  // 选项里面有params（get传入的参数）
  if(option.params){
    // 如果有参数，把参数转换为url编码形式加入
    url+="?"+tansParams(option.params);
  }

  // 02 可以添加请求头
  var  header = option.header||{};
  header.Authorization ="Bearer "+wx.getStorageSync('token');

  // 03 可以添加加载提示
  if(option.loading){
    wx.showToast({
      title: option.loading.title,
      icon:option.loading.icon,
    })
  }
  // 返回一个promise
  return new Promise((resolve,reject)=>{
      wx.request({
        // 请求的地址如果一http开头直接用url不是http开头添加我们 baseUrL
        url: url,
        method:option.method||"GET",//请求的方法 默认get
        data:option.data, //post出入的参数
        header,
        success(res){
          // 请求成功
          resolve(res.data);
        },
        fail(err){
          // 04 对错误进行处理
          wx.showToast({title:"加载失败",icon:"none"})
          // 请求失败
          reject(err);
        },
        complete(){
          // 关闭加载提示
          wx.hideToast();
        }
      })
  })
} 
// 定义get简易方法
request.get= (url,config)=>{
  return request({url,method:"get",...config})
}
// 定义post简易方法
request.post= (url,data,config)=>{
  return request({url,method:"post",data,...config})
}
// 导入request
module.exports={request}
// module.exports.sayHello = sayHello
