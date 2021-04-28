import React, {useEffect, useState} from 'react'
import c from './ReaderBox.module.css'
import {ChaptersType} from "../../../api/api"
import {Pagination} from "@material-ui/lab"
import {Box} from "@material-ui/core"
import ScrollContainer from "react-indiana-drag-scroll";
import Modal from '@material-ui/core/Modal';
import {Fade, IconButton, Backdrop} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

type ReaderBoxType = {
    bookId: number
    chapters: ChaptersType
    toggleReader: boolean
    getNewChapter: (event: object, numPage: number) => void
    setReaderOff: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    xButton: {
        width: 50,
        height: 50,
    },
  }),
);

export const ReaderBox: React.FC<ReaderBoxType & any> = ({bookId, chapters, toggleReader, getNewChapter, setReaderOff}) => {
    const classes = useStyles();

    const [modal, setModal] = useState(false)
    const buttonModalOffClass = c.buttonModalOff + ' ' + (modal ? c.activeButtonModalOff : '')

    const turnOffModal = () => {
      setModal(false)
    }

    useEffect(() => {
        setModal(toggleReader)
    }, [toggleReader])


    return (
      <div>
          <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                >
                <Fade in={modal}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p>

                        <Box className={buttonModalOffClass}>
                            <IconButton aria-label="delete"
                                        color='secondary'
                                        onClick={setReaderOff}>
                                <CloseIcon className={classes.xButton} />
                            </IconButton>
                        </Box>

                    </div>
                </Fade>
            </Modal>


        </div>
    )
}

export default ReaderBox;
