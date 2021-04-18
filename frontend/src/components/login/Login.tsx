import React from 'react'
import {required} from "../../utils/validators/validator";
import classes from "./Login.module.css"
import {LoginFormDataType} from "./LoginContainer";
import { Form, Field } from 'react-final-form'

const LoginForm: React.FC<PropsType> = ({onSubmit,}) => (
    <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitError, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Логин</label>
                    <Field name={'username'}
                        component="input"
                        validate={required}>
                        {({ input, meta }) => (
                          <div>
                            <input {...input} type="text" placeholder="Логин" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                          </div>
                        )}
                    </Field>

                </div>
                <div>
                    <label>Пароль</label>
                    <Field name={'password'}
                        component="input"
                        validate={required}>
                        {({ input, meta }) => (
                          <div>
                            <input {...input} type="password" placeholder="Пароль" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                          </div>
                        )}
                    </Field>

                </div>

                <div className="buttons">
                    <button type="submit" disabled={submitting || pristine}>
                        Отправить
                    </button>
                    {submitError && <div className="error">{submitError}</div>}
                </div>
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
                <div className={classes.title}>Login Page</div>

                <LoginForm onSubmit={onSubmit}/>
            </div>
        )
    }
export default Login
