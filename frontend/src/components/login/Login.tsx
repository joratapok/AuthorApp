import React from 'react'
import {required, loginRequired} from "../../utils/validators/validator";
import classes from "./Login.module.css"
import {LoginFormDataType} from "./LoginContainer";
import {Form, Field} from 'react-final-form'
import {
    TextField,
} from 'mui-rff';
import {
    Grid,
    Button,
} from '@material-ui/core';

const LoginForm: React.FC<PropsType> = ({onSubmit,}) => (
    <Form
        onSubmit={onSubmit}
        render={({handleSubmit, submitError, form, submitting, pristine, values}) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name={'username'}
                           component="input"
                           validate={loginRequired}>
                        {({input, meta: {touched, error}}) => (
                            <div>
                                <TextField {...input} type="text"
                                          autoFocus={true}
                                           label="Логин"
                                           margin="normal"
                                           required={true}/>
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
                                       required={true}/>
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

type PropsType = {
    onSubmit: (data: LoginFormDataType) => any
}

const Login: React.FC<PropsType> = ({onSubmit,}) => {

    return (
        <div className={classes.loginWrap}>
            <div className={classes.title}>Авторизация</div>

            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}
export default Login
