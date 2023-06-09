// pages/detail-search/index.js
import { getSearchHot, getSearchSuggest ,getSearchResult  } from '../../service/api_search'
import debounce from '../../utils/debounce'
import stringToNodes from '../../utils/stringToNodes'

const debounceGetSearchSuggest = debounce(getSearchSuggest, 300)

Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: {
      hotKeyWords: [],
      suggestSongs: [],
      suggestSongsNodes: [],
      resultSongs: [],
      searchValue: ""

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //1.获取页面数据
    this.getPageData()
  },

  //网络请求
 getPageData: function() {
    getSearchHot().then(res =>{
      this.setData({ hotKeyWords: res.result.hots})
    })
  },
  //事件处理
  handleSearchChange: function(event) {
    //1.获取输入的关键字
    const searchValue = event.detail

    //2.保存关键字
    this.setData({ searchValue })

    //3.判断关键字为空字符的逻辑处理
    if(!searchValue.length) {
      this.setData({ suggestSongs:[], resultSongs:[] })
      debounceGetSearchSuggest.cancel()
      return
    }

    //4.根据关键字进行搜索
    debounceGetSearchSuggest(searchValue).then(res => {
      //1.获取建议的关键字歌曲
      const suggestSongs = res.result.allMatch
      this.setData({ suggestSongs })
      if(!suggestSongs) return

      //2.转换node节点
      const suggestKeywords = suggestSongs.map(item => item.keyword)
      const suggestSongsNodes =[]
      for (const keyword of  suggestKeywords) {
        const nodes = stringToNodes(keyword, searchValue)
        suggestSongsNodes.push(nodes)
      }
      this.setData({ suggestSongsNodes })
    })
  },

  handleSearchAction() {
    //保存一下searchValue
    const searchValue = this.data.searchValue
    getSearchResult(searchValue).then(res =>{
      this.setData({ resultSongs: res.result.songs})
    })
  },
  
  handleKeywordItemClick: function( event ) {
    //1.获取点击的文字
    const keyword = event.currentTarget.dataset.keyword

    //2.将关键设置到searchValue中
    this.setData({ searchValue:keyword })

    //发送网络请求
    this.handleSearchAction()
  },
  
  onUnload() {

  },
})