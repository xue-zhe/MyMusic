// components/song-item-v1/index.js
Component({
   /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSongItemClick: function() {
      const id = this.properties.item.id
      //1.页面跳转
      wx.navigateTo({
        url: 'url',
      })

      //2.对歌曲的数据请求和其他操作
      
    }
  }
})