import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {Avatar} from "@material-ui/core";
import ChangeUser from "./ChangeLogin/ChangeLogin";
import Logout from "./Logout/Logout";
import c from "./UserBlock.module.css";
import {AuthinitialType} from "../../../redux/authReducer";
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import classes from "../../Books/Book/Book.module.css";
import {NavLink} from "react-router-dom";

type OwnPropsType = {
    auth: AuthinitialType
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            transform: 'translateZ(0px)',
            flexGrow: 1,
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        speedDial: {
            position: 'absolute',
        },
    }),
);

const actionsDefaulUser = [
    {icon: <NavLink to={'/login'}><PersonRoundedIcon/></NavLink>, name: 'Логин'},
    {icon: <NavLink to={'/signup'}><ExitToAppIcon/></NavLink>, name: 'Регистрация'},
];

const actionsLoginUser = [
    {icon: <ChangeUser/>, name: 'Сменить аватар'},
    {icon: <Logout/>, name: 'Разлогиниться'},
];

const UserAvatar: React.FC<OwnPropsType> = ({auth,}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

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
        </div>
    );
}

export default UserAvatar