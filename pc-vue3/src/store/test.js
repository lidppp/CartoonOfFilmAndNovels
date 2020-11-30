export default {
    namespaced: true,

    state: () => ({
        num:0
    }),
    mutations: {
        addNum(state){
           state.num++
        }
    },
    actions: {
        addNum(context){
            context.commit("addNum")
        }
    }
}
