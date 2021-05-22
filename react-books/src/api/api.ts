import axios from "axios";
import {bookType, CommentType, OneBookType} from "../components/common/types/types";

type GetAllBooksType = {
    results: Array<bookType>
}
export type getAuthMeType = {
        id: number
        email: string
        username: string
}
export type GetAvatarDataType = {
    photo: string
    master: number
}
export type JWTResponseType = {
    token: string
}

export type LoginFormDataType = {
    username: string
    password: string
}
export type SignUpFormDataType = {
    username: string
    email: string
    password: string
    re_password: string
    recaptcha: string | null
}
export type GoogleTokenResponseType = {
    token: string
    user: {
        pk: number
        username: string
        email: string
    }
}
export type CommentsDataType = {
    count: number
    next: string
    previous: string
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
export type RegisterResponseType = {
    email: string
    username: string
    id: number
}
export type ChaptersType = {
  count: number
  next: string
  previous: string
  currentPage: number
  results: Array<Chapter>
}
type Chapter = {
  chapter: string
}

export const instance = axios.create({
    baseURL: 'https://goodbookonly/',
    withCredentials: true,

})

export const bookApi = {
    getAllBooks() {
        return instance.get<GetAllBooksType>('api/books/').then(res => res)
    },
    getBookById(id: number, JWTToken: string) {
        const token = JWTToken ? `JWT ${JWTToken}` : ''
        return instance.get<OneBookType>(`api/books/${id}/`, {
            headers: { 'Authorization': token }
        }).then(res => res)
    },
    getChapterPage(id: number, numPage: number) {
        return instance.get<ChaptersType>(`api/books/chapters/${id}?page=${numPage}`).then(res => res.data)
    },
}

export const rateApi = {
    patchRate(bookId: number, data: number | null, JWTToken: string) {
        return instance.patch<CurrentRateType>(`api/books/book_relation/${bookId}/`, {
            'rate': data,
        }, {
            headers: {'Authorization': `JWT ${JWTToken}`}
        }).then(res => res.data)
    }
}

export const authApi = {
    postCreateJWT(data: LoginFormDataType | SignUpFormDataType) {
        return instance.post<JWTResponseType>('api/token-auth/', {
            username: data.username,
            password: data.password,
        }).then(res => res.data)
    },
    postRefreshJWT(data: string) {
        return instance.post<JWTResponseType>('api/token-refresh/', {
            token: data,
        }).then(res => res.data)
    },
    postGoogleToken(access_token: string) {
        return instance.post<GoogleTokenResponseType>('api/google/', {
            access_token: access_token,
        }).then(res => res.data)
    },
    getAuthMe(JWTToken: string) {
        return instance.get<getAuthMeType>('api/auth-me/', {
            headers: {
                'Authorization': `JWT ${JWTToken}`
            }
        }).then(res => res.data)
    },
    getAvatar(JWTToken: string, userId: number) {
        return instance.get<GetAvatarDataType>(`api/profile/${userId}`).then(res => res.data)
    },
    patchAvatar(JWTToken: string, userId: number, photo: any) {
        const formData = new FormData
        formData.append('photo', photo)
        return instance.patch<GetAvatarDataType>(`api/profile/${userId}`, formData, {
            headers: {'Authorization': `JWT ${JWTToken}`}
        }).then(res => res.data)
    },
    postRegistrNewUser(data: SignUpFormDataType) {
        return instance.post<RegisterResponseType>('api/register/', {
            username: data.username,
            email: data.email,
            password: data.password,
            password2: data.re_password,
            recaptcha: data.recaptcha
        }).then(res => res.data)
    },
}


export const commentApi = {
    getComments(id: number) {
        return instance.get<CommentsDataType>(`api/books/comments/${id}/`).then(res => res)
    },
    getNewCommentsPage(id: number, numPage: number) {
        return instance.get<CommentsDataType>(`api/books/comments/${id}/?page=${numPage}`).then(res => res)
    },
    patchComment(id: number, textMessage: string, JWTToken: string) {
        return instance.patch(`api/books/add_comments/${id}/`, {
            'text': textMessage,
        }, {
          headers: {'Authorization': `JWT ${JWTToken}`}
        })
    }
}
