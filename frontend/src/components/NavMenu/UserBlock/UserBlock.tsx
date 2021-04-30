import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {Avatar, IconButton} from "@material-ui/core";
import ChangeUser from "./ChangeLogin/ChangeLogin";
import Logout from "./Logout/Logout";
import c from "./UserBlock.module.css";
import {AuthinitialType} from "../../../redux/authReducer";
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import classes from "../../Books/Book/Book.module.css";
import {NavLink} from "react-router-dom";
import LoginContainer from "../Login/LoginContainer"
import SighUpContainer from "../SignUp/SignUpContainer"

type OwnPropsType = {
    auth: AuthinitialType
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            transform: 'translateZ(0px)',
            flexGrow: 1,
            zIndex: 2003,
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        speedDial: {
            position: 'absolute',
        },
    }),
)


const actionsLoginUser = [
    {icon: <ChangeUser/>, name: 'Сменить аватар'},
    {icon: <Logout/>, name: 'Разлогиниться'},
]

const UserAvatar: React.FC<OwnPropsType> = ({auth,}) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const [loginModal, setLoginModal] = React.useState(false)

    const openLoginModal = () => {
        setLoginModal(true)
    }

    const closeLoginModal = () =>{
        setLoginModal(false)
    }

    const [signUpModal, setSignUpModal] = React.useState(false)

    const openSignUpModal = () => {
        setSignUpModal(true)
    }

    const closeSignUpModal = () =>{
        setSignUpModal(false)
    }

    if (window.location.href == 'http://127.0.0.1:3000/login') {
        //setLoginModal(true)
        console.log('yyyyyyyyyyyyyyyyyyyyy')
    }


    const actionsDefaulUser = [
        {icon: <IconButton onClick={openLoginModal}><PersonRoundedIcon/></IconButton>, name: 'Логин'},
        {icon: <IconButton onClick={openSignUpModal}><ExitToAppIcon/></IconButton>, name: 'Регистрация'},
    ]

    const actions = auth.isAuth ? actionsLoginUser : actionsDefaulUser
    let avatarWrapper = c.avatarPassive + ' ' + (open ? c.avatarActive : '')

    const AvatarWrapper = (props: any) => {
        return <div className={avatarWrapper}>
            <Avatar {...props}/>
        </div>
    }

    return (
        <div className={classes.root}>
            <SpeedDial
                ariaLabel="AvatarButton"
                className={classes.speedDial}
                hidden={false}
                icon={auth.isAuth ? <AvatarWrapper alt="avatar" src={auth.avatar} className={classes.large}/> : <PersonRoundedIcon/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={"down"}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                        tooltipOpen
                    />
                ))}
            </SpeedDial>
            <LoginContainer loginModal={loginModal}  closeLoginModal={closeLoginModal} />
            <SighUpContainer signUpModal={signUpModal}  closeSignUpModal={closeSignUpModal} />
        </div>
    );
}

export default UserAvatar
