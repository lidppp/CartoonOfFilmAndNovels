import { createStore } from 'vuex'
import VuexPersistence from "vuex-persist";
import collection from "./collection";
import xsStyle from "./xsStyle";
import history from "./history";
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  modules: {
    collection,
    xsStyle,
    history
  },
  plugins:[vuexLocal.plugin]
})
