import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {AppStateType} from "../../../redux/store"
import {getChaptersThunk} from "../../../redux/bookReducer"
import {compose} from "redux"
import {withRouter, RouteComponentProps} from "react-router-dom"
import Container from "@material-ui/core/Container";
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
    setOn: any
}
type BoxContainerType = MapDispatchToPropsType & MapStateToPropsType & OwnPropsType

const ReaderBoxContainer: React.FC<BoxContainerType> =
    ({bookId, chapters, getChaptersThunk, setOn}) => {

    const getNewChapter = (event: object, numPage: number) => {
        getChaptersThunk(bookId, numPage)
    }

    useEffect(() => {
        getChaptersThunk(bookId)
    }, [])

    return (
        <div>
            <ReaderBox bookId={bookId}
            chapters={chapters}
            setOn={setOn}
            getNewChapter={getNewChapter}
            />
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    bookId: state.books.book.id,
    // @ts-ignore
    chapters: state.books.chapters,
})

export default compose<React.ComponentType>(
connect(mapStateToProps, {getChaptersThunk}),
withRouter,)(ReaderBoxContainer)
