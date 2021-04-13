import {AppStateType, InferActionsTypes} from "./store";
import {authApi, LoginFormDataType} from "../api/api";
import {ThunkAction} from "redux-thunk";


export type initialType = typeof initial
export type AuthReducerActionsTypes = InferActionsTypes<typeof actionsAuthReducer>
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, AuthReducerActionsTypes>

const SET_USER = '/SET_USER'
const LOG_OUT_USER = '/LOG_OUT_USER'
const SET_ACCESS_TOKEN = '/SET_ACCESS_TOKEN'


let initial = {
    id: null as null | number,
    email: null as null | string,
    username: null as null | string,
    isAuth: false,
    captcha: null as null | string,
    accessToken: null as null | string,
    refreshToken: null as null | string,
}

const authReducer = (state: initialType = initial, action: bookReducerActionsTypes): initialType => {
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
        default:
            return state
    }
}

export const actionsAuthReducer = {
    setAuthUser: (userData: getAuthMeType) => ({type: SET_USER, payload: {
        id: userData.data.id,
        email: userData.data.attributes.email,
        username: userData.data.attributes.username,
    }} as const),
    logout: () => ({type: LOG_OUT_USER} as const),
    setaccessToken: (token: string) => ({type: SET_ACCESS_TOKEN, token} as const)
}


export const loginThunk = (data: LoginFormDataType): ThunkType => {
    return async (dispatch) => {
        try {
            let response = await authApi.postCreateJWT(data)
            dispatch(actionsAuthReducer.setaccessToken(response.data.access))
            response = await authApi.getAuthMe(response.data.access)
            dispatch(actionsAuthReducer.setAuthUser(response))

        } catch (e) {
            console.error(e)
        }
    }
}



export default authReducer
