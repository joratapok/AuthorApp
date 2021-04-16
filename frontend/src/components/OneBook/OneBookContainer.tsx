import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {AppStateType} from "../../redux/store"
import {OneBookType, getBookByIdThunk} from "../../redux/bookReducer"
import {compose} from "redux"
import {withRouter, RouteComponentProps} from "react-router-dom"
import BookDetail from "./BookDetail"

type MapStateToPropsType = {
    book: OneBookType
}
type MapDispatchToPropsType = {
    getBookByIdThunk: (id: number) => void
}
type OwnPropsType = {}
type PathParamsType = {
    bookId: string
}


const OneBookContainer: React.FC<MapDispatchToPropsType & MapStateToPropsType & RouteComponentProps<PathParamsType>> =
    ({book, getBookByIdThunk, ...props}) => {

    useEffect(() => {
        let bookId = (props.match.params.bookId)
            ? props.match.params.bookId
            : '1'
        getBookByIdThunk(Number(bookId))
    }, [])

    return (
        <div>
            <BookDetail book={book}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    book: state.books.book
})



export default compose<React.ComponentType>(
connect(mapStateToProps, {getBookByIdThunk}),
withRouter,)(OneBookContainer)
