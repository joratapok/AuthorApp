import React, {useState} from 'react'
import classes from './BookDetail.module.css'
import {OneBookType,} from "../../redux/bookReducer"
import {commentsInitialType} from "../../redux/commentReducer";
import {addCommentDataType} from "./Comments/CommentForm";
import Comments from "./Comments/Comments";

type BookDetailType = {
    book: OneBookType
    comments: commentsInitialType
    onSubmit: (text: addCommentDataType) => void
}

export const BookDetail: React.FC<BookDetailType> = ({book, comments, onSubmit}) => {

    return (
        <div className={classes.bookWrapper}>
            <div className={classes.bookDetailWrapper}>
                <div className={classes.posterWrapper}>
                    <img src={book.poster} alt={"Обложка"}/>
                </div>
                <div className={classes.descriptionWrapper}>
                    <button>Читать</button>
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
                <Comments onSubmit={onSubmit} comments={comments}/>
            </div>
        </div>
    )
}

export default BookDetail;
