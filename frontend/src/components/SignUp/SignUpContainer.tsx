import React from 'react';
import {connect} from "react-redux";
import {signUpThunk,} from "../../redux/authReducer";
import {AppStateType} from "../../redux/store";
import SignUp from "./SignUp"
import {Redirect} from "react-router-dom/";
import { FORM_ERROR } from 'final-form'

export type SignUpFormDataType = {
    username: string
    email: string
    password: string
    re_password: string
}

type MapsStatePorpsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {
    signUpThunk: (data: SignUpFormDataType) => void
}

type MapOwnPropsType = {}

type PropsType = MapsStatePorpsType & MapDispatchPropsType & MapOwnPropsType

const SignUpContainer: React.FC<PropsType> = ({loginThunk, isAuth}) => {

    const onSubmit = async (data: SignUpFormDataType) => {
        try {
          await signUpThunk(data)
        } catch (e) {
            return { [FORM_ERROR]: e.message }
        }
    }

    if (isAuth) {
        return <Redirect to={'/'}/>
    }

    return (
        <SighUp onSubmit={onSubmit}/>
    )
}

const mapStateToProps = (state: AppStateType): MapsStatePorpsType => ({
    isAuth: state.auth.isAuth,
})

export default connect<MapsStatePorpsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
(mapStateToProps, {signUpThunk})(SignUpContainer)
