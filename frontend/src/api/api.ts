import axios from "axios";
import {bookType, OneBookType} from "../redux/bookReducer";

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

export const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    withCredentials: true,

})

export const bookApi = {
    getAllBooks() {
        return instance.get<GetAllBooksType>('book/').then(res => res)
    },
    getBookById(id: number) {
        return instance.get<OneBookType>(`book/${id}`).then(res => res)
    }
}

export const rateApi = {
    patchRate(data: number) {
        return instance.patch('book_relation/1', {
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
