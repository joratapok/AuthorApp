import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Backdrop, Modal } from '@material-ui/core'
import typeCat from '../../../assets/image/typeCatSmall.png'
import testImage from '../../../assets/image/test_image.jpg'
import classes from './Introduction.module.css'
import Intro from './Intro/Intro'

const useStyles = makeStyles(() => createStyles({
    modal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '98%',
        maxWidth: '600px',
        margin: 'auto'
    }
}))

const Introduction: React.FC = () => {
    const c = useStyles()
    const [move, setMove] = useState({ x: 0, y: 0 })
    const [modal, setModal] = useState(false)

    const modalOn = () => {
        setModal(true)
    }
    const modalOff = () => {
        setModal(false)
    }

    const newNum = (num: number) => {
      const x = Math.floor(Math.random() * num)
      return x
    }

    const setFromEvent = () => {
        setMove({ x: newNum(60), y: newNum(40) })
    }

    useEffect(() => {
        const moveIntro = setInterval(setFromEvent, 3000)
        return () => {
            clearInterval(moveIntro)
        }
    }, [])

    return (
        <div className={classes.introductionWrapper}>

            <img src={testImage} alt="introduction image" className={classes.test_image} />

            <div
                className={classes.first}
                style={{ top: `${move.y - 40}px`, left: `${move.x}px` }}
            />

            <div className={classes.introWrapper}>
                <Intro />
            </div>

            <div className={classes.catWrapper}>
                <img
                    src={typeCat}
                    alt="typing cat"
                    className={classes.typingCat}
                    onClick={modalOn}
                />
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
                    timeout: 500
                }}
            >
                <div className={classes.boxIntro}>
                    <p>
                    Приветствую вас друзья 👋 Вы на сайте авторской книги Дарьи Урусовой.
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
    )
}

export default Introduction
