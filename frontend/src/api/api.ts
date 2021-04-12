import axios from "axios";
import {bookType} from "../redux/bookReducer";

type GetResponseType = Array<bookType>


export const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',

})

export const bookApi = {
    getAllBooks() {
        return instance.get<GetResponseType>('book/').then(res => res.data)
    }
}

export const rateApi = {
    patchRate(data) {
        return instance.patch('book_relation/1', {
          'rate': 2
    }
}
