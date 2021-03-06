import React, { useState } from 'react'
import classes from './BookDetail.module.css'
import { commentsInitialType } from '../../redux/commentReducer'
import { addCommentDataType } from './Comments/CommentForm'
import { Comments } from './Comments/Comments'
import ReaderBoxContainer from './ReaderBox/ReaderBoxContainer'
import { AuthinitialType } from '../../redux/authReducer'
import {
    Box, createStyles, Grid, makeStyles, withStyles,
    Button, Paper, Theme, Typography, Tooltip
} from '@material-ui/core'
import { deepOrange, green } from '@material-ui/core/colors'
import { OneBookType } from '../common/types/types'
import { Rating } from '@material-ui/lab'
import activeCat from '../../assets/image/rubberDuck/activeCat.png'
import passiveCat from '../../assets/image/rubberDuck/passiveCat.png'
import ReplyIcon from '@material-ui/icons/Reply'
import { NavLink } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

type BookDetailType = {
    book: OneBookType
    comments: commentsInitialType
    auth: AuthinitialType
    addComment: (data: addCommentDataType) => void
    fetchNewPageComments: (id: number, page: number) => void
    setCurrentRatingThunk: (bookId: number, data: number | null, JWTToken: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(3),
            textAlign: 'center',
            height: '100%',
            color: theme.palette.text.primary
        },
        paperCover: {
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        typography: {
            fontWeight: 700,
            color: 'white'
        },
        totalMarks: {},
        xButton: {
            width: 50,
            height: 50
        }
    })
)

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11
    }
}))(Tooltip)
const DownloadButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[400],
        '&:hover': {
            backgroundColor: deepOrange[600]
        }
    }
}))(Button)
const ReadButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(green[600]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700]
        }
    }
}))(Button)

export const BookDetail: React.FC<BookDetailType> = React.memo(({
    book, comments,
    auth, addComment,
    fetchNewPageComments, setCurrentRatingThunk
}) => {
    const cl = useStyles()
    const [modal, setModal] = useState(false)

    const onStarClick = (newValue: number | null) => {
        setCurrentRatingThunk(book.id, newValue, auth.accessToken)
    }

    const setReaderOn = () => {
        setModal(true)
    }
    const setReaderOff = ():any => {
        setModal(false)
    }

    return (
        <div className={classes.bookWrapper}>
            <Box height='100px' position='relative'>

                <LightTooltip disableFocusListener
                    title="??????????"
                    placement="right">
                    <Box position='absolute' left='8px' bottom='24px' width='42px' height='42px' borderRadius='50%' bgcolor='white'>
                        <NavLink className={classes.navLink} to='/'>
                            <ReplyIcon style={{ color: 'primary', fontSize: 40 }} />
                        </NavLink>
                    </Box>
                </LightTooltip>

            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper className={cl.paperCover}>
                        {book.poster ? <img src={book.poster} alt={'??????????????'}/> : <CircularProgress/>}
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper className={cl.paper}>
                        <Box display='flex' alignItems='center' mt={1} mb={2}>
                            <Box mx={2} width='50%'>
                                <a href={book.book_file}>
                                    <DownloadButton variant="contained" color="primary" className={classes.margin}
                                        fullWidth>
                                        ??????????????
                                    </DownloadButton></a>
                            </Box>
                            <Box mx={2} width='50%'>
                                <ReadButton variant="contained" color="primary" className={classes.margin}
                                    onClick={setReaderOn} fullWidth>
                                    ????????????
                                </ReadButton>
                            </Box>
                        </Box>

                        <Box display='flex' alignItems='center'>
                            <Box width='40px' height='40px' borderRadius='50%' bgcolor='#BAD227' alignSelf='flex-start'
                                p={1}>
                                <Typography className={cl.typography}>{book.rated_books}</Typography>
                            </Box>
                            <Box mx={1}>????????-??????????????. ?????????? ??????????????????: {book.count_rate}</Box>
                        </Box>

                        <Box my={1} display='flex' alignSelf='flex-start'>
                            {!auth.isAuth &&
                            <LightTooltip disableFocusListener
                                enterTouchDelay={10}
                                title="?????? ???????? ?????????????? ?????????? ???????????????????? ????????????????????????????"
                                placement="right">
                                <Box>
                                    <Box width='200px'>
                                        <Rating name="bookRating"
                                            icon={<img width='50px' src={activeCat} alt={'active rating icon'}/>}
                                            emptyIcon={<img width='50px' src={passiveCat} alt={'disabled rating icon'} />}
                                            value={Math.floor(book.rated_books)}
                                            readOnly={!auth.isAuth}
                                            onChange={(event, newValue) => {
                                                onStarClick(newValue)
                                            }}/>
                                    </Box>
                                </Box>
                            </LightTooltip>
                            }

                            {auth.isAuth && <Box width='200px'>
                                <Rating name="bookRating"
                                    icon={<img width='50px' src={activeCat} alt={'active rating icon'}/>}
                                    emptyIcon={<img width='50px' src={passiveCat} alt={'disabled rating icon'}/>}
                                    value={book.current_rate}
                                    onChange={(event, newValue) => {
                                        onStarClick(newValue)
                                    }}/>
                            </Box>
                            }
                        </Box>

                        <Typography variant="h4" style={{ fontFamily: 'Pacifico', margin: '5px 0' }}>
                            {book.name}
                        </Typography>
                        <Typography variant="body2">
                            {book.description}
                        </Typography>

                    </Paper>
                </Grid>
            </Grid>

            <div>
                <Comments addComment={addComment}
                    comments={comments}
                    fetchNewPageComments={fetchNewPageComments}
                    bookId={book.id}
                    isAuth={auth.isAuth}/>
            </div>
            <ReaderBoxContainer toggleReader={modal} setReaderOff={setReaderOff} />

        </div>
    )
})

BookDetail.displayName = 'BookDetail'
