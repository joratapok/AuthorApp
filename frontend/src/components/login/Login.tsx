import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validator";
import {Input, Textarea} from "../common/formsControl/FormsControl";
import classes from "./Login.module.css"
import Button from "./button/Button";
import {LoginFormDataType} from "./LoginContainer";

type LoginFormOwnProps = {}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({handleSubmit, error,}) => {

        return (
            <form onSubmit={handleSubmit}>

                <div className={classes.inputWrapper}>
                    <Field placeholder={'login'} type={'text'}
                           name={'username'} validate={[required,]}
                           component={Textarea}/>
                </div>

                <div className={classes.inputWrapper}>
                    <Field type={'password'} name={'password'} placeholder={'password'}
                           validate={[required,]} component={Input}/>
                </div>

                {(error &&
                    <div className={classes.errorWrapper}>
                        <div className={classes.errorField}>
                            {error}
                        </div>
                    </div>)}

                <div className={classes.buttonWrapper}>
                    <Button/>
                </div>
            </form>
        )
    }

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type PropsType = {
    onSubmit: (data: LoginFormDataType) => void
}

const Login: React.FC<PropsType> =
    ({onSubmit,}) => {

      type InitialValiesType = {
          username?: string
          password?: string
      }
      let initialValues:InitialValiesType = {username: 'admin', password: 'admin'}

        return (
            <div className={classes.loginWrap}>
                <div className={classes.title}>Login Page</div>

                <LoginReduxForm onSubmit={onSubmit} initialValues={initialValues}/>
            </div>
        )
    }
export default Login
