import React from 'react';
import NavMenu from "./NavMenu";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../redux/store";
import {actionsAuthReducer, AuthinitialType,} from "../../redux/authReducer";

export type MapStatePropsType = {
    auth: AuthinitialType
}
export type MapDispatchPropsType = {
    setIsShowLogin: (toggle: boolean) => void
    setIsShowSignUp: (toggle: boolean) => void
}

const NavMenuContainer: React.FC<MapStatePropsType & MapDispatchPropsType> =
    ({auth, setIsShowLogin, setIsShowSignUp}) => {

        return (
            <NavMenu auth={auth}
                     setIsShowLogin={setIsShowLogin}
                     setIsShowSignUp={setIsShowSignUp}/>
        )
    }

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    auth: state.auth,
})

const Nav = compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>
    (mapStateToProps, {setIsShowLogin: actionsAuthReducer.setIsShowLogin,
        setIsShowSignUp: actionsAuthReducer.setIsShowSignUp}))(NavMenuContainer)

export default Nav
