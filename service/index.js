const BASE_URL = "http://localhost:3000"

class XZRequest {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method: method,
        data: params,
        success:function(res){
          resolve(res.data)
        },
        fail: reject
      })
    })
   
  }
  get(url, params) {
    return this.request(url, "GET", params)
  }
  past(url, data) {
    return this.request(url, "POST", data)
  }
}

const xzRequest = new XZRequest()

export default xzRequest
