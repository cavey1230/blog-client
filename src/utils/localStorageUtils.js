/*!
 *
 * 功能：储存 LocalStorage数据 SessionStorage数据
 *
 */

import store from "store";

const saveLocalStore = (data,storeName="user_data", session = "localStorage") => {
    if (session === "localStorage") {
        store.set(storeName, data)
    } else if (session === "session") {
        sessionStorage.setItem(storeName, data);
    }
}

const getLocalStore = (storeName="user_data",session = "localStorage") => {
    if (session === "localStorage") {
        return store.get(storeName)
    } else if (session === "session") {
        return  sessionStorage.getItem(storeName)
    }

}

const removeLocalStore = () => {
    store.remove("user_data")
}

export {saveLocalStore, getLocalStore, removeLocalStore}