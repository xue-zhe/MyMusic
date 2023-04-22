// pages/home-video/index.js
import { getTopMV } from '../../service/api_video'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    /*
    wx.request({
      url: 'http://localhost:3000/top/mv?limit=10',
      method:"GET",
      success:function( res ) {
        console.log(res.data.data)
      }
    })*/
    /*
    const res = await getTopMV(0)
    this.setData({topMVs: res.data})*/

    this.getTopMVData(0)

  },
  //封装一个网络请求的方法
  getTopMVData:async function(offset) {
    //判断是否可以进去请求
    if(!this.data.hasMore) return

    //展示加载动画
    wx.showNavigationBarLoading()

    //请求真正的数据
    const res = await getTopMV(offset)
    let newData = this.data.topMVs
    if(offset === 0) {
      newData = res.data
    } else {
      newData = newData.concat(res.data)
    }

    //设置数据
    this.setData({ topMVs: newData})
    this.setData({ hasMore: res.hasMore})
    wx.hideNavigationBarLoading()
    if(offset === 0){
      wx.stopPullDownRefresh()
    }
  },

  //封装事件处理方法
  handleVideoItemClick: function(evet) {
    //获取id 
    const id = evet.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`,
    })
  },
//其他生命函数回调函数
onPullDownRefresh: async function(){
  this.getTopMVData(0)
},


onReachBottom: async function() {
  /*
  const res = await getTopMV(this.data.topMVs.length)
  this.setData({ topMVs: this.data.topMVs.concat(res.data) })
  this.setData({ hasMore: res.hasMore })
  */
  this.getTopMVData(this.data.topMVs.length)
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
  }
})