export type bookType = {
    id: number
    name: string
    mini_poster: string
    rated_books: string
    genre: Array<string>
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
    genre: Array<string>
}
export type Chapter = {
    chapter: string
}
export type CommentType = {
    id: number
    text: string
    owner: string
    book: number
    avatar: string
}