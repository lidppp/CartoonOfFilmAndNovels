// 收藏
// 收藏只有添加和删除, 没有更新的情况
export default {
    namespaced: true,

    state: () => ({
       data: {}
    }),
    mutations: {
        /**
         * obj :
         * {
         *     isRemove: Boolean,           是否删除
         *     type: "xs" | "ys" | "mh",    收藏类别
         *     key: String,                 添加/删除的键名
         *     data: Object                 添加的数据 (如果为删除则没有此数据)
         * }
         */
        setData(state,obj){
            // 添加的情况
            if(!obj.isRemove){
                state.data[obj.key] = {data:obj.data,type:obj.type}
            }else{
                // 删除的情况
                state.data[obj.key] && state.data[obj.key].type === obj.type && delete state.data[obj.key]
            }
        }
    }
}
