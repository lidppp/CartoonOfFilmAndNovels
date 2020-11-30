import loading from "./d-loading"
import {createApp} from "vue"

function loadingFn() {
    let div = document.createElement("div")
    document.querySelector("body").appendChild(div);
    let loadingEl = createApp(loading, {parentdom: div})
    let loadingVm = loadingEl.mount(div)
    loadingVm.init();
    return {
        close: () => {
            loadingEl.unmount(div)
            loadingVm.hidden();
        },
        err: loadingVm.errFn
    };
}

export default {
    install: (app) => {
        app.config.globalProperties.$loading = loadingFn
    }
}
