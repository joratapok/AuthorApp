import React from 'react'
import classes from "./Button.module.css"

let Button = () => {

    return <div className={classes.buttonWrap}>
        <button type={'submit'} className={classes.button}>Login</button>
    </div>
}

export default Button
