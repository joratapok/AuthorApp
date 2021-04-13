import React from 'react'
import classes from './FormsControl.module.css'
import {FieldValidatorType} from "../../utils/validators/validator";
import {WrappedFieldProps} from "redux-form";

type FormControlPropsType = {
    placeholder?: string
    type?: string
    name: string
    validate?: Array<FieldValidatorType>
}

export const Textarea: React.FC<FormControlPropsType & WrappedFieldProps> = (props) => {
    const hasError = props.meta.touched && props.meta.error
    return(
        <div className={classes.textAreaWrap}>
            <textarea className={classes.textArea+' '+(hasError ? classes.error :'')} {...props}{...props.input} />
            {hasError && <span className={classes.errorMessage}>{props.meta.error} </span>}
        </div>
    )
}

export const Input: React.FC<FormControlPropsType & WrappedFieldProps> = (props) => {
    const hasError = props.meta.touched && props.meta.error
    return(
        <div className={classes.textAreaWrap}>
            <input className={classes.input +' '+(hasError ? classes.error :'')} {...props}{...props.input} />
            {hasError && <span className={classes.errorMessage}>{props.meta.error} </span>}
        </div>
    )
}

export const Checkbox: React.FC<FormControlPropsType & WrappedFieldProps> = (props) => {
    const hasError = props.meta.touched && props.meta.error
    return(
        <div className={classes.textAreaWrap}>
            <input className={classes.checkbox +' '+(hasError ? classes.error :'')} {...props}{...props.input} />
            {hasError && <span className={classes.errorMessage}>{props.meta.error} </span>}
        </div>
    )
}

export const HiddenInput: React.FC<FormControlPropsType & WrappedFieldProps> = (props) => {
    const hasError = props.meta.touched && props.meta.error
    return(
        <>
            <input hidden={true} {...props}{...props.input} />
            {hasError && <span className={classes.errorMessage}>{props.meta.error} </span>}
        </>
    )
}
