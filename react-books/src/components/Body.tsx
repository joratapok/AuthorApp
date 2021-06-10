import React from 'react'
import classes from './Body.module.css'
import BgBody from './bgBody/BgBody'
import BooksContainer from './Books/BooksContainer'
import { Route, Switch, useLocation } from 'react-router-dom'
import NavMenuContainer from './NavMenu/NavMenuContainer'
import OneBookContainer from './BookDetail/BookDetailContainer'
import PageNotFound from './PageNotFound/PageNotFound'
import Footer from './Footer/Footer'
import { CssBaseline } from '@material-ui/core'
import SiteName from './SiteName/SiteName'
import { AnimatePresence } from 'framer-motion'

export const pageVariants = {
    in: {
        opacity: 1,
        width: '100%',
        y: 0,
        scale: 1
    },
    out: {
        opacity: 0,
        width: '100%',
        y: '-100vh',
        scale: 0.3
    }
}

export const pageTransition = {
    duration: 0.3
}

const Body = () => {
    const location = useLocation()
    return (
        <div className={classes.wrapper}>
            <CssBaseline/>
            <BgBody/>
            <div className={classes.content}>
                <NavMenuContainer/>
                <SiteName/>
                <AnimatePresence exitBeforeEnter>
                    <Switch location={location} key={location.pathname}>
                        <Route path='/book/:bookId?' component={OneBookContainer}/>
                        <Route exact path='/' component={BooksContainer}/>
                        <Route path="*" component={PageNotFound}/>
                    </Switch>
                </AnimatePresence>
            </div>
            <Footer/>
        </div>
    )
}

export default Body
