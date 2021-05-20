import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../../../redux/store";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import {logoutThunk} from "../../../../redux/authReducer";

export type MapStatePropsType = {}
export type MapDispatchPropsType = {
    logoutThunk: () => void
}

const Logout: React.FC<MapStatePropsType & MapDispatchPropsType> = ({logoutThunk}) => {

    let logout = () => {
        logoutThunk()
    }

    return <ExitToAppRoundedIcon onClick={logout}/>
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({})

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>
    (mapStateToProps, {logoutThunk}))(Logout)