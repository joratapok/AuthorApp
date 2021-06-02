/* eslint-disable camelcase */
import { AppStateType, InferActionsTypes } from './store'
import { authApi, getAuthMeType, GoogleTokenResponseType, LoginFormDataType, SignUpFormDataType } from '../api/api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'

export type AuthinitialType = typeof initial
export type AuthReducerActionsTypes = InferActionsTypes<typeof actionsAuthReducer>
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, AuthReducerActionsTypes>

const SET_USER = '/SET_USER'
const LOG_OUT_USER = '/LOG_OUT_USER'
const SET_ACCESS_TOKEN = '/SET_ACCESS_TOKEN'
const SET_USER_AVATAR = '/SET_USER_AVATAR'
const SHOW_LOGIN_PAGE = '/SHOW_LOGIN_PAGE'
const SHOW_SIGNUP_PAGE = '/SHOW_SIGNUP_PAGE'

const initial = {
    id: 0,
    email: '',
    username: '',
    avatar: '',
    accessToken: '',
    isAuth: false,
    isShowLogin: false,
    isShowSignUp: false
}

const authReducer = (state: AuthinitialType = initial, action: AuthReducerActionsTypes): AuthinitialType => {
    switch (action.type) {
    case SET_USER:
        return {
            ...state,
            ...action.payload,
            isAuth: true
        }
    case LOG_OUT_USER:
        return {
            ...initial
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
    case SHOW_LOGIN_PAGE:
        return {
            ...state,
            isShowLogin: action.toggle
        }
    case SHOW_SIGNUP_PAGE:
        return {
            ...state,
            isShowSignUp: action.toggle
        }

    default:
        return state
    }
}

export const actionsAuthReducer = {
    setAuthUser: (userData: getAuthMeType) => ({
        type: SET_USER,
        payload: {
            id: userData.id,
            email: userData.email,
            username: userData.username
        }
    } as const),
    setAuthGoogleUser: (userData: GoogleTokenResponseType) => ({
        type: SET_USER,
        payload: {
            id: userData.user.pk,
            email: userData.user.email,
            username: userData.user.username
        }
    } as const),
    logout: () => ({ type: LOG_OUT_USER } as const),
    setAccessToken: (token: string) => ({ type: SET_ACCESS_TOKEN, token } as const),
    setUserAvatar: (photo: string) => ({ type: SET_USER_AVATAR, photo } as const),
    setIsShowLogin: (toggle: boolean) => ({ type: SHOW_LOGIN_PAGE, toggle } as const),
    setIsShowSignUp: (toggle: boolean) => ({ type: SHOW_SIGNUP_PAGE, toggle } as const)
}

const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

const saveTokens = (dispatch: Dispatch<AuthReducerActionsTypes>, access: string) => {
    dispatch(actionsAuthReducer.setAccessToken(access))
    saveToLocalStorage('access', access)
}

export const loginThunk = (data: LoginFormDataType): ThunkType => {
    return async (dispatch) => {
        const response = await authApi.postCreateJWT(data)
        saveTokens(dispatch, response.token)
        const userData = await authApi.getAuthMe(response.token)
        dispatch(actionsAuthReducer.setAuthUser(userData))
        const getAvatar = await authApi.getAvatar(response.token, userData.id)
        dispatch(actionsAuthReducer.setUserAvatar(getAvatar.photo))
    }
}

export const authMeThunk = (accessToken: string): ThunkType => {
    return async (dispatch) => {
        const response = await authApi.postRefreshJWT(accessToken)
        saveTokens(dispatch, response.token)
        const userData = await authApi.getAuthMe(response.token)
        dispatch(actionsAuthReducer.setAuthUser(userData))
        const getAvatar = await authApi.getAvatar(response.token, userData.id)
        dispatch(actionsAuthReducer.setUserAvatar(getAvatar.photo))
    }
}

export const logoutThunk = (): ThunkType => {
    return async (dispatch) => {
        dispatch(actionsAuthReducer.logout())
        saveToLocalStorage('access', '')
    }
}

export const signUpThunk = (data: SignUpFormDataType): ThunkType => {
    return async (dispatch) => {
        await authApi.postRegistrNewUser(data)
        await dispatch(loginThunk(data))
    }
}

export const changeAvatarThunk = (JWTToken: string, userId: number, photo: any): ThunkType => {
    return async (dispatch) => {
        try {
            const getAvatar = await authApi.patchAvatar(JWTToken, userId, photo)
            dispatch(actionsAuthReducer.setUserAvatar(getAvatar.photo))
        } catch (e) {
            console.error(e)
        }
    }
}

export const loginWithGoogleThunk = (google_token: string): ThunkType => {
    return async (dispatch) => {
        try {
            const response = await authApi.postGoogleToken(google_token)
            saveTokens(dispatch, response.token)
            dispatch(actionsAuthReducer.setAuthGoogleUser(response))
            const getAvatar = await authApi.getAvatar(response.token, response.user.pk)
            dispatch(actionsAuthReducer.setUserAvatar(getAvatar.photo))
        } catch (e) {
            console.error(e)
        }
    }
}

export default authReducer
