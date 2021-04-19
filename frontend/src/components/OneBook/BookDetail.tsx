import React, {useState} from 'react'
import classes from './BookDetail.module.css'
import {OneBookType,} from "../../redux/bookReducer"
import {commentsInitialType} from "../../redux/commentReducer";
import {addCommentDataType} from "./Comments/CommentForm";
import Comments from "./Comments/Comments";

type BookDetailType = {
    book: OneBookType
    comments: commentsInitialType
    addComment: (data: addCommentDataType) => void
}

export const BookDetail: React.FC<BookDetailType> = ({book, comments, addComment}) => {

    const [modal, setModal] = useState(false)

    let modalClass = classes.modal + ' ' + ( modal ? classes.activeModal : '')
    let contentModalClass = classes.ContentModal + ' ' + ( modal ? classes.activeContentModal : '')

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

            <div className={modalClass}>

                <div className={contentModalClass}>
                <button onClick={() => setModal(false)}>Не читать</button>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat lacus vel lacus ultricies aliquam. In lectus diam, commodo non augue non, lobortis porta metus. Vivamus augue nisi, rutrum id dolor vel, tristique efficitur nunc. Vivamus lacinia suscipit urna sit amet malesuada. Vivamus vitae eros iaculis, pretium nunc eget, mollis quam. Curabitur aliquet, lacus et ultricies lacinia, felis urna gravida magna, sit amet vulputate tortor elit sit amet arcu. Aliquam sit amet tellus id lacus imperdiet accumsan. Curabitur rutrum elementum urna vel imperdiet. Pellentesque consectetur luctus ex eu feugiat. Aenean consectetur quam vel enim eleifend dictum. Fusce eget diam ut nunc facilisis ultrices sed in dolor. Phasellus eu odio rhoncus, accumsan risus suscipit, placerat nisi. Cras efficitur, arcu vel rhoncus gravida, urna risus pellentesque purus, vitae ultricies elit libero aliquam metus.
                Nunc vel urna eget sem sagittis fermentum. Ut sit amet porta dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas auctor lobortis molestie. Nulla viverra ultrices luctus. In hendrerit vestibulum risus. Cras non consequat nibh.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat lacus vel lacus ultricies aliquam. In lectus diam, commodo non augue non, lobortis porta metus. Vivamus augue nisi, rutrum id dolor vel, tristique efficitur nunc. Vivamus lacinia suscipit urna sit amet malesuada. Vivamus vitae eros iaculis, pretium nunc eget, mollis quam. Curabitur aliquet, lacus et ultricies lacinia, felis urna gravida magna, sit amet vulputate tortor elit sit amet arcu. Aliquam sit
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat lacus vel lacus ultricies aliquam. In lectus diam, commodo non augue non, lobortis porta metus. Vivamus augue nisi, rutrum id dolor vel, tristique efficitur nunc. Vivamus lacinia suscipit urna sit amet malesuada. Vivamus vitae eros iaculis, pretium nunc eget, mollis quam. Curabitur aliquet, lacus et ultricies lacinia, felis urna gravida magna, sit amet vulputate tortor elit sit amet arcu. Aliquam sit
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat lacus vel lacus ultricies aliquam. In lectus diam, commodo non augue non, lobortis porta metus. Vivamus augue nisi, rutrum id dolor vel, tristique efficitur nunc. Vivamus lacinia suscipit urna sit amet malesuada. Vivamus vitae eros iaculis, pretium nunc eget, mollis quam. Curabitur aliquet, lacus et ultricies lacinia, felis urna gravida magna, sit amet vulputate tortor elit sit amet arcu. Aliquam sit
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat lacus vel lacus ultricies aliquam. In lectus diam, commodo non augue non, lobortis porta metus. Vivamus augue nisi, rutrum id dolor vel, tristique efficitur nunc. Vivamus lacinia suscipit urna sit amet malesuada. Vivamus vitae eros iaculis, pretium nunc eget, mollis quam. Curabitur aliquet, lacus et ultricies lacinia, felis urna gravida magna, sit amet vulputate tortor elit sit amet arcu. Aliquam sit
                </div>
            </div>

            <div>
                <Comments addComment={addComment} comments={comments}/>
            </div>
        </div>
    )
}

export default BookDetail;
