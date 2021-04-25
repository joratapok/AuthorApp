import React from 'react';
import c from './NavMenu.module.css'
import {AuthinitialType} from "../../redux/authReducer";
import UserAvatar from "./UserBlock/UserBlock";

type NavMenuPropsType = {
    auth: AuthinitialType
}

const NavMenu: React.FC<NavMenuPropsType> =
    ({auth,}) => {

        return (
            <div className={c.nawWrapper}>
                <div className={c.userInfoWrapper}>
                    <UserAvatar auth={auth}/>
                </div>
            </div>
        )
    }

export default NavMenu;
