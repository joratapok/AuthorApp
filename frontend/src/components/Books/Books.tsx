import React, {useState} from 'react'
import classes from './Books.module.css'
import {bookType} from "../../redux/bookReducer";
import Book from "./Book/Book";

type BooksType = {
    books: Array<bookType>
}

const Books: React.FC<BooksType> = ({books}) => {

    return (
        <div className={classes.booksWrapper}>
            <div className={classes.booksRowWrapper}>
                {books.map((el) => {
                    return <Book key={el.id} book={el}/>
                })}
            </div>
        </div>
    )
}

export default Books;
