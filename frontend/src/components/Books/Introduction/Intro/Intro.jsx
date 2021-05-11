import React, {Component} from 'react'
import classes from './Intro.module.css'

const Intro: React.FC = () => {

        return (
            <div className={classes.introWpapper}>
                <div className={classes.container}>
                <h1 className={classes.h1}>
                <span className={classes.span}>
                THE BLOBS
                </span>
                </h1>

                <div className={classes.blobs_1} ></div>
                <div className={classes.blobs_2}></div>
                <div className={classes.blobs_3}></div>
                <div className={classes.blobs_4}></div>
                <div className={classes.blobs_5}></div>
                <div className={classes.blobs_6}></div>
                <div className={classes.blobs_7}></div>
                </div>
            </div>
        )

}

export default Intro;
