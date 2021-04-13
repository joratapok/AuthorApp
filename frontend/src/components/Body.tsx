import React from 'react'
import classes from './body.module.css'
import BgBody from './bgBody/BgBody'
import BooksContainer from "./Books/BooksContainer"
import LoginContainer from "./login/LoginContainer"


const Body: React.FC = () => {
    return (
        <div className={classes.wrapper}>
            <BgBody/>
            <div className={classes.content}>
                <div className={classes.fish}>
                <LoginContainer/>
                </div>
                <BooksContainer/>
            </div>
        </div>
    );
}

export default Body;
