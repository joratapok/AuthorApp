import React from 'react';
import {connect} from "react-redux";
import {actionsAuthReducer, AuthinitialType, loginWithGoogleThunk, signUpThunk,} from "../../../redux/authReducer";
import {SignUpFormDataType,} from "../../../api/api";
import {AppStateType} from "../../../redux/store";
import SignUp from "./SignUp"
import {FORM_ERROR} from 'final-form'

type MapsStatePorpsType = {
    auth: AuthinitialType
}

type MapDispatchPropsType = {
    signUpThunk: (data: SignUpFormDataType) => void
    loginWithGoogleThunk: (google_token: string) => void
    setIsShowSignUp: (toggle: boolean) => void
}

type MapOwnPropsType = {
}

type PropsType = MapsStatePorpsType & MapDispatchPropsType & MapOwnPropsType

const SignUpContainer: React.FC<PropsType> = ({signUpThunk, auth, loginWithGoogleThunk, setIsShowSignUp}) => {

    const onSubmit = async (data: SignUpFormDataType) => {
        try {
            await signUpThunk(data)
        } catch (e) {
            if (e.response.data.password) {
                return {['password']: e.response.data.password}
            }
            if (e.response.data.email) {
                return {['email']: e.response.data.email}
            }
            if (e.response.data) {
                let errorField = {[FORM_ERROR]: ''}
                for (let i in e.response.data) {
                    errorField[FORM_ERROR] = e.response.data[i]
                    break
                }
                return errorField
            }
            return {[FORM_ERROR]: e.message}
        }
    }

    if (auth.isAuth && auth.isShowSignUp) {
        setIsShowSignUp(false)
    }

    return (
        <SignUp onSubmit={onSubmit}
                auth={auth}
                setIsShowSignUp={setIsShowSignUp}
                loginWithGoogleThunk={loginWithGoogleThunk}
        />
    )
}

const mapStateToProps = (state: AppStateType): MapsStatePorpsType => ({
    auth: state.auth,
})

export default connect<MapsStatePorpsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>
(mapStateToProps, {signUpThunk, loginWithGoogleThunk,
    setIsShowSignUp: actionsAuthReducer.setIsShowSignUp})(SignUpContainer)
