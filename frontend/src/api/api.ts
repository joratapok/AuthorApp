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
export type CurrentRateType = {
    book: number
    rate: number
    avg_rate: {
      avg_rate: number
      count_rate: number
    }
}

export const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    withCredentials: true,

})

export const bookApi = {
    getAllBooks() {
        return instance.get<GetAllBooksType>('book/').then(res => res)
    },
    getBookById(id: number, JWTToken: string | null) {
        return instance.get<OneBookType>(`book/${id}/`, {
              headers: { 'Authorization': `JWT ${JWTToken}` }
        }).then(res => res)
    }
}

export const rateApi = {
    patchRate(bookId: number, data: number, JWTToken: any) {
        return instance.patch<CurrentRateType>(`book_relation/${bookId}/`, {
            'rate': data,
        }, {
            headers: {'Authorization': `JWT ${JWTToken}`}
        }).then(res => res.data)
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
    getNewCommentsPage(url: string) {
        return axios.get<CommentsDataType>(url).then(res => res)
    },
    patchComment(id: number, textMessage: string, JWTToken: any) {
        return instance.patch(`add_comments/${id}/`, {
            'text': textMessage,
        }, {
          headers: {'Authorization': `JWT ${JWTToken}`}
        })
    }
}
