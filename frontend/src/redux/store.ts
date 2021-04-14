import {applyMiddleware, combineReducers, createStore} from "redux";
import bookReducer from "./bookReducer";
import thunkMiddleware from "redux-thunk"

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never

const rootReducer = combineReducers( {
    books: bookReducer})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.__store__ = store

export default store
