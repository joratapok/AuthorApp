import React, { Component } from 'react'
import classes from './Intro.module.css'
import Typical from 'react-typical'

const steps = [
    'Good', 1000,
    'Good Books', 1000,
    'Good Books Only', 1000,
    'Good Books Only (=ﾟωﾟ)ノ', 4000,
    'Good Books ❤️', 1000,
    'Good Books ❤️❤️', 1000,
    'Good Books ❤️❤️❤️', 1000,
    'Good...', 1000,
    'Good Only ʕ•ᴥ•', 1000,
    'Only Books', 1000,
    'Only Books ლ(ಠ‿ಠლ)', 2000,
    'Only Books Good', 1000,
    'Что тут ⊂(´• ω •`⊂)', 2000,
    'Что тут ⊂(´• ω •`⊂) происходит....', 3000,
    '(^◔ᴥ◔^)', 1000,
    'ଲ(ⓛ ω ⓛ)ଲ', 2000,
    'Кот без забот', 2000,
    'Кот без забот (^◕ᴥ◕^)', 2000
]

class Intro extends Component {
    render () {
        return (
            <div>
                <Typical wrapper="span" steps={steps} loop={Infinity} className={classes.intro} />
            </div>
        )
    }
}

export default Intro
