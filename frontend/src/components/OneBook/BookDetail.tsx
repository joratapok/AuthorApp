import React, {useState} from 'react'
import classes from './BookDetail.module.css'
import {OneBookType,} from "../../redux/bookReducer"
import {commentsInitialType} from "../../redux/commentReducer"
import {addCommentDataType} from "./Comments/CommentForm"
import Comments from "./Comments/Comments"
import Modal from "./Modal/Modal"

type BookDetailType = {
    book: OneBookType
    comments: commentsInitialType
    addComment: (data: addCommentDataType) => void
}

export const BookDetail: React.FC<BookDetailType> = ({book, comments, addComment}) => {

    const [modal, setModal] = useState(false)
    let buttonModalOffClass = classes.buttonModalOff + ' ' + ( modal ? classes.activeButtonModalOff : '')

    return (
        <div className={classes.bookWrapper}>
            <div className={classes.bookDetailWrapper}>
                <div className={classes.posterWrapper}>
                    <img src={book.poster} alt={"Обложка"}/>
                </div>
                <div className={classes.descriptionWrapper}>
                    <button onClick={() => setModal(true)}>Читать</button>
                    <button>Скачать</button>
                    <div className={classes.ratingWrapper}>
                        {book.rated_books}
                    </div>
                    <div className={classes.bookNameWrapper}>
                        {book.name}
                    </div>
                </div>
            </div>
            <div>
                <Comments addComment={addComment} comments={comments}/>
            </div>
            <Modal setOn={modal}/>
            <button className={buttonModalOffClass}
                    onClick={() => setModal(false)}>Не Читать</button>
        </div>
    )
}

export default BookDetail;
