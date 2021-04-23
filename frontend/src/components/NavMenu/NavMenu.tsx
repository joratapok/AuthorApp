import React from 'react';
import classes from './NavMenu.module.css'
import {NavLink} from "react-router-dom";
import {MapDispatchPropsType, MapStatePropsType} from "./NavMenuContainer";
import {AuthinitialType} from "../../redux/authReducer";

type NavMenuPropsType = {
    auth: AuthinitialType
    logout: () => void
    changeAvatarThunk: (JWTToken: string, userId: number, photo: any) => void
}
type UserType = {
    auth: AuthinitialType
    logout: () => void
    changeAvatarThunk: (JWTToken: string, userId: number, photo: any) => void
}

const NavMenu: React.FC<NavMenuPropsType> =
    ({auth, logout, changeAvatarThunk}) => {

        const User: React.FC<UserType> = ({auth, logout, changeAvatarThunk}) => {

            const PhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                    changeAvatarThunk(auth.accessToken, auth.id, e.target.files[0])
                }
            }

            return (
                <div>
                    <div className={classes.avaWrapper}>
                        <img src={auth.avatar} alt='avatar' />
                    </div>
                    <input type={'file'} onChange={PhotoSelected}/>
                    <div>Hello, {auth.username}</div>

                    <button onClick={logout}>Logout</button>
                </div>
            )
        }

        return (
            <div className={classes.nawWrapper}>
                    {auth.isAuth
                        ? <User auth={auth} logout={logout} changeAvatarThunk={changeAvatarThunk}/>
                        : <><NavLink to='/login'>Login</NavLink><NavLink to='/signUp'>SingUp</NavLink></>}
            </div>
        )
    }

export default NavMenu;
