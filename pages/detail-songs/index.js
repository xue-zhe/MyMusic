// pages/detail-songs/index.js
import { getSongMenuDatail,getRankings } from '../../service/api_music'
import { rankingStore, playerStore} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    ranking:"",
    songInfo:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id, options.type)
    const type = options.type
    this.setData({type})
    if(type === "menu") {
      const id = options.id
      getRankings(id).then(res =>{
        this.setData({ songInfo: res.playlist})
      })
    } else if(type === "rank"){
      const ranking = options.ranking
      this.setData({ranking})

      //1.获取数据
      rankingStore.onState(ranking, this.getRankingDataHamlder)
    }

    },

    handleSongItemClick: function(event){
      const index = event.currentTarget.dataset.index    
      playerStore.setState("playListSongs", this.data.songInfo.tracks)
      playerStore.setState("playListIndex", index)
   },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    if(this.data.ranking) {
      rankingStore.offState(this.data.ranking, this.getRankingDataHamlder)
    }
  },

  getRankingDataHamlder:function(res) {
    this.setData({ songInfo: res})
  },

 
})