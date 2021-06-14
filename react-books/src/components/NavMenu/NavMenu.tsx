import React from 'react'
import classes from './NavMenu.module.css'
import { AuthinitialType } from '../../redux/authReducer'
import UserAvatar from './UserBlock/UserBlock'
import { Avatar, Box } from '@material-ui/core'
import logo from '../../assets/image/logo.png'
import { NavLink } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { motion } from 'framer-motion'

type NavMenuPropsType = {
    auth: AuthinitialType
    setIsShowLogin: (toggle: boolean) => void
    setIsShowSignUp: (toggle: boolean) => void
}

const logoVariants = {
    hidden: {
        opacity: 0,
        x: '-100vw'
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 120 }
    }
}

const userButtonVariants = {
    hidden: {
        opacity: 0,
        x: '100vw'
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 120 }
    }
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
                <motion.div className={classes.logoWrapper}
                    variants={logoVariants}
                    initial='hidden'
                    animate='visible'>
                    <Box width='100px' marginTop='-25px'>
                        <NavLink className={classes.navLink} to='/'>
                            <Avatar alt="logo" className={c.large} src={logo}/>
                        </NavLink>
                    </Box>
                </motion.div>

                <motion.div className={classes.userInfoWrapper}
                    variants={userButtonVariants}
                    initial='hidden'
                    animate='visible'>

                    <UserAvatar auth={auth}
                        setIsShowLogin={setIsShowLogin}
                        setIsShowSignUp={setIsShowSignUp}/>
                </motion.div>
            </div>
        )
    }

export default NavMenu
