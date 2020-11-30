import axios from "@/require/require";
import axiosBase from "axios"

// 首页搜索
export function searchIndex() {
    return new Promise((resolve, reject) => {
        axiosBase.all([searchYs(""), searchMh("hot"), searchXs("遮天")])
            .then(axiosBase.spread(function (ys, mh, xs) {
                resolve({
                    mhlist: mh,
                    yslist: ys,
                    xslist: xs,
                })
            })).catch((err) => reject(err))
    })
}
// 搜索全部
export function searchAll(query) {
    let params = {name: query}
    return axios({
        params
    })
}

// 搜索影视
export function searchYs(query) {
    let params = {ysname: query}
    return axios({
        params
    })
}

// 影视详情
export function detailsYs(query) {
    let params = {ysurl: query}
    return axios({
        params
    })
}

// 搜索漫画
export function searchMh(query) {
    let params = {mhname: query}
    return axios({
        params
    })
}


// 漫画详情
export function detailsMh(query) {
    let params = {mhurl1: query}
    return axios({
        params
    })
}

// 漫画内容
export function contentMh(query) {
    let params = {mhurl2: query}
    return axios({
        params
    })
}

// 搜索小说
export function searchXs(query) {
    let params = {xsname: query}
    return axios({
        params
    })
}


// 小说详情
export function detailsXs(query) {
    let params = {xsurl1: query}
    return axios({
        params
    })
}

// 小说内容
export function contentXs(query) {
    let params = {xsurl2: query}
    return axios({
        params
    })
}