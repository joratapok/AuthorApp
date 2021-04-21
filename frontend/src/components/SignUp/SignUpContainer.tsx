import React from 'react';
import {connect} from "react-redux";
import {signUpThunk, } from "../../redux/authReducer";
import {SignUpFormDataType, } from "../../api/api";
import {AppStateType} from "../../redux/store";
import SignUp from "./SignUp"
import {Redirect} from "react-router-dom/";
import { FORM_ERROR } from 'final-form'

type MapsStatePorpsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {
    signUpThunk: (data: SignUpFormDataType) => void
}

type MapOwnPropsType = {}

type PropsType = MapsStatePorpsType & MapDispatchPropsType & MapOwnPropsType

const SignUpContainer: React.FC<PropsType> = ({signUpThunk, isAuth}) => {

    const onSubmit = async (data: SignUpFormDataType) => {
        try {
          await signUpThunk(data)
        } catch (e) {
          if (e.response.data.password) {
            return { ['password']: e.response.data.password }
          }
            return { [FORM_ERROR]: e.message }
        }
    }

    if (isAuth) {
        return <Redirect to={'/'}/>
    }

    return (
        <SignUp onSubmit={onSubmit}/>
    )
}

const mapStateToProps = (state: AppStateType): MapsStatePorpsType => ({
    isAuth: state.auth.isAuth,
})

export default connect<MapsStatePorpsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
(mapStateToProps, {signUpThunk})(SignUpContainer)
