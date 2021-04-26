import React from 'react';
import {connect} from "react-redux";
import {loginThunk,} from "../../redux/authReducer";
import {AppStateType} from "../../redux/store";
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

type MapOwnPropsType = {}

type PropsType = MapsStatePorpsType & MapDispatchPropsType & MapOwnPropsType

const LoginContainer: React.FC<PropsType> = ({loginThunk, isAuth}) => {

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
        return <Redirect to={'/'}/>
    }

    return (
        <Login onSubmit={onSubmit}/>
    )
}

const mapStateToProps = (state: AppStateType): MapsStatePorpsType => ({
    isAuth: state.auth.isAuth,
})

export default connect<MapsStatePorpsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
(mapStateToProps, {loginThunk})(LoginContainer)
