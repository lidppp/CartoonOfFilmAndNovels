function requset(data){
	return uni.request({
	    url: 'https://bookapi.lidppp.com/api', 
	    data: {...data},
		method: "GET"
	});
}


// 搜索全部
export function searchAll(query) {
    let params = {name: query}
    return requset(params)
}

// 搜索影视
export function searchYs(query) {
    let params = {ysname: query}
    return requset(params)
}

// 影视详情
export function detailsYs(query) {
    let params = {ysurl: query}
    return requset(params)
}

// 搜索漫画
export function searchMh(query) {
    let params = {mhname: query}
    return requset(params)
}


// 漫画详情
export function detailsMh(query) {
    let params = {mhurl1: query}
    return requset(params)
}

// 漫画内容
export function contentMh(query) {
    let params = {mhurl2: query}
    return requset(params)
}

// 搜索小说
export function searchXs(query) {
    let params = {xsname: query}
    return requset(params)
}


// 小说详情
export function detailsXs(query) {
    let params = {xsurl1: query}
    return requset(params)
}

// 小说内容
export function contentXs(query) {
    let params = {xsurl2: query}
    return requset(params)
}

export default{
	searchAll,
	searchYs,
	detailsYs,
	searchMh,
	detailsMh,
	contentMh,
	searchXs,
	detailsXs,
	contentXs
}