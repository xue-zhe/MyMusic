import xzRequest from './index'
export function getTopMV(offset, limit = 10) {
  return xzRequest.get("/top/mv", {
    offset,
    limit
  })
}
/**
 * 请求MV的播放地址
 * @param{number} id MV的id
 */
export function getMVURL(id) {
  return xzRequest.get("/mv/url", {
    id
  })
}

/**
 * 请求MV的详情
 * @param{number}id mv的id
 */
export function getMVDetail(mvid) {
  return xzRequest.get("/mv/detail", {
    mvid
  })
}

export function getRelatedVideo(id, offset) {
  return xzRequest.get("/related/allvideo", {
    id,
    offset
  })
}

export function getMVComment(id) {
  return xzRequest.get("/comment/mv", {
    id
  })
}