import React from 'react'
import classes from './body.module.css'
import BgBody from './bgBody/BgBody'
import BooksContainer from "./Books/BooksContainer"
import LoginContainer from "./login/LoginContainer"
import {Route,} from "react-router-dom";
import NavMenuContainer from "./NavMenu/NavMenuContainer"
import OneBookContainer from "./OneBook/OneBookContainer"
import SignUpContainer from "./SignUp/SignUpContainer"
import {CssBaseline} from "@material-ui/core";


const Body: React.FC = () => {
    return (
        <div className={classes.wrapper}>
            <CssBaseline/>
            <BgBody/>
            <div className={classes.content}>
                <NavMenuContainer/>

                <div className={classes.fish}>
                    <Route path='/login' render={() => <LoginContainer/>}/>
                    <Route path='/signUp' render={() => <SignUpContainer/>}/>
                </div>
                
                <Route path='/book/:bookId' render={() => <OneBookContainer/>}/>
                <Route exact path='/' render={() => <BooksContainer/>}/>

            </div>
        </div>
    );
}

export default Body;
