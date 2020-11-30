// 历史记录仓库
// 历史记录有添加, 更新, 删除, 清除全部
const MAX = 120;
export default {
    namespaced: true,

    state: () => ({
        data: []

    }),
    mutations: {
        /**
         * 添加历史记录
         * obj :
         * {
         *     type: "xs" | "ys" | "mh",   历史记录类别
         *     data: Object         添加的数据
         * }
         */
        addHistory(state, obj) {
            for(let i = 0; i<state.data.length;i++){
                // 如果类型相同并且url相同则判定为同一个
                if(obj.data.data.url === state.data[i].data.data.url && obj.type === state.data[i].type){
                    this.commit('history/removeHistory', i)
                    // state.data[i] = obj
                    // return
                    break
                }
            }
            if(state.data.length > MAX){
                state.data.shift()
            }
            state.data.unshift(obj)
        },
        removeHistory(state, index){
            state.data.splice(index,1)
        },
        clearHistory(state){
            state.data.length = 0
        }
    }
}
