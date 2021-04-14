import React from 'react';
import {connect} from "react-redux";
import {loginThunk,} from "../../redux/authReducer";
import {AppStateType} from "../../redux/store";
import Login from "./Login"
import {Redirect} from "react-router-dom/";

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

    const onSubmit = (data: LoginFormDataType) => {
        loginThunk(data)
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
