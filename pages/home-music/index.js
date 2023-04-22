// pages/home-music/index.js
import { getBanners, getSongMenu } from '../../service/api_music'
import { rankingStore, rankingMap, playerStore } from '../../store/index'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'
const throttleQueryRect = throttle(queryRect, 1000, { trailing: true }) //trailing开启结束时触发
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight: 0,
    banners: [],
    hotSongMenu: [],
    recommendSongMenu:[],
    recommendSongs:[],
    rankings:{0:{}, 2:{}, 3:{}},

    currentSong:{},
    isPlaying:false,
    playAnimState:"paused"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取页面数据
    this.getPageDate()
    //发起共享数据
    rankingStore.dispatch("getRankingDataAction")
    //从store获取共享数据
    this.setupPlayerStoreListener()
  },

  //网络请求
  getPageDate: function(){
    getBanners().then(res => {
      this.setData({ banners: res.banners})
    })
    getSongMenu().then(res => {
      this.setData({ recommendSongMenu: res.playlists })
    })
    getSongMenu("华语").then(res => {
     
      this.setData({ hotSongMenu: res.playlists })
    })
  },

  //事件处理函数
  handleSearchClick:function() {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },

  handleSwiperImageLoaded: function() {
    //获取图片的高度
    //使用了节流函数，减少频繁触发
    throttleQueryRect('.swiper-image').then(res => {
      const ract = res[0]
      console.log(ract.height)
      this.setData({swiperHeight: ract.height})
    })
  },
  handleSwiperPlaying: function(event){
    console.log(event)
  },



  handleMoreClick: function(){
    this.navigateToDetailSongsPage("hotRanking")
  },
  handleRankingItemClick: function(event) {
    const idx = event.currentTarget.dataset.index
    const rankingName = rankingMap[idx]
    this.navigateToDetailSongsPage(rankingName)
  },

  handlePlayBtnClick: function(){
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },

  navigateToDetailSongsPage: function(rankingName){
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${rankingName}&type=rank`,
    })
  },

  handleSongItemClick:function(){
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },

  handlePlayBarClick: function() {
    wx.navigateTo({
      url: '/pages/music-player/index?id=' + this.data.currentSong.id,
    })
  },
  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  },
  //进行事件监听
  setupPlayerStoreListener: function(){
    //1.排行榜监听
    rankingStore.onState("hotRanking", (res) => {
      if(!res.tracks) return
      const recommendSongs = res.tracks.slice(0, 6)
      this.setData({recommendSongs})
    })
    rankingStore.onState("newRanking", this.getRankingHandler(0))
    rankingStore.onState("originRanking", this.getRankingHandler(2))
    rankingStore.onState("upRanking", this.getRankingHandler(3))

    
    // 2.播放器监听
    playerStore.onStates(["currentSong", "isPlaying"], ({currentSong, isPlaying}) => {
      console.log(currentSong)
      if (currentSong) this.setData({ currentSong })
      if (isPlaying !== undefined) {
        this.setData({ 
          isPlaying, 
          playAnimState: isPlaying ? "running": "paused" 
        })
      }
    })
  },

  getRankingHandler: function(idx) {
    return (res) => {
      if (Object.keys(res).length === 0) return

      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const songList = res.tracks.slice(0, 3)
      const rankingObj = {name, coverImgUrl, playCount, songList}
      const newRankings = { ...this.data.rankings, [idx]: rankingObj}
      this.setData({ 
        rankings: newRankings
      })
    }
  },
})