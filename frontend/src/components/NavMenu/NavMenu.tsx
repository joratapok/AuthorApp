import React from 'react';
import classes from './NavMenu.module.css'
import {NavLink} from "react-router-dom";
import {MapDispatchPropsType, MapStatePropsType} from "./NavMenuContainer";
import {AuthinitialType} from "../../redux/authReducer";

type NavMenuPropsType = {
    auth: AuthinitialType
    logout: () => void
}
type UserType = {
    login: string | null
    logout: () => void
}

const NavMenu: React.FC<NavMenuPropsType> =
    ({auth, logout,}) => {

        const User: React.FC<UserType> = ({login, logout}) => {
            return (
                <div>
                    <div>Hello, {login}</div>
                    <button onClick={logout}>Logout</button>
                </div>
            )
        }

        return (
            <div>
                    {auth.isAuth
                        ? <User login={auth.username} logout={logout}/>
                        : <><NavLink to='/login'>Login</NavLink><NavLink to='/signUp'>SingUp</NavLink></>}
            </div>
        )
    }

export default NavMenu;
