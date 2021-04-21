import React, {useState} from 'react'
import classes from './Book.module.css'
import {bookType} from "../../../redux/bookReducer";
import {NavLink} from "react-router-dom";


type BookType = {
    key: number
    book: bookType
}

const Book: React.FC<BookType> = ({book}) => {

    const [hover, setHover] = useState(false)
    const setHoverOn = () => {
        setHover(true)
    }
    const setHoverOff = () => {
        setHover(false)
    }

    let classButton = classes.readButton + ' ' + (hover ? classes.hoverButton : '')
    let classCover = classes.passiveBook + ' ' + (hover ? classes.activeBook : '')
    let imageWrapper = classes.activeImageWrapper + ' ' + (hover ? classes.passiveImageWrapper : '')

    return (
        <div className={classes.bookWrapper}>

            <button className={classButton}
                    onMouseEnter={setHoverOn}
                    onMouseLeave={setHoverOff}>
                Скачать
            </button>

            <div className={classes.coverWrapper}
                 onMouseEnter={setHoverOn}
                 onMouseLeave={setHoverOff}>
                <div className={imageWrapper}>
                    <NavLink activeClassName={classes.active} to={'/book' + book.id}>
                        <div className={classCover}/>
                    </NavLink>

                    <img className={classes.cover} src={book.poster} alt={'Обложка'}/>
                </div>
            </div>
            <div className={classes.genreWrapper}>
                Fantasy / Comedy
            </div>

            <div className={classes.bookNameWrapper}>
                {book.name}
            </div>
        </div>
    )
}

export default Book;
