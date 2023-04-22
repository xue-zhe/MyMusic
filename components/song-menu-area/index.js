// components/song-menu-area/index.js
import { playerStore } from '../../store/index'
const app = getApp()
Component({
  properties: {
    title:{
      type: String,
      value:"默认歌单"
    },
    songMenu: {
      type: Array,
      value:[]
    }
  },
  data:{
    screenWidth: app.globalData.screenWidth 
  },
  methods:{
    handleMenuItemClick: function(event) {
      const id = event.currentTarget.dataset.item.id
      console.log(id)
       //1.页面跳转
       wx.navigateTo({
        url: `/pages/detail-songs/index?type=menu&id= `+ id,
      })
    }
  }
})