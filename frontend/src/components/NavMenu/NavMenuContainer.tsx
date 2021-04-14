import React from 'react';
import NavMenu from "./NavMenu";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../redux/store";
import {AuthinitialType, logoutThunk} from "../../redux/authReducer";

export type MapStatePropsType = {
    auth: AuthinitialType
}

export type MapDispatchPropsType = {
    logoutThunk: () => void
}

const NavMenuContainer: React.FC<MapStatePropsType & MapDispatchPropsType> =
    ({auth, logoutThunk,}) => {

        let logout = () => {
            logoutThunk()
        }

        return (
            <NavMenu auth={auth} logout={logout}/>
        )
    }

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    auth: state.auth,
})

const Nav = compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>
    (mapStateToProps, {logoutThunk}))(NavMenuContainer)

export default Nav
