import xzRequest from './index'

export function getSongDetail(ids) {
  return xzRequest.get("/song/detail", {
    ids
  })
}

export function getSongLyric(id) {
  return xzRequest.get("/lyric", {
    id
  })
}