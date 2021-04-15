import React from 'react'
import classes from "./Preloader.module.css";

let Preloader: React.FC = () => {
    return(
        <div className={classes.wrapper} >
            <div className={classes.preloader}>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Preloader
