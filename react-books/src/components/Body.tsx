import React from 'react'
import classes from './Body.module.css'
import BgBody from './bgBody/BgBody'
import BooksContainer from './Books/BooksContainer'
import { Route, Switch, useLocation } from 'react-router-dom'
import NavMenuContainer from './NavMenu/NavMenuContainer'
import OneBookContainer from './OneBook/OneBookContainer'
import PageNotFound from './PageNotFound/PageNotFound'
import Footer from './Footer/Footer'
import { CssBaseline } from '@material-ui/core'
import SiteName from './SiteName/SiteName'
import { useTransition, animated } from 'react-spring'

const Body = () => {
    const location: any = useLocation()
    // @ts-ignore
    const transitions: Array<any> = useTransition(location, (location) => location.pathname, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    })
    return (
        <div className={classes.wrapper}>
            <CssBaseline/>
            <BgBody/>
            <div className={classes.content}>
                <NavMenuContainer/>
                <SiteName/>
                {transitions.map(({ item, props, key }) => (
                    <animated.div key={key} style={props}>
                        <Switch location={item}>
                            <Route path='/book/:bookId?' render={() => <OneBookContainer/>}/>
                            <Route exact path='/' render={() => <BooksContainer/>}/>
                            <Route path="*" component={PageNotFound}/>
                        </Switch>
                    </animated.div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}

export default Body
