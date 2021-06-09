import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { getAllBooks } from '../../redux/bookReducer'
import BooksList from './BooksList'
import { bookType } from '../common/types/types'
import { pageTransition, pageVariants } from '../Body'
import { motion } from 'framer-motion'

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
            <motion.div initial='out'
                animate='in'
                exit='out'
                variants={pageVariants}
                transition={pageTransition}>
                <BooksList books={books}/>
            </motion.div>
        )
    }

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    books: state.books.books
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    { getAllBooks })(BooksContainer)
