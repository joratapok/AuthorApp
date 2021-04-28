import {AppStateType, InferActionsTypes} from "./store";
import {bookApi, rateApi, ChaptersType} from "../api/api";
import {ThunkAction} from "redux-thunk";

export type bookType = {
    id: number
    name: string
    mini_poster: string
    rated_books: string

}
export type OneBookType = {
    id: number
    name: string
    poster: string
    rated_books: number
    current_rate: number
    count_rate: number
    book_file: string
    description: string
    readerMode: boolean
}

type Chapter = {
  chapter: string
}


export type initialType = typeof initial
export type bookReducerActionsTypes = InferActionsTypes<typeof actionsBooksReducer>
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, bookReducerActionsTypes>


export const SET_NEW_BOOKS = "SET_NEW_BOOKS"
export const SET_NEW_BOOK = "SET_NEW_BOOK"
export const SET_CURRENT_RATING = "SET_CURRENT_RATING"
export const SET_AVG_RATING = "SET_AVG_RATING"
export const SET_COUNT_RATE = "SET_COUNT_RATE"
export const SET_NEW_CHAPTER = "SET_NEW_CHAPTER"
export const CHANGE_READER_MODE = "CHANGE_READER_MODE"





let initial = {
    book: {
        id: 0,
        name: 'initialBook',
        poster: '',
        rated_books: 0,
        current_rate: 0,
        count_rate: 0,
        book_file: '',
        description: '',
        readerMode: false,
    } as OneBookType,

    books: [
        {
            id: 0,
            name: 'initialBook',
            mini_poster: '',
            rated_books: '0',
        }
    ] as Array<bookType>,

    chapters: {
        count: 0,
        next: '',
        previous: '',
        results: [{chapter: 'Что то пошло не так...'}] as Array<Chapter>,
    },
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
        case SET_CURRENT_RATING:
            return {
                ...state,
                book: {...state.book, current_rate: action.rating}
            }
        case SET_AVG_RATING:
            return {
                ...state,
                book: {...state.book, rated_books: action.avgRating}
            }
        case SET_COUNT_RATE:
            return {
                ...state,
                book: {...state.book, count_rate: action.count_rate}
            }
        case SET_NEW_CHAPTER:
            return {
                ...state,
                chapters: action.chapters
            }
        case CHANGE_READER_MODE:
            return {
                ...state,
                book: {...state.book, readerMode: action.toggle}
            }

        default:
            return state
    }
}

export const actionsBooksReducer = {
    setNewBooks: (newBooks: Array<bookType>) => ({type: SET_NEW_BOOKS, newBooks} as const),
    setNewBook: (newBook: OneBookType) => ({type: SET_NEW_BOOK, newBook} as const),
    setCurrentRating: (rating: number) => ({type: SET_CURRENT_RATING, rating} as const),
    setAVGRating: (avgRating: number) => ({type: SET_AVG_RATING, avgRating} as const),
    setCount_rate: (count_rate: number) => ({type: SET_COUNT_RATE, count_rate} as const),
    setChapters: (chapters: ChaptersType) => ({type: SET_NEW_CHAPTER, chapters} as const),
    changeReaderMode: (toggle: boolean) => ({type: CHANGE_READER_MODE, toggle} as const),
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

export const getBookByIdThunk = (id: number, JWTToken: string): ThunkType => {
    return async (dispatch) => {
        try {
            let response = await bookApi.getBookById(id, JWTToken)
            response.data.rated_books = Number(response.data.rated_books)
            dispatch(actionsBooksReducer.setNewBook(response.data))
        } catch (e) {
            console.error(e)
        }
    }
}

export const setCurrentRatingThunk = (bookId: number, data: number | null, JWTToken: any): ThunkType => {
    return async (dispatch) => {
        try {
            const response = await rateApi.patchRate(bookId, data, JWTToken)
            dispatch(actionsBooksReducer.setCurrentRating(response.rate))
            dispatch(actionsBooksReducer.setAVGRating(response.avg_rate.avg_rate))
            dispatch(actionsBooksReducer.setCount_rate(response.avg_rate.count_rate))
        } catch (e) {
            console.error(e)
        }
    }
}

export const getChaptersThunk = (bookId: number, numPage: number = 1): ThunkType => {
    return async (dispatch) => {
        try {
            const chapters = await bookApi.getChapterPage(bookId, numPage)
            dispatch(actionsBooksReducer.setChapters(chapters))
        } catch (e) {
            console.error(e)
        }
    }
}

export default bookReducer
