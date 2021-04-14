import React from 'react'
//import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validator";
import {Input, Textarea} from "../common/formsControl/FormsControl";
import classes from "./Login.module.css"
import Button from "./button/Button";
import {LoginFormDataType} from "./LoginContainer";
import { Form, Field } from 'react-final-form'

const LoginForm: React.FC<PropsType> = ({onSubmit,}) => (
    <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Логин</label>
                    <Field
                        name={'username'}
                        component="input"
                        type="text"
                        placeholder="Логин"
                    />
                </div>
                <div>
                    <label>Пароль</label>
                    <Field
                        name="password"
                        component="input"
                        type="password"
                        placeholder="Пароль"
                    />
                </div>

                <div className="buttons">
                    <button type="submit" disabled={submitting || pristine}>
                        Отправить
                    </button>
                </div>
            </form>
        )}
    />
)

// const OldLoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnProps> & LoginFormOwnProps> =
//     ({handleSubmit, error,}) => {
//
//         return (
//             <form onSubmit={handleSubmit}>
//
//                 <div className={classes.inputWrapper}>
//                     <Field placeholder={'login'} type={'text'}
//                            name={'username'} validate={[required,]}
//                            component={Textarea}/>
//                 </div>
//
//                 <div className={classes.inputWrapper}>
//                     <Field type={'password'} name={'password'} placeholder={'password'}
//                            validate={[required,]} component={Input}/>
//                 </div>
//
//                 {(error &&
//                     <div className={classes.errorWrapper}>
//                         <div className={classes.errorField}>
//                             {error}
//                         </div>
//                     </div>)}
//
//                 <div className={classes.buttonWrapper}>
//                     <Button/>
//                 </div>
//             </form>
//         )
//     }

//const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type PropsType = {
    onSubmit: (data: LoginFormDataType) => void
}

const Login: React.FC<PropsType> =
    ({onSubmit,}) => {

        return (
            <div className={classes.loginWrap}>
                <div className={classes.title}>Login Page</div>

                <LoginForm onSubmit={onSubmit}/>
            </div>
        )
    }
export default Login
