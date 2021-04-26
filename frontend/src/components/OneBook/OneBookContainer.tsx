import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {AppStateType} from "../../redux/store"
import {AuthinitialType} from "../../redux/authReducer"
import {OneBookType, getBookByIdThunk, setCurrentRatingThunk} from "../../redux/bookReducer"
import {compose} from "redux"
import {withRouter, RouteComponentProps} from "react-router-dom"
import BookDetail from "./BookDetail"
import {addNewCommentThunk, commentsInitialType, getCommentsToBookThunk,
   fetchNewPageComments, } from "../../redux/commentReducer";
import {addCommentDataType} from "./Comments/CommentForm"
import classes from "./BookDetail.module.css";
import Container from "@material-ui/core/Container";

type MapStateToPropsType = {
    book: OneBookType
    comments: commentsInitialType
    auth: AuthinitialType
}
type MapDispatchToPropsType = {
    getBookByIdThunk: (id: number, JWTToken: string | null) => void
    getCommentsToBookThunk: (id: number) => void
    addNewCommentThunk: (id: number, text: string, JWTToken: string | null) => void
    fetchNewPageComments: (id: number, page: number) => void
    setCurrentRatingThunk: (bookId: number, data: number | null, JWTToken: any) => void
}
type OwnPropsType = {}
type PathParamsType = {
    bookId: string
}
type OneBookPropsType = MapDispatchToPropsType & MapStateToPropsType & OwnPropsType
    & RouteComponentProps<PathParamsType>


const OneBookContainer: React.FC<OneBookPropsType> =
    ({book, comments, auth, getBookByIdThunk, addNewCommentThunk,
      getCommentsToBookThunk, fetchNewPageComments, setCurrentRatingThunk,  ...props}) => {

    const addComment = (formData: addCommentDataType) => {
        let bookId = props.match.params.bookId
        addNewCommentThunk(Number(bookId), formData.text, auth.accessToken)
    }

    useEffect(() => {
        let bookId = (props.match.params.bookId)
            ? Number(props.match.params.bookId)
            : 1
        getBookByIdThunk(bookId, auth.accessToken)
        getCommentsToBookThunk(bookId)
    }, [])

    return (
        <Container maxWidth="md">
            <BookDetail comments={comments}
            book={book}
            auth={auth}
            addComment={addComment}
            fetchNewPageComments={fetchNewPageComments}
            setCurrentRatingThunk={setCurrentRatingThunk}/>
        </Container>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    book: state.books.book,
    comments: state.comments,
    auth: state.auth

})

export default compose<React.ComponentType>(
connect(mapStateToProps, {getBookByIdThunk, getCommentsToBookThunk,
  addNewCommentThunk, fetchNewPageComments, setCurrentRatingThunk}),
withRouter,)(OneBookContainer)
