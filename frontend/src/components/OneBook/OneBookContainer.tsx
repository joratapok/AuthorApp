import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {AppStateType} from "../../redux/store"
import {OneBookType, getBookByIdThunk} from "../../redux/bookReducer"
import {compose} from "redux"
import {withRouter, RouteComponentProps} from "react-router-dom"
import BookDetail from "./BookDetail"
import {addNewCommentThunk, commentsInitialType, getCommentsToBookThunk} from "../../redux/commentReducer";
import {addCommentDataType} from "./Comments/CommentForm"

type MapStateToPropsType = {
    book: OneBookType
    comments: commentsInitialType
}
type MapDispatchToPropsType = {
    getBookByIdThunk: (id: number) => void
    getCommentsToBookThunk: (id: number) => void
    addNewCommentThunk: (id: number, text: string) => void
}
type OwnPropsType = {}
type PathParamsType = {
    bookId: string
}
type OneBookPropsType = MapDispatchToPropsType & MapStateToPropsType & OwnPropsType
    & RouteComponentProps<PathParamsType>


const OneBookContainer: React.FC<OneBookPropsType> =
    ({book,comments, getBookByIdThunk,
         addNewCommentThunk, getCommentsToBookThunk, ...props}) => {

    const onSubmit = (formData: addCommentDataType) => {
        let bookId = props.match.params.bookId
        addNewCommentThunk(Number(bookId), formData.text)
    }

    useEffect(() => {
        let bookId = (props.match.params.bookId)
            ? props.match.params.bookId
            : '1'
        getBookByIdThunk(Number(bookId))
        getCommentsToBookThunk(Number(bookId))
    }, [])

    return (
        <div>
            <BookDetail comments={comments} book={book} onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    book: state.books.book,
    comments: state.comments,
})

export default compose<React.ComponentType>(
connect(mapStateToProps, {getBookByIdThunk, getCommentsToBookThunk, addNewCommentThunk}),
withRouter,)(OneBookContainer)
