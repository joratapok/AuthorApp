import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {AppStateType} from "../../../redux/store"
import {getChaptersThunk} from "../../../redux/bookReducer"
import {compose} from "redux"
import {withRouter} from "react-router-dom"
import {ChaptersType} from "../../../api/api"
import ReaderBox from "./ReaderBox"

type MapStateToPropsType = {
    bookId: number
    chapters: ChaptersType
}
type MapDispatchToPropsType = {
    getChaptersThunk: (bookId: number, numPage?: number) => void
}
type OwnPropsType = {
    toggleReader: boolean
}
type BoxContainerType = MapDispatchToPropsType & MapStateToPropsType & OwnPropsType

const ReaderBoxContainer: React.FC<BoxContainerType> =
    ({bookId, chapters, getChaptersThunk, toggleReader}) => {

    const getNewChapter = (event: object, numPage: number) => {
        getChaptersThunk(bookId, numPage)
    }

    useEffect(() => {
        getChaptersThunk(bookId)
    }, [bookId])

    return (
        <div>
            <ReaderBox bookId={bookId}
            chapters={chapters} toggleReader={toggleReader}
            getNewChapter={getNewChapter}
            />
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    bookId: state.books.book.id,
    chapters: state.books.chapters,
})

export default compose<React.ComponentType<OwnPropsType>>(
connect(mapStateToProps, {getChaptersThunk}),
withRouter,)(ReaderBoxContainer)
