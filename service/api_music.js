import xzRequest from "./index"

export function getBanners() {
  return xzRequest.get("/banner", {
    type:2
  })
}

export function getRankings(id) {
  return xzRequest.get("/playlist/detail", {
    id
  })
}

//cat -> category 类别
export function getSongMenu(cat = "全部", order = "hot" ,limit = 6, offset = 0 ){
 
  return xzRequest.get("/top/playlist", {
    order,
    cat,
    limit,
    offset
  })
}

export function getSongMenuDatail(id) {
  return xzRequest.get("/playlist/detail/dynamic", {
    id
  })
}


