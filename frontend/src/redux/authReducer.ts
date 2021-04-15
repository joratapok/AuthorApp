import {AppStateType, InferActionsTypes} from "./store";
import {authApi, getAuthMeType, LoginFormDataType} from "../api/api";
import {ThunkAction} from "redux-thunk";


export type AuthinitialType = typeof initial
export type AuthReducerActionsTypes = InferActionsTypes<typeof actionsAuthReducer>
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, AuthReducerActionsTypes>

const SET_USER = '/SET_USER'
const LOG_OUT_USER = '/LOG_OUT_USER'
const SET_ACCESS_TOKEN = '/SET_ACCESS_TOKEN'
const SET_REFRESH_TOKEN = '/SET_REFRESH_TOKEN'

let initial = {
    id: null as null | number,
    email: null as null | string,
    username: null as null | string,
    isAuth: false,
    accessToken: null as null | string,
    refreshToken: null as null | string,
}

const authReducer = (state: AuthinitialType = initial, action: AuthReducerActionsTypes): AuthinitialType => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            }
        case LOG_OUT_USER:
            return {
                ...initial,
            }
        case SET_ACCESS_TOKEN:
            return {
                  ...state,
                  accessToken: action.token
            }
        case SET_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: action.token
            }
        default:
            return state
    }
}

export const actionsAuthReducer = {
    setAuthUser: (userData: getAuthMeType) => ({type: SET_USER, payload: {
        id: userData.id,
        email: userData.email,
        username: userData.username,
    }} as const),
    logout: () => ({type: LOG_OUT_USER} as const),
    setAccessToken: (token: string) => ({type: SET_ACCESS_TOKEN, token} as const),
    setRefreshToken: (token: string) => ({type: SET_REFRESH_TOKEN, token} as const)
}

const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

export const loginThunk = (data: LoginFormDataType): ThunkType => {
    return async (dispatch) => {
            let response = await authApi.postCreateJWT(data)
            dispatch(actionsAuthReducer.setAccessToken(response.access))
            dispatch(actionsAuthReducer.setRefreshToken(response.refresh))
            saveToLocalStorage('access', response.access)
            saveToLocalStorage('refresh', response.refresh)
            let newresponse = await authApi.getAuthMe(response.access)
            dispatch(actionsAuthReducer.setAuthUser(newresponse))
    }
}

export const authMeThunk = (refreshToken: string): ThunkType => {
    return async (dispatch) => {
        let response = await authApi.postRefreshJWT(refreshToken)
        const userData = await authApi.getAuthMe(response.access)
        dispatch(loginThunk(userData))
    }
}

export const logoutThunk = (): ThunkType => {
    return async (dispatch) => {
        dispatch(actionsAuthReducer.logout())
    }
}

export default authReducer
