import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {AppStateType} from "../../redux/store"
import {AuthinitialType} from "../../redux/authReducer"
import {OneBookType, getBookByIdThunk} from "../../redux/bookReducer"
import {compose} from "redux"
import {withRouter, RouteComponentProps} from "react-router-dom"
import BookDetail from "./BookDetail"
import {addNewCommentThunk, commentsInitialType, getCommentsToBookThunk} from "../../redux/commentReducer";
import {addCommentDataType} from "./Comments/CommentForm"

type MapStateToPropsType = {
    book: OneBookType
    comments: commentsInitialType
    auth: AuthinitialType
}
type MapDispatchToPropsType = {
    getBookByIdThunk: (id: number) => void
    getCommentsToBookThunk: (id: number) => void
    addNewCommentThunk: (id: number, text: string, JWTToken: string | null) => void
}
type OwnPropsType = {}
type PathParamsType = {
    bookId: string
}
type OneBookPropsType = MapDispatchToPropsType & MapStateToPropsType & OwnPropsType
    & RouteComponentProps<PathParamsType>


const OneBookContainer: React.FC<OneBookPropsType> =
    ({book, comments, auth, getBookByIdThunk,
         addNewCommentThunk, getCommentsToBookThunk, ...props}) => {

    const addComment = (formData: addCommentDataType) => {
        let bookId = props.match.params.bookId
        addNewCommentThunk(Number(bookId), formData.text, auth.accessToken)
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
            <BookDetail comments={comments} book={book} addComment={addComment}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    book: state.books.book,
    comments: state.comments,
    auth: state.auth

})

export default compose<React.ComponentType>(
connect(mapStateToProps, {getBookByIdThunk, getCommentsToBookThunk, addNewCommentThunk}),
withRouter,)(OneBookContainer)
