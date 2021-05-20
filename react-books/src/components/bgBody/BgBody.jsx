import React, {useState} from 'react'
import classes from './BgBody.module.css'
import masterCat from "../../assets/image/masterCat.png"
import ScrollAnimation from 'react-animate-on-scroll'


const BgBody = () => {

    const [move, setMove] = useState(false)
    const masterCatClass = classes.masterCat + ' ' + (move ? classes.activeMasterCat : '')

    const showMasterCat = () => {
        setMove(true)
    }


    return (
        <div className={classes.bgWrapper}>
            <div className={classes.bgContainer}>

                <div className={masterCatClass}>
                    <ScrollAnimation
                        animateIn='flipInX'
                        offset={100}
                        animateOnce={true}
                        afterAnimatedIn={showMasterCat}>

                        <img src={masterCat} alt='sensey cat'/>
                    </ScrollAnimation>
                </div>

            </div>
        </div>
    )
}

export default BgBody;
