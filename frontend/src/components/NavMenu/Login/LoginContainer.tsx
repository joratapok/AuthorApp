import React from 'react';
import {connect} from "react-redux";
import {loginThunk,} from "../../../redux/authReducer";
import {AppStateType} from "../../../redux/store";
import Login from "./Login"
import {Redirect} from "react-router-dom/";
import { FORM_ERROR } from 'final-form'

export type LoginFormDataType = {
    username: string
    password: string
}

type MapsStatePorpsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {
    loginThunk: (data: LoginFormDataType) => void
}

type MapOwnPropsType = {
    loginModal: boolean
    closeLoginModal: () => void
}

type PropsType = MapsStatePorpsType & MapDispatchPropsType & MapOwnPropsType

const LoginContainer: React.FC<PropsType> = ({loginThunk, isAuth, loginModal, closeLoginModal}) => {

    const onSubmit = async (data: LoginFormDataType) => {
        try {
          await loginThunk(data)
        } catch (e) {
            if (e.response.status && e.response.status == 401) {
                return { [FORM_ERROR]: 'Неверный логин или пароль' }
            } else {
                return { [FORM_ERROR]: e.message }
            }
        }
    }

    if (isAuth) {
        closeLoginModal()
    }

    return (
        <Login onSubmit={onSubmit} loginModal={loginModal} closeLoginModal={closeLoginModal}/>
    )
}

const mapStateToProps = (state: AppStateType): MapsStatePorpsType => ({
    isAuth: state.auth.isAuth,
})

export default connect<MapsStatePorpsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
(mapStateToProps, {loginThunk})(LoginContainer)
