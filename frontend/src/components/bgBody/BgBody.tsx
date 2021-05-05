import React, {useEffect, useState, useRef} from 'react'
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

                <div className={classes.first}>
                    <div className={classes.chunk1}>
                        <img src={octa1}
                             style={{top: (move['y'] / 50) + 'px', left: (move['x'] / 50) + 'px'}}/>
                    </div>

                    <div className={classes.chunk2}>

                    </div>
                </div>

                <div className={classes.second}>
                    <div className={classes.chunk3}>
                        <img src={octa2}
                             style={{top: (-move['y'] / 20) + 'px', left: (-move['x'] / 20) + 'px'}}/>
                    </div>
                    <div className={classes.chunk4}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BgBody;
