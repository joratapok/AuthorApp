import React from 'react'
import classes from './Footer.module.css'

const Footer: React.FC = () => {
    return (
        <div className={classes.footerContainer}>
                <div className={classes.footerWrapper}>

                    <div className={classes.footerCatWrapper}>

                    </div>
                    <div className={classes.footerContentWrapper}>
                        footer
                    </div>
                </div>
        </div>

    );
}

export default Footer;
