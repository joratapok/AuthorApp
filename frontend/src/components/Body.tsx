import React from 'react'
import classes from './body.module.css'
import BgBody from './bgBody/BgBody'
import BooksContainer from "./Books/BooksContainer";


const Body: React.FC = () => {
    return (
        <div className={classes.wrapper}>
            <BgBody/>
            <div className={classes.content}>
                <div className={classes.fish}>
                </div>
                <BooksContainer/>
            </div>
        </div>
    );
}

export default Body;
