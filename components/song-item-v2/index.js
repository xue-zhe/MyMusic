import { playerStore } from '../../store/index'

// components/song-item-v2/index.js
Component({
  properties: {
    index:{
      type: Number,
      value:0
    },
    item:{
      type:Object,
      value:{}
    }
  },
  
  data:{

  },

  methods:{
    handleSongItemClick:function(){
      const id = this.properties.item.id
      //1.页面跳转
      wx.navigateTo({
        url: '/pages/music-player/index?id=' + id,
      })
      //2.播放歌曲
      playerStore.dispatch("playMusicWithSongIdAction", {id})
    }
  }
})