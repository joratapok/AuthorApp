import React from 'react'
import classes from './PageNotFound.module.css'
import sadCat from '../../assets/image/sadCat.png'

const PageNotFound: React.FC = () => {
    return (
        <div className={classes.notFoundWrapper}>

            <div className={classes.headerMessage}>
                404
            </div>
            <div className={classes.bodyMessage}>
                Такой страницы не существует
            </div>
            <div className={classes.imageMessage}>
                <img src={sadCat} alt='sad cat'/>
            </div>
        </div>
    )
}

export default PageNotFound
