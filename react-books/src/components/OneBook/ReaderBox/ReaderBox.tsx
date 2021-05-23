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
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


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
        darkThemeButton: {
          width: 40,
          height: 40,
          color: '#e9e9e9',
        },
        lightThemeButton: {
          width: 40,
          height: 40,
          color: '#1C2833',
        },
        nextButton: {
            margin: theme.spacing(3),
        },
        paginDark: {
          "& .MuiPaginationItem-root": {
            color: "#e9e9e9"
          }
        },
        paginLight: {
          "& .MuiPaginationItem-root": {
            color: "black"
          },
          "& .MuiPaginationItem-textPrimary.Mui-selected": {
            color: "white"
          }
        }
    }),
);






export const ReaderBox: React.FC<ReaderBoxType & any> = ({bookId, chapters, toggleReader, getNewChapter, setReaderOff}) => {
    const cl = useStyles();

    const [modal, setModal] = useState(false)
    const [font, setFont] = useState(18)
    const [dark, setDark] = useState(false)

    const buttonModalOffClass = classes.buttonModalOff + ' ' + (modal ? classes.activeButtonModalOff : '')
    const isNextChapter: boolean = (!chapters.next)

    const addFont = () => {
        setFont(font + 2)
    }

    const subtractFont = () => {
        setFont(font - 2)
    }

    const toggleDark = () => {
        setDark(!dark)
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
                        <Box className={cl.paper}  bgcolor={(dark) ? '#1C2833' : '#e9e9e9' }>
                            <ScrollContainer vertical={true} horizontal={false} hideScrollbars={false}
                                             className={classes.dragScroll}>
                                <Grid container spacing={0}>
                                    <Grid item xs={4}>
                                        <Box display='flex' justifyContent='flex-start' alignItems='center' my={1}>

                                            <IconButton aria-label="add font size"
                                                        color='primary'
                                                        disabled={font > 28}
                                                        onClick={addFont}>
                                                <AddIcon className={cl.fontButtons}/>
                                            </IconButton>
                                            <IconButton aria-label="low font size"
                                                        color='secondary'
                                                        disabled={font < 12}
                                                        onClick={subtractFont}>
                                                <RemoveIcon className={cl.fontButtons}/>
                                            </IconButton>

                                            <IconButton aria-label="dark theme"
                                                        onClick={toggleDark}>
                                                <FiberManualRecordIcon  className={dark ? cl.darkThemeButton : cl.lightThemeButton}/>
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
                                                        classes={dark ? {ul: cl.paginDark} :  {ul: cl.paginLight} }
                                                        onChange={getNewChapter}
                                                        page={chapters.currentPage}/>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Box mr={1} fontSize={`${font}px`} color={(dark) ? '#e9e9e9' : 'black'}>
                                    {chapters.results.length &&
                                    <div dangerouslySetInnerHTML={{__html: chapters.results[0].chapter}}/>
                                    }
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
