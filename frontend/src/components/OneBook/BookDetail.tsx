import React, {useState} from 'react'
import classes from './BookDetail.module.css'
import {OneBookType,} from "../../redux/bookReducer"
import {commentsInitialType} from "../../redux/commentReducer"
import {addCommentDataType} from "./Comments/CommentForm"
import Comments from "./Comments/Comments"
import Modal from "./Modal/Modal"
import {AuthinitialType} from "../../redux/authReducer"
import {Rating} from "@material-ui/lab";
import {
    Box, createStyles, Grid, makeStyles, withStyles,
    Button, Paper, Theme, Typography, Tooltip
} from "@material-ui/core";
import {deepOrange, green} from '@material-ui/core/colors';


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
            color: theme.palette.text.secondary,
        },
        typography: {
            fontWeight: 700,
            color: 'white'
        },
        totalMarks: {},
    }),
)

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);
const DownloadButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[400],
        '&:hover': {
            backgroundColor: deepOrange[600],
        },
    },
}))(Button);
const ReadButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(green[600]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);


export const BookDetail: React.FC<BookDetailType> = ({
                                                         book, comments,
                                                         auth, addComment,
                                                         fetchNewPageComments, setCurrentRatingThunk
                                                     }) => {
    const cl = useStyles();
    const [modal, setModal] = useState(false)
    let buttonModalOffClass = classes.buttonModalOff + ' ' + (modal ? classes.activeButtonModalOff : '')

    const onStarClick = (newValue: number | null) => {
        setCurrentRatingThunk(book.id, newValue, auth.accessToken)
    }


    return (
        <div className={classes.bookWrapper}>
            <Box height='100px'></Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <img src={book.poster} alt={"Обложка"}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper className={cl.paper}>
                        <Box display='flex' alignItems='center' my={1}>
                            <Box mx={2} width='50%'>
                                <a href={book.book_file}>
                                    <DownloadButton variant="contained" color="primary" className={classes.margin}
                                                    fullWidth>
                                        Скачать
                                    </DownloadButton></a>
                            </Box>
                            <Box mx={2} width='50%'>
                                <ReadButton variant="contained" color="primary" className={classes.margin}
                                            onClick={() => setModal(true)} fullWidth>
                                    Читать
                                </ReadButton>
                            </Box>
                        </Box>

                        <Box display='flex' alignItems='center'>
                            <Box width='40px' height='40px' borderRadius='50%' bgcolor='#BAD227' alignSelf='flex-start'
                                 p={1}>
                                <Typography className={cl.typography}>{book.rated_books}</Typography>
                            </Box>
                            <Box mx={1}>Всего оценок: {book.count_rate}</Box>
                        </Box>

                        <Box my={1} display='flex' alignSelf='flex-start'>
                            {!auth.isAuth &&
                            <LightTooltip disableFocusListener
                                          title="для того оценить книгу необходимо авторизоваться"
                                          placement="right">
                                <Box>
                                    <Rating
                                        name="simple-controlled"
                                        value={Math.floor(book.rated_books)}
                                        readOnly={!auth.isAuth}
                                        onChange={(event, newValue) => {
                                            onStarClick(newValue);
                                        }}
                                    />
                                </Box>
                            </LightTooltip>
                            }

                            {auth.isAuth && <Rating
                                name="simple-controlled"
                                value={book.current_rate}
                                onChange={(event, newValue) => {
                                    onStarClick(newValue);
                                }}
                            />
                            }
                        </Box>

                        <Typography variant="h4">
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
            <Modal setOn={modal}/>
            <button className={buttonModalOffClass}
                    onClick={() => setModal(false)}>Не Читать
            </button>
        </div>
    )
}

export default BookDetail;
