import React, {useEffect, useState, useRef} from 'react'
import Grid from '@material-ui/core/Grid'
import {Box, Typography} from "@material-ui/core"
import Intro from './Intro/Intro'
import TestIntro from './Intro/testIntro'
import typeCat from '../../../assets/image/typeCatSmall.png'
import classes from './Introduction.module.css'


const Introduction: React.FC = () => {

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
        <div className={classes.introductionWrapper}>

                    <div className={classes.typeWrapper}>
                        <div className={classes.typeContainer} style={{left: -(move['x'] / 20) + 50 + 'px'}}>
                            <TestIntro/>
                        </div>
                    </div>
                    <div className={classes.catWrapper}>
                        <Box>
                            <img src={typeCat} alt='typing cat'
                            style={{top: (move['y'] / 15) - 80 + 'px', left: (move['x'] / 20) + 'px'}}/>
                        </Box>
                    </div>

        </div>
    );
}

export default Introduction
