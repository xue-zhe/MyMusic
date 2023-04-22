import xzRequest from "./index"

export function getSearchHot() {
  return xzRequest.get("/search/hot")
}

export function getSearchSuggest (keywords) {
  return xzRequest.get("/search/suggest", {
    keywords,
    type: "mobile"
  })
}

export function getSearchResult(keywords) {
  return xzRequest.get("/search",{
    keywords
  })
}