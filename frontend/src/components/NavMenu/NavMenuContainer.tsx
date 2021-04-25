import React from 'react';
import NavMenu from "./NavMenu";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../redux/store";
import {AuthinitialType, } from "../../redux/authReducer";

export type MapStatePropsType = {
    auth: AuthinitialType
}
export type MapDispatchPropsType = {}

const NavMenuContainer: React.FC<MapStatePropsType & MapDispatchPropsType> =
    ({auth,}) => {

        return (
            <NavMenu auth={auth}/>
        )
    }

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    auth: state.auth,
})

const Nav = compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>
    (mapStateToProps, {}))(NavMenuContainer)

export default Nav
