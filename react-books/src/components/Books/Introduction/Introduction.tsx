import React, {useEffect, useState} from 'react'
import typeCat from '../../../assets/image/typeCatSmall.png'
import test_image from '../../../assets/image/test_image.jpg'
import classes from './Introduction.module.css'
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles"
import {Backdrop, Modal} from "@material-ui/core"
import Intro from "./Intro/Intro";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '98%',
            maxWidth: '600px',
            margin: 'auto',
        },
    })
)

const Introduction: React.FC = () => {

    const c = useStyles();
    const [move, setMove] = useState({x: 0, y: 0})
    const [modal, setModal] = useState(false)

    const modalOn = () => {
        setModal(true)
    }
    const modalOff = () => {
        setModal(false)
    }

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

            <img src={test_image} alt='introduction image' className={classes.test_image}/>

            <div className={classes.first}
                style={{top: (move['y'] / 40) - 30 + 'px', left: (move['x'] / 40) + 'px'}}>

            </div>

            <div className={classes.introWrapper}>
                <Intro/>
            </div>

            <div className={classes.catWrapper}>
                <img src={typeCat} alt='typing cat' className={classes.typingCat}

                         onClick={modalOn}/>
            </div>


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={c.modal}
                open={modal}
                onClose={modalOff}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
              <div className={classes.boxIntro} >
                  <p>Приветствую вас друзья 👋 Вы на сайте авторской книги Дарьи Урусовой.
                  Здесь вы можете скачать или почитать мои произведения онлайн.
                  По мере написания и редакции список представленных книг будет расти.
                  Всем добра и хорошего настроения!
                  </p>
                  <p>
                      По вопросам и предложениям вы можете написать мне на почту kuussa99@gmail.com
                  </p>
              </div>

            </Modal>


        </div>
    );
}

export default Introduction
