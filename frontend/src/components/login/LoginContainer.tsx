import React from 'react';
import {connect} from "react-redux";
import {loginThunk,} from "../../redux/authReducer";
import {AppStateType} from "../../redux/store";
import Login from "./Login"

export type LoginFormDataType = {
    username: string
    password: string
}

type MapsStatePorpsType = {
}

type MapDispatchPropsType = {
    loginThunk: (data: LoginFormDataType) => void
}

type MapOwnPropsType = {}

type PropsType = MapsStatePorpsType & MapDispatchPropsType & MapOwnPropsType

const LoginContainer: React.FC<PropsType> = ({loginThunk,}) => {

    const onSubmit = (data: LoginFormDataType) => {
        loginThunk(data)
    }

    return (
        <Login onSubmit={onSubmit}/>
    )

}

const mapStateToProps = (state: AppStateType): MapsStatePorpsType => ({
})

export default connect<MapsStatePorpsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
(mapStateToProps, {loginThunk})(LoginContainer)
