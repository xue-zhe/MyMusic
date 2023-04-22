import { HYEventStore } from 'hy-event-store'
import { getRankings } from '../service/api_music'

const rankingMap = {0: "newRanking", 1:"hotRanking", 2: "originRanking", 3:"upRanking"}

const rankingStore = new HYEventStore({
  state: {
    newRanking: {}, //0: 新歌
    hotRanking: {}, //1: 热门
    originRanking: {}, //2: 原创
    upRanking: {}, //3: 飙升榜
  },
  actions: {
    getRankingDataAction(ctx){
     
      //0:新歌榜 1：热门榜 2：原创榜 3：飙升榜
      for (let index = 0; index < 4; index++) {
        if(index === 0 ){
          getRankings(3779629).then(res=>{
            const rankingName = rankingMap[index]
            ctx[rankingName] = res.playlist
          })
        }
        if(index === 1 ){
          getRankings(3778678).then(res=>{
            const rankingName = rankingMap[index]
            ctx[rankingName] = res.playlist
          })
        }
        if(index === 2 ){
          getRankings(2884035).then(res=>{
            const rankingName = rankingMap[index]
            ctx[rankingName] = res.playlist
          })
        }
        if(index === 3 ){
          getRankings(19723756).then(res=>{
            const rankingName = rankingMap[index]
            ctx[rankingName] = res.playlist
          })
        }
      }
    }
  }
})
export {
  rankingMap,
  rankingStore
}