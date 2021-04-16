import React, {useState} from 'react'
import classes from './BookDetail.module.css'
import {OneBookType,} from "../../redux/bookReducer"

type BookDetailType = {
    book: OneBookType
}

export const BookDetail: React.FC<BookDetailType> = ({book}) => {

    return (
        <div className={classes.bookWrapper}>
            <div className={classes.bookDetailWrapper}>
                <div className={classes.posterWrapper}>
                    <img src={book.poster}/>
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
              COmments will be there
            </div>
        </div>
    )
}

export default BookDetail;
