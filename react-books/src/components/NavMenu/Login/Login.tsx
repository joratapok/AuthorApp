/* eslint-disable camelcase */
import React from 'react'
import classes from './Login.module.css'
import { Form, Field } from 'react-final-form'
import {
    TextField
} from 'mui-rff'
import {
    Grid, Fade, Backdrop,
    Button, Modal
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import GoogleLogin from 'react-google-login'
import { AuthinitialType } from '../../../redux/authReducer'

export type LoginFormDataType = {
    username: string
    password: string
}
type LoginFormType = {
    onSubmit: (data: LoginFormDataType) => any
}

const LoginForm: React.FC<LoginFormType> = ({ onSubmit }) => (
    <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitError, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name={'username'}
                        component="input"
                    >
                        {({ input, meta: { touched, error } }) => (
                            <div>
                                <TextField {...input} type="text"
                                    variant="outlined"
                                    label="Логин"
                                    margin="normal"
                                    required
                                    autoFocus/>
                            </div>
                        )}
                    </Field>
                </div>
                <div>
                    <Field name={'password'}
                        component="input"
                    >
                        {({ input, meta }) => (

                            <TextField {...input} type="password"
                                label="Пароль"
                                margin="normal"
                                variant="outlined"
                                required/>
                        )}
                    </Field>
                </div>
                {submitError && <div className="error">{submitError}</div>}
                <Grid item style={{ marginTop: 16 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting}
                    >
                        Отправить
                    </Button>
                </Grid>
            </form>
        )}
    />
)

type LoginType = {
    onSubmit: (data: LoginFormDataType) => any
    auth: AuthinitialType
    loginWithGoogleThunk: (google_token: string) => void
    setIsShowLogin: (toggle: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    })
)

const Login: React.FC<LoginType> = ({
    onSubmit,
    auth,
    loginWithGoogleThunk,
    setIsShowLogin
}) => {
    const cl = useStyles()

    const accessResponseGoogle = (response: any) => {
        loginWithGoogleThunk(response.accessToken)
    }

    const denyResponseGoogle = (response: any) => {
        console.error(response)
    }

    const closeLoginModal = () => {
        setIsShowLogin(false)
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={cl.modal}
            open={auth.isShowLogin}
            onClose={closeLoginModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={auth.isShowLogin}>
                <>
                    <div className={classes.loginWrap}>
                        <div className={classes.title}>Авторизация</div>
                        <LoginForm onSubmit={onSubmit}/>
                        <GoogleLogin
                            className={classes.googleButton}
                            clientId="836913855059-m5bsk43ik1l7o7l8g4kkhd4pjj66d2rb.apps.googleusercontent.com"
                            buttonText="Войти с помощью Google аккаунта"
                            onSuccess={accessResponseGoogle}
                            onFailure={denyResponseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </>
            </Fade>
        </Modal>
    )
}
export default Login
