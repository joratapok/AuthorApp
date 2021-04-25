import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../../../redux/store";
import {AuthinitialType, changeAvatarThunk} from "../../../../redux/authReducer";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export type MapStatePropsType = {
    auth: AuthinitialType
}
export type MapDispatchPropsType = {
    changeAvatarThunk: (JWTToken: string, userId: number, photo: any) => void
}

const ChangeUser: React.FC<MapStatePropsType & MapDispatchPropsType> = ({auth, changeAvatarThunk}) => {

    let photoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            changeAvatarThunk(auth.accessToken, auth.id, e.target.files[0])
        }
    }

    return <>
        <input id={"inputAvatar"} type={'file'} hidden={true} onChange={photoSelected}/>
        <label htmlFor={"inputAvatar"}>
            <AccountCircleIcon />
        </label>
    </>
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    auth: state.auth,
})

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>
    (mapStateToProps, {changeAvatarThunk}))(ChangeUser)