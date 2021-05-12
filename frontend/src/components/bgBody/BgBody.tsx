import React, {useEffect, useState} from 'react'
import classes from './BgBody.module.css'
import octa1 from "../../assets/backGround/Asset2.png"
import octa2 from "../../assets/backGround/Asset1.png"


const BgBody: React.FC = () => {

    const [move, setMove] = useState({x: 0, y: 0})

    let setFromEvent = (e: MouseEvent) => {
        setMove({x: e.clientX, y: e.clientY})
    }

    useEffect(() => {
        window.addEventListener('mousemove', setFromEvent)
        return () => {
            window.removeEventListener('mousemove', setFromEvent)
        }
    }, [])

    return (
        <div className={classes.bgWrapper}>
            <div className={classes.bgContainer}>

            </div>
        </div>
    )
}

export default BgBody;
