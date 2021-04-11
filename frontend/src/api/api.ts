import axios from "axios";
import {bookType} from "../redux/bookReducer";

type GetResponseType = Array<bookType>


export const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/book/',

})

export const bookApi = {
    getAllBooks() {
        return instance.get<GetResponseType>('').then(res => res.data)
    }
}