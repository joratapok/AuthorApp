import {AppStateType, InferActionsTypes} from "./store";
import {bookApi, commentApi, CommentsDataType} from "../api/api";
import {ThunkAction} from "redux-thunk";

export type CommentType = {
    id: number
    text: string
    owner: string
    book: number
}

export type commentsInitialType = typeof initial
export type bookReducerActionsTypes = InferActionsTypes<typeof actionsBooksReducer>
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, bookReducerActionsTypes>


export const GET_BOOK_COMMENTS = "GET_BOOK_COMMENTS"

let initial = {
    count: 0 as number,
    next: null as null | string,
    previous: null as null | string,
    results: [] as Array<CommentType>,
}

const commentReducer = (state = initial, action: bookReducerActionsTypes): commentsInitialType => {
    switch (action.type) {
        case GET_BOOK_COMMENTS:
            return {
                ...state,
                count: action.commentsData.count,
                next: action.commentsData.next,
                previous: action.commentsData.previous,
                results: action.commentsData.results
            }
        default:
            return state
    }
}

export const actionsBooksReducer = {
    getComments: (commentsData: CommentsDataType) => ({type: GET_BOOK_COMMENTS, commentsData} as const),
}

export const getCommentsToBookThunk = (id: number): ThunkType => {
    return async (dispatch) => {
        try {
            const response = await commentApi.getComments(id)
            dispatch(actionsBooksReducer.getComments(response.data))
        } catch (e) {
            console.error(e)
        }
    }
}

export const addNewCommentThunk = (id: number, data: string): ThunkType => {
    return async (dispatch) => {
        try {
            await commentApi.patchComment(id, data)
            getCommentsToBookThunk(id)
        } catch (e) {
            console.error(e)
        }
    }
}

export default commentReducer
