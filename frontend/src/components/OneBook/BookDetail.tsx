import React, {useState} from 'react'
import classes from './BookDetail.module.css'
import {OneBookType,} from "../../redux/bookReducer"
import {commentsInitialType} from "../../redux/commentReducer"
import {addCommentDataType} from "./Comments/CommentForm"
import Comments from "./Comments/Comments"
import Modal from "./Modal/Modal"
import {AuthinitialType} from "../../redux/authReducer"
import {Rating} from "@material-ui/lab";
import {Box, createStyles, Grid, makeStyles, Paper, Theme, Typography} from "@material-ui/core";

type BookDetailType = {
    book: OneBookType
    comments: commentsInitialType
    auth: AuthinitialType
    addComment: (data: addCommentDataType) => void
    fetchNewPageComments: (url: string | null) => void
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

        }
    }),
);

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

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <img src={book.poster} alt={"Обложка"}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper className={cl.paper}>
                        <button onClick={() => setModal(true)}>Читать</button>
                        <a href={book.book_file} download>Скачать</a>
                        <Box borderRadius='50%' bgcolor='#BAD227' alignSelf='flex-start' p={1}>
                            <Typography className={cl.typography}>{book.rated_books}</Typography>
                        </Box>
                        Всего оценок: {book.count_rate}

                        <Rating
                            name="simple-controlled"
                            value={book.current_rate}
                            onChange={(event, newValue) => {
                                onStarClick(newValue);
                            }}
                        />

                        <Typography variant="h4" component="h2">
                            {book.name}
                        </Typography>

                    </Paper>
                </Grid>
            </Grid>

            <div>
                <Comments addComment={addComment}
                          comments={comments}
                          fetchNewPageComments={fetchNewPageComments}
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
