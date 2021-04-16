import {AppStateType, InferActionsTypes} from "./store";
import {bookApi} from "../api/api";
import {ThunkAction} from "redux-thunk";

export type bookType = {
    id: number
    name: string
    poster: string
    rated_books: string

}
export type OneBookType = {
    id: number
    name: string
    poster: string
    rated_books: string
    current_rate: Array<number>
}
export type initialType = typeof initial
export type bookReducerActionsTypes = InferActionsTypes<typeof actionsBooksReducer>
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, bookReducerActionsTypes>


export const SET_NEW_BOOKS = "SET_NEW_BOOKS"
export const SET_NEW_BOOK = "SET_NEW_BOOK"

let initial = {
    book: {
        id: 0,
        name: 'initialBook',
        poster: '',
        rated_books: '0',
        current_rate: [],
    } as OneBookType,

    books: [
        {
            id: 0,
            name: 'initialBook',
            poster: '',
            rated_books: '0',
        }
    ] as Array<bookType>
}

const bookReducer = (state = initial, action: bookReducerActionsTypes): initialType => {
    switch (action.type) {
        case SET_NEW_BOOKS:
            return {
                ...state,
                books: action.newBooks
            }
        case SET_NEW_BOOK:
            return {
                ...state,
                book: action.newBook
            }

        default:
            return state
    }
}

export const actionsBooksReducer = {
    setNewBooks: (newBooks: Array<bookType>) => ({type: SET_NEW_BOOKS, newBooks} as const),
    setNewBook: (newBook: OneBookType) => ({type: SET_NEW_BOOK, newBook} as const)
}

export const getAllBooks = (): ThunkType => {
    return async (dispatch) => {
        try {
            const response = await bookApi.getAllBooks()
            dispatch(actionsBooksReducer.setNewBooks(response.data.results))
        } catch (e) {
            console.error(e)
        }
    }
}

export const getBookByIdThunk = (id: number): ThunkType => {
    return async (dispatch) => {
        try {
            const response = await bookApi.getBookById(id)
            dispatch(actionsBooksReducer.setNewBook(response.data))
        } catch (e) {
            console.error(e)
        }
    }
}

export default bookReducer
