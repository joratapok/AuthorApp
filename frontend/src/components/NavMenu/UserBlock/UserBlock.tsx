import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {Avatar, IconButton, Paper} from "@material-ui/core";
import ChangeUser from "./ChangeLogin/ChangeLogin";
import Logout from "./Logout/Logout";
import c from "./UserBlock.module.css";
import {AuthinitialType} from "../../../redux/authReducer";
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LoginContainer from "../Login/LoginContainer"
import SighUpContainer from "../SignUp/SignUpContainer"
import defaultAvatarCat from "../../../assets/image/defaultAvatarCat.png";
import {Redirect} from "react-router-dom/";


type OwnPropsType = {
    auth: AuthinitialType
    setIsShowLogin: (toggle: boolean) => void
    setIsShowSignUp: (toggle: boolean) => void
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
        hello: {
            position: 'absolute',
            right: '10px',
            transition: '0.5s',
            textAlign: 'center',
            padding: '8px',
        }
    }),
)


const actionsLoginUser = [
    {icon: <ChangeUser/>, name: 'Сменить аватар'},
    {icon: <Logout/>, name: 'Разлогиниться'},
]

const UserAvatar: React.FC<OwnPropsType> = ({auth, setIsShowLogin, setIsShowSignUp}) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const avatar = auth.avatar ? auth.avatar : defaultAvatarCat

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const openLoginModal = () => {
        setIsShowLogin(true)
    }

     const openSignUpModal = () => {
        setIsShowSignUp(true)
    }

    if (window.location.href == 'http://localhost:3000/login') {
        openLoginModal()
        return <Redirect to={'/'}/>
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
            <Paper className={classes.hello} style={{'opacity': (open && auth.isAuth ? '1': '0')}}>
                Привет, {auth.username}
            </Paper>
            <SpeedDial
                ariaLabel="AvatarButton"
                className={classes.speedDial}
                hidden={false}
                icon={auth.isAuth ? <AvatarWrapper alt="avatar" src={avatar} className={classes.large}/> : <PersonRoundedIcon/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={"down"}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        title={'profile'}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                        tooltipOpen
                    />
                ))}
            </SpeedDial>
            <LoginContainer/>
            <SighUpContainer/>
        </div>
    );
}

export default UserAvatar
