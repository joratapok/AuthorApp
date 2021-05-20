import React from 'react'
import classes from './Body.module.css'
import BgBody from './bgBody/BgBody'
import BooksContainer from "./Books/BooksContainer"
import {Route,} from "react-router-dom"
import NavMenuContainer from "./NavMenu/NavMenuContainer"
import OneBookContainer from "./OneBook/OneBookContainer"
import Footer from "./Footer/Footer"
import {CssBaseline} from "@material-ui/core"
import SiteName from "./SiteName/SiteName";


const Body: React.FC = () => {
    return (
        <div className={classes.wrapper}>
            <CssBaseline/>
            <BgBody/>
            <div className={classes.content}>
                <NavMenuContainer/>
                <SiteName/>
                <Route path='/book/:bookId' render={() => <OneBookContainer/>}/>
                <Route exact path='/' render={() => <BooksContainer/>}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Body;
