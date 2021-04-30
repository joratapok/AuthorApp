import React, {useEffect} from 'react'
import {required, loginRequired} from "../../../utils/validators/validator";
import classes from "./Login.module.css"
import {Form, Field} from 'react-final-form'
import {
    TextField,
} from 'mui-rff';
import {
    Grid, Fade, Backdrop,
    Button, Modal
} from '@material-ui/core';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'

export type LoginFormDataType = {
    username: string
    password: string
}
type LoginFormType = {
    onSubmit: (data: LoginFormDataType) => any
}


const LoginForm: React.FC<LoginFormType> = ({onSubmit,}) => (
    <Form
        onSubmit={onSubmit}
        render={({handleSubmit, submitError, form, submitting, pristine, values}) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name={'username'}
                           component="input"
                           >
                        {({input, meta: {touched, error}}) => (
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
                        {({input, meta}) => (

                            <TextField {...input} type="password"
                                       label="Пароль"
                                       margin="normal"
                                       variant="outlined"
                                       required/>
                        )}
                    </Field>
                </div>
                {submitError && <div className="error">{submitError}</div>}
                <Grid item style={{marginTop: 16}}>
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
    loginModal: boolean
    closeLoginModal: () => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
)


const Login: React.FC<LoginType> = ({onSubmit, loginModal, closeLoginModal}) => {

    const cl = useStyles();

    const [modal, setModal] = React.useState(false)

    useEffect(() => {
        setModal(loginModal)
    }, [loginModal])


    return (
      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={cl.modal}
          open={modal}
          onClose={closeLoginModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
              timeout: 500,
          }}
      >
          <Fade in={modal}>
              <>
                  <div className={classes.loginWrap}>
                      <div className={classes.title}>Авторизация</div>
                      <LoginForm onSubmit={onSubmit}/>
                  </div>
              </>
          </Fade>
      </Modal>
    )
}
export default Login
