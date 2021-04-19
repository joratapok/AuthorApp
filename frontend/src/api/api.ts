import axios from "axios";
import {bookType, OneBookType} from "../redux/bookReducer";
import {CommentType} from "../redux/commentReducer";

type GetAllBooksType = {
    results: Array<bookType>
}
export type getAuthMeType = {
        id: number
        email: string
        username: string
}
export type JWTResponseType = {
    refresh: string
    access: string
}

export type LoginFormDataType = {
    username: string
    password: string
}
export type CommentsDataType = {
    count: number
    next: null | string
    previous: null | string
    results: Array<CommentType>
}

export const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    withCredentials: true,

})

export const bookApi = {
    getAllBooks() {
        return instance.get<GetAllBooksType>('book/').then(res => res)
    },
    getBookById(id: number) {
        return instance.get<OneBookType>(`book/${id}/`).then(res => res)
    }
}

export const rateApi = {
    patchRate(id: number, data: number) {
        return instance.patch(`book_relation/${id}/`, {
            'rate': data,
        })
    }
}

export const authApi = {
    postCreateJWT(data: LoginFormDataType) {
        return instance.post<JWTResponseType>('api/token/', {
            username: data.username,
            password: data.password,
        }).then(res => res.data)
    },
    postRefreshJWT(data: string) {
        return instance.post<JWTResponseType>('api/token/refresh/', {
            refresh: data,
        }).then(res => res.data)
    },
    getAuthMe(JWTToken: string) {
        return instance.get<getAuthMeType>('auth/users/me/', {
            headers: {
                'Authorization': `JWT ${JWTToken}`
            }
        }).then(res => res.data)
    }
}

export const commentApi = {
    getComments(id: number) {
        return instance.get<CommentsDataType>(`comments/${id}/`).then(res => res)
    },
    patchComment(id: number, textMessage: string, JWTToken: any) {
        return instance.patch(`add_comments/${id}/`, {
            'text': textMessage,
        }, {
          headers: {'Authorization': `JWT ${JWTToken}`}
        },
        )
    }
}
