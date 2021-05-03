import React from 'react';
import c from './NavMenu.module.css'
import {AuthinitialType} from "../../redux/authReducer";
import UserAvatar from "./UserBlock/UserBlock";

type NavMenuPropsType = {
    auth: AuthinitialType
    setIsShowLogin: (toggle: boolean) => void
    setIsShowSignUp: (toggle: boolean) => void
}

const NavMenu: React.FC<NavMenuPropsType> =
    ({auth, setIsShowLogin, setIsShowSignUp}) => {

        return (
            <div className={c.nawWrapper}>
                <div className={c.userInfoWrapper}>
                    <UserAvatar auth={auth}
                                setIsShowLogin={setIsShowLogin}
                                setIsShowSignUp={setIsShowSignUp}/>
                </div>
            </div>
        )
    }

export default NavMenu;
