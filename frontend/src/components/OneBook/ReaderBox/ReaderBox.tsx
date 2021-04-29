import React, {useEffect, useState} from 'react'
import classes from './ReaderBox.module.css'
import {ChaptersType} from "../../../api/api"
import {Pagination} from "@material-ui/lab"
import {Box} from "@material-ui/core"
import ScrollContainer from "react-indiana-drag-scroll"
import Modal from '@material-ui/core/Modal'
import {Fade, IconButton, Backdrop} from '@material-ui/core'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import Grid from "@material-ui/core/Grid";
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button';


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
            height: '90%',
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(0, 1, 0, 2),
            [theme.breakpoints.up('xs')]: {
                width: '97%',
            },
            [theme.breakpoints.up('sm')]: {
                width: '92%',
            },
            [theme.breakpoints.up('lg')]: {
                width: '85%',
            },
            maxWidth: '1300px',
        },
        xButton: {
            width: 60,
            height: 60,
        },
        fontButtons: {
            width: 40,
            height: 40,
        },
        nextButton: {
            margin: theme.spacing(3),
        },

    }),
);

export const ReaderBox: React.FC<ReaderBoxType & any> = ({bookId, chapters, toggleReader, getNewChapter, setReaderOff}) => {
    const cl = useStyles();

    const [modal, setModal] = useState(false)
    const [font, setFont] = useState(16)

    const buttonModalOffClass = classes.buttonModalOff + ' ' + (modal ? classes.activeButtonModalOff : '')
    const isNextChapter: boolean = (!chapters.next)

    const addFont = () => {
        setFont(font + 2)
    }

    const subtractFont = () => {
        setFont(font - 2)
    }

    useEffect(() => {
        setModal(toggleReader)
    }, [toggleReader])


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={cl.modal}
                open={modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modal}>
                    <>
                        <Box className={cl.paper}>
                            <ScrollContainer vertical={true} horizontal={true} hideScrollbars={false}
                                             className={classes.dragScroll}>
                                <Grid container spacing={0}>
                                    <Grid item xs={4}>
                                        <Box display='flex' justifyContent='flex-start' alignItems='center' my={1}>

                                            <IconButton aria-label="exit"
                                                        color='primary'
                                                        disabled={font > 28}
                                                        onClick={addFont}>
                                                <AddIcon className={cl.fontButtons}/>
                                            </IconButton>
                                            <IconButton aria-label="exit"
                                                        color='secondary'
                                                        disabled={font < 12}
                                                        onClick={subtractFont}>
                                                <RemoveIcon className={cl.fontButtons}/>
                                            </IconButton>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={4}>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Box className={buttonModalOffClass}>
                                            <Box position='fixed'>
                                                <IconButton aria-label="exit"
                                                            color='secondary'
                                                            onClick={setReaderOff}>
                                                    <CloseIcon className={cl.xButton}/>
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box py={1} display='flex' justifyContent='center' alignItems='center'
                                             width='100%' height='100%'>
                                            <Pagination count={chapters.count}
                                                        color="primary"
                                                        onChange={getNewChapter}
                                                        page={chapters.currentPage}/>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Box fontSize={`${font}px`}>
                                    {chapters.results.length && chapters.results[0].chapter}
                                </Box>

                                <Box display='flex' justifyContent='flex-end' my={1}>
                                    <Button
                                        variant="contained"
                                        disabled={isNextChapter}
                                        onClick={() => getNewChapter(null, chapters.currentPage + 1)}
                                        color="primary"
                                        className={cl.nextButton}
                                        endIcon={<Icon>send</Icon>}
                                    >
                                        следующая глава
                                    </Button>
                                </Box>

                            </ScrollContainer>
                        </Box>
                    </>
                </Fade>
            </Modal>
        </div>
    )
}

export default ReaderBox;
