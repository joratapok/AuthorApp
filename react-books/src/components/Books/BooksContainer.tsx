import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { getAllBooks } from '../../redux/bookReducer'
import BooksList from './BooksList'
import { bookType } from '../common/types/types'

type MapStateToPropsType = {
    books: Array<bookType>
}
type MapDispatchToPropsType = {
    getAllBooks: () => void
}
type OwnPropsType = {}

const BooksContainer: React.FC<MapDispatchToPropsType & MapStateToPropsType> =
    ({ getAllBooks, books }) => {
        useEffect(() => {
            getAllBooks()
        }, [])

        return (
            <>
                <BooksList books={books}/>
            </>
        )
    }

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    books: state.books.books
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    { getAllBooks })(BooksContainer)
