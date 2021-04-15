import {AppStateType, InferActionsTypes} from "./store";
import {bookApi} from "../api/api";
import {ThunkAction} from "redux-thunk";

export type bookType = {
    id: number
    name: string
    poster: string
    rated_books: string

}
export type initialType = typeof initial
export type bookReducerActionsTypes = InferActionsTypes<typeof actionsBooksReducer>
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, bookReducerActionsTypes>


export const SET_NEW_BOOKS = "SET_NEW_BOOKS"

let initial = {
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
        default:
            return state
    }
}

export const actionsBooksReducer = {
    setNewBooks: (newBooks: Array<bookType>) => ({type: SET_NEW_BOOKS, newBooks} as const)
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

export default bookReducer
