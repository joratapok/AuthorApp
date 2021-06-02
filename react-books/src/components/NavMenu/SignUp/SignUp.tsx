/* eslint-disable camelcase */
import React from 'react'
import classes from './SignUp.module.css'
import { Form } from 'react-final-form'
import { SignUpFormDataType } from '../../../api/api'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
    TextField
} from 'mui-rff'
import {
    Typography, Fade, Backdrop,
    Grid, Modal, Button
} from '@material-ui/core'
import { AuthinitialType } from '../../../redux/authReducer'
import GoogleLogin from 'react-google-login'
import ReCAPTCHA from 'react-google-recaptcha'

type PropsType = {
    onSubmit: (data: SignUpFormDataType) => void
    auth: AuthinitialType
    setIsShowSignUp: (toggle: boolean) => void
    loginWithGoogleThunk: (google_token: string) => void
    handlerRecaptcha: (token: string | null) => void
}

const formFields: Array<any> = [
    {
        size: 12,
        field: (
            <TextField
                label="Имя или никнейм"
                name="username"
                margin="none"
                variant="outlined"
                required
                autoFocus
            />
        )
    },
    {
        size: 12,
        field: (
            <TextField
                label="Email"
                name="email"
                margin="none"
                variant="outlined"
                required
                type="email"
            />
        )
    },
    {
        size: 12,
        field: (
            <TextField
                label="Пароль"
                name="password"
                margin="none"
                variant="outlined"
                required
                type='password'
            />
        )
    },
    {
        size: 12,
        field: (
            <TextField
                label="Пароль еще раз"
                name="re_password"
                margin="none"
                variant="outlined"
                required
                type='password'
            />
        )
    }
]

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    })
)

const SignUp: React.FC<PropsType> = ({
    onSubmit, auth, setIsShowSignUp,
    loginWithGoogleThunk, handlerRecaptcha
}) => {
    const cl = useStyles()

    const closeSignUpModal = () => {
        setIsShowSignUp(false)
    }

    const accessResponseGoogle = (response: any) => {
        loginWithGoogleThunk(response.accessToken)
    }

    const denyResponseGoogle = (response: any) => {
        console.error(response)
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={cl.modal}
            open={auth.isShowSignUp}
            onClose={closeSignUpModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={auth.isShowSignUp}>
                <>
                    <div className={classes.signWrap}>
                        <Form
                            onSubmit={onSubmit}

                            render={({ handleSubmit, submitError, form, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit}>
                                    <Typography variant="h5" align="center" component="h2" gutterBottom>
                                        Регистрация
                                    </Typography>

                                    <Grid container alignItems="flex-start" spacing={2}>
                                        {formFields.map((item, idx) => (
                                            <Grid item xs={item.size} key={idx}>
                                                {item.field}
                                            </Grid>
                                        ))}

                                        <Grid item xs={12}>
                                            <ReCAPTCHA
                                                sitekey="6Ld4X8UaAAAAAMws3AVzcduNTDy4RCz-3DaOJmbo"
                                                onChange={handlerRecaptcha}
                                            />
                                        </Grid>

                                        {submitError && <div className="error">{submitError}</div>}

                                        <Grid item xs={12} style={{ marginTop: 16 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={submitting}
                                            >
                                                Отправить
                                            </Button>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <GoogleLogin
                                                clientId="836913855059-m5bsk43ik1l7o7l8g4kkhd4pjj66d2rb.apps.googleusercontent.com"
                                                buttonText="Войти с помощью Google аккаунта"
                                                onSuccess={accessResponseGoogle}
                                                onFailure={denyResponseGoogle}
                                                cookiePolicy={'single_host_origin'}
                                                className={classes.googleButton}
                                            />
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        />
                    </div>
                </>
            </Fade>
        </Modal>
    )
}

export default SignUp
