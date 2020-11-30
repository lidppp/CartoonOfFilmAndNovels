// 小说观看样式
export default {
    namespaced: true,

    state: () => ({
        fontSize: 18,
        bacColor: "#ffffff",
        fontColor: "#000000",
    }),
    mutations: {
        changeFontSize(state, num) {
            state.fontSize = num
        },
        changeBacColor(state, num) {
            state.bacColor = num
        },
        changeFontColor(state, num) {
            state.fontColor = num
        },
        resetAll(state) {
            state.fontSize = 18
            state.bacColor = "#ffffff"
            state.fontColor = "#000000"
        }
    },
    actions: {
        addNum(context) {
            context.commit("addNum")
        }
    }
}
