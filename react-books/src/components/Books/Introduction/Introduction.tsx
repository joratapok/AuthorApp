import React, { useState } from 'react'
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
    },
    paginDark: {
        '& .MuiPaginationItem-root': {
            color: '#e9e9e9'
        }
    }
}))

const Introduction: React.FC = () => {
    const c = useStyles()
    const [modal, setModal] = useState(false)

    const modalOn = () => {
        setModal(true)
    }
    const modalOff = () => {
        setModal(false)
    }

    return (
        <div className={classes.introductionWrapper}>

            <img src={testImage} alt="introduction image" className={classes.test_image} />

            <div className={classes.first}>
                <div className={classes.second}/>
            </div>

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
