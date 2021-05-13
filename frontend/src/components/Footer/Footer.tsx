import React from 'react'
import classes from './Footer.module.css'
import footerBG from '../../assets/backGround/footerBG.png'
import readCat from '../../assets/image/readCat.png'





const Footer: React.FC = () => {

    return (
        <div className={classes.footerContainer}>

            <div className={classes.footerWrapper} style={{backgroundImage: `url(${footerBG})`}}>
                <div className={classes.footerCatWrapper}>
                    <img src={readCat} alt="reading cat"/>
                </div>
                <div className={classes.footerContentWrapper}>

                    © 2021 Все права защищены. Любое использование текстов в коммерческих целях строго запрещено.

                </div>
            </div>

        </div>
    );
}

export default Footer;
