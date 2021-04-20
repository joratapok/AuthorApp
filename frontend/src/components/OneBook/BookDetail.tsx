import React, {useState} from 'react'
import classes from './BookDetail.module.css'
import {OneBookType,} from "../../redux/bookReducer"
import {commentsInitialType} from "../../redux/commentReducer"
import {addCommentDataType} from "./Comments/CommentForm"
import Comments from "./Comments/Comments"
import Modal from "./Modal/Modal"
import StarRatingComponent from 'react-star-rating-component'
import {AuthinitialType} from "../../redux/authReducer"

type BookDetailType = {
    book: OneBookType
    comments: commentsInitialType
    auth: AuthinitialType
    addComment: (data: addCommentDataType) => void
    fetchNewPageComments: (url: string) => void
    setCurrentRatingThunk: (bookId: number, data: number, JWTToken: any) => void
}

export const BookDetail: React.FC<BookDetailType> = ({
                                                         book, comments,
                                                         auth, addComment,
                                                         fetchNewPageComments, setCurrentRatingThunk
                                                     }) => {

    const [modal, setModal] = useState(false)
    let buttonModalOffClass = classes.buttonModalOff + ' ' + (modal ? classes.activeButtonModalOff : '')

    const onStarClick = (nextValue: number, prevValue: number, name: string) => {
        setCurrentRatingThunk(book.id, nextValue, auth.accessToken)
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
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={book.current_rate}
                            onStarClick={onStarClick}/>
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
