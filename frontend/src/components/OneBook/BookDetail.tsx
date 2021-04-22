import React, {useState} from 'react'
import classes from './BookDetail.module.css'
import {OneBookType,} from "../../redux/bookReducer"
import {commentsInitialType} from "../../redux/commentReducer"
import {addCommentDataType} from "./Comments/CommentForm"
import Comments from "./Comments/Comments"
import Modal from "./Modal/Modal"
import {AuthinitialType} from "../../redux/authReducer"
import {Rating} from "@material-ui/lab";
import Container from "@material-ui/core/Container";

type BookDetailType = {
    book: OneBookType
    comments: commentsInitialType
    auth: AuthinitialType
    addComment: (data: addCommentDataType) => void
    fetchNewPageComments: (url: string | null) => void
    setCurrentRatingThunk: (bookId: number, data: number | null, JWTToken: any) => void
}

export const BookDetail: React.FC<BookDetailType> = ({
                                                         book, comments,
                                                         auth, addComment,
                                                         fetchNewPageComments, setCurrentRatingThunk
                                                     }) => {

    const [modal, setModal] = useState(false)
    let buttonModalOffClass = classes.buttonModalOff + ' ' + (modal ? classes.activeButtonModalOff : '')

    const onStarClick = (newValue: number | null) => {
        setCurrentRatingThunk(book.id, newValue, auth.accessToken)
    }

    return (
        <div className={classes.bookWrapper}>
            <div className={classes.bookDetailWrapper}>
                <div className={classes.posterWrapper}>
                    <img src={book.poster} alt={"Обложка"}/>
                </div>
                <div className={classes.descriptionWrapper}>
                    <button onClick={() => setModal(true)}>Читать</button>
                    <a href={book.book_file} download>Скачать</a>
                    <div className={classes.ratingWrapper}>
                        <Rating
                            name="simple-controlled"
                            value={book.current_rate}
                            onChange={(event, newValue) => {
                                onStarClick(newValue);
                            }}
                        />
                        Средний рейтинг: {book.rated_books} Всего оценило {book.count_rate}
                    </div>


                    <div className={classes.bookNameWrapper}>
                        {book.name}
                    </div>
                </div>
            </div>
            <div>
                <Comments addComment={addComment}
                          comments={comments}
                          fetchNewPageComments={fetchNewPageComments}/>
            </div>
            <Modal setOn={modal}/>
            <button className={buttonModalOffClass}
                    onClick={() => setModal(false)}>Не Читать
            </button>
        </div>
    )
}

export default BookDetail;
