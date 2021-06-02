import React from 'react'
import classes from './NavMenu.module.css'
import { AuthinitialType } from '../../redux/authReducer'
import UserAvatar from './UserBlock/UserBlock'
import { Avatar, Box } from '@material-ui/core'
import logo from '../../assets/image/logo.png'
import { NavLink } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

type NavMenuPropsType = {
    auth: AuthinitialType
    setIsShowLogin: (toggle: boolean) => void
    setIsShowSignUp: (toggle: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'

        },
        small: {
            width: theme.spacing(8),
            height: theme.spacing(8)
        },
        large: {
            width: theme.spacing(12),
            height: theme.spacing(12),
            boxSizing: 'content-box'
        }
    })
)

const NavMenu: React.FC<NavMenuPropsType> =
    ({ auth, setIsShowLogin, setIsShowSignUp }) => {
        const c = useStyles()

        return (
            <div className={classes.nawWrapper}>
                <div className={classes.logoWrapper}>
                    <Box width='100px' marginTop='-25px'>
                        <NavLink className={classes.navLink} to='/'>
                            <Avatar alt="logo" className={c.large} src={logo}/>
                        </NavLink>
                    </Box>
                </div>

                <div className={classes.userInfoWrapper}>
                    <UserAvatar auth={auth}
                        setIsShowLogin={setIsShowLogin}
                        setIsShowSignUp={setIsShowSignUp}/>
                </div>
            </div>
        )
    }

export default NavMenu
