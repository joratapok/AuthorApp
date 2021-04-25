import {AppStateType, InferActionsTypes} from "./store";
import {authApi, getAuthMeType, LoginFormDataType, SignUpFormDataType} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";


export type AuthinitialType = typeof initial
export type AuthReducerActionsTypes = InferActionsTypes<typeof actionsAuthReducer>
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, AuthReducerActionsTypes>

const SET_USER = '/SET_USER'
const LOG_OUT_USER = '/LOG_OUT_USER'
const SET_ACCESS_TOKEN = '/SET_ACCESS_TOKEN'
const SET_REFRESH_TOKEN = '/SET_REFRESH_TOKEN'
const SET_USER_AVATAR = '/SET_USER_AVATAR'

let initial = {
    id: 0,
    email: '',
    username: '',
    avatar: '',
    isAuth: false,
    accessToken: '',
    refreshToken: '',
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
        case SET_USER_AVATAR:
            return {
                ...state,
                avatar: action.photo
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
    setAuthUser: (userData: getAuthMeType) => ({
        type: SET_USER, payload: {
            id: userData.id,
            email: userData.email,
            username: userData.username,
        }
    } as const),
    logout: () => ({type: LOG_OUT_USER} as const),
    setAccessToken: (token: string) => ({type: SET_ACCESS_TOKEN, token} as const),
    setRefreshToken: (token: string) => ({type: SET_REFRESH_TOKEN, token} as const),
    setUserAvatar: (photo: string) => ({type: SET_USER_AVATAR, photo} as const)
}

const saveTokens = (dispatch: Dispatch<AuthReducerActionsTypes>, access: string, refresh: string) => {
    dispatch(actionsAuthReducer.setAccessToken(access))
    dispatch(actionsAuthReducer.setRefreshToken(refresh))
    saveToLocalStorage('access', access)
    saveToLocalStorage('refresh', refresh)
}

const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

export const loginThunk = (data: LoginFormDataType): ThunkType => {
    return async (dispatch) => {
        let response = await authApi.postCreateJWT(data)
        saveTokens(dispatch, response.access, response.refresh)
        let userData = await authApi.getAuthMe(response.access)
        dispatch(actionsAuthReducer.setAuthUser(userData))
        let getAvatar = await authApi.getAvatar(response.access, userData.id)
        dispatch(actionsAuthReducer.setUserAvatar(getAvatar.photo))
    }
}

export const authMeThunk = (refreshToken: string): ThunkType => {
    return async (dispatch) => {
        let response = await authApi.postRefreshJWT(refreshToken)
        saveTokens(dispatch, response.access, response.refresh)
        const userData = await authApi.getAuthMe(response.access)
        dispatch(actionsAuthReducer.setAuthUser(userData))
        let getAvatar = await authApi.getAvatar(response.access, userData.id)
        dispatch(actionsAuthReducer.setUserAvatar(getAvatar.photo))
    }
}

export const logoutThunk = (): ThunkType => {
    return async (dispatch) => {
        dispatch(actionsAuthReducer.logout())
        saveToLocalStorage('access', '')
        saveToLocalStorage('refresh', '')
    }
}

export const signUpThunk = (data: SignUpFormDataType): ThunkType => {
    return async (dispatch) => {
        let response = await authApi.postRegistrNewUser(data)

    }
}

export const changeAvatarThunk = (JWTToken: string, userId: number, photo: any): ThunkType => {
    return async (dispatch) => {
        try {
            let getAvatar = await authApi.patchAvatar(JWTToken, userId, photo)
            dispatch(actionsAuthReducer.setUserAvatar(getAvatar.photo))
        } catch (e) {
            console.error(e)
        }
    }
}

export default authReducer
