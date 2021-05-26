import React from 'react'
import classes from './Body.module.css'
import BgBody from './bgBody/BgBody'
import BooksContainer from "./Books/BooksContainer"
import {Route, Redirect} from "react-router-dom"
import NavMenuContainer from "./NavMenu/NavMenuContainer"
import OneBookContainer from "./OneBook/OneBookContainer"
import PageNotFound from "./PageNotFound/PageNotFound"
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
                <Route path="/404" component={PageNotFound} />
                <Redirect to="/404" />
            </div>
            <Footer/>
        </div>
    );
}

export default Body;
