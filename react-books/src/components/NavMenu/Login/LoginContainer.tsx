/* eslint-disable camelcase */
import React from 'react'
import { connect } from 'react-redux'
import { actionsAuthReducer, AuthinitialType, loginThunk, loginWithGoogleThunk } from '../../../redux/authReducer'
import { AppStateType } from '../../../redux/store'
import Login from './Login'
import { FORM_ERROR } from 'final-form'

export type LoginFormDataType = {
    username: string
    password: string
}

type MapsStatePorpsType = {
    auth: AuthinitialType
}

type MapDispatchPropsType = {
    loginThunk: (data: LoginFormDataType) => void
    loginWithGoogleThunk: (google_token: string) => void
    setIsShowLogin: (toggle: boolean) => void
}

type MapOwnPropsType = {
}

type PropsType = MapsStatePorpsType & MapDispatchPropsType & MapOwnPropsType

const LoginContainer: React.FC<PropsType> = ({
    auth, loginThunk,
    loginWithGoogleThunk, setIsShowLogin
}) => {
    const onSubmit = async (data: LoginFormDataType) => {
        try {
            await loginThunk(data)
        } catch (e) {
            if (e.response.status && e.response.status === 401) {
                return { [FORM_ERROR]: 'Неверный логин или пароль' }
            } else {
                return { [FORM_ERROR]: e.message }
            }
        }
    }

    if (auth.isAuth && auth.isShowLogin) {
        setIsShowLogin(false)
    }

    return (
        <Login onSubmit={onSubmit}
            auth={auth}
            loginWithGoogleThunk={loginWithGoogleThunk}
            setIsShowLogin={setIsShowLogin}/>
    )
}

const mapStateToProps = (state: AppStateType): MapsStatePorpsType => ({
    auth: state.auth
})

export default connect<MapsStatePorpsType, MapDispatchPropsType,
    MapOwnPropsType, AppStateType>(mapStateToProps, {
        loginThunk,
        loginWithGoogleThunk,
        setIsShowLogin: actionsAuthReducer.setIsShowLogin
    })(LoginContainer)
