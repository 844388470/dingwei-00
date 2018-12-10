const request = function (option) {
    const token = wx.getStorageSync("token") || null;
    return new Promise((resolve, reject)=>{
      wx.showNavigationBarLoading()
      wx.request({
        url: option.url,
        data: option.data,
        method: option.method,
        header: {
          "jwt": token,
          ...option.header
        },
        success: function (res) {
          wx.hideNavigationBarLoading()
          if (res.statusCode === 200) {
            resolve(res.data);
          } else if (res.data.message) {
            wx.showToast({ title: res.data.message, icon: 'none', duration: 2000 })
            reject(res.data.message)
          } else {
            wx.showToast({ title: '请求服务器错误' + res.data, icon: 'none', duration: 2000 })
            reject(res.data.message)
          }
        },
        fail: function (err) {
          wx.hideNavigationBarLoading()
          wx.showToast({ title: '请求服务器错误' + err, icon: 'none', duration: 2000 })
          reject(err)
        }
      })
    });
  }
  export default request;