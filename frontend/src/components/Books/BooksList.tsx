import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {bookType} from "../../redux/bookReducer";
import Book from "./EveryBook/Book";
import {Box} from "@material-ui/core";
import axios from "axios";

type BooksType = {
    books: Array<bookType>
}

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));




const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    withCredentials: true,

})
const BooksList: React.FC<BooksType> = ({books}) => {
    const classes = useStyles();




    const authApi = {
        get() {
            return instance.get<any>('auth/o/google-oauth2/?redirect_uri=http://127.0.0.1:3000', {
                headers: {
                    'redirect_uri': `http://127.0.0.1:3000`
                }
            }).then(res => res.data)
          },
        post() {
            return instance.post<any>(`auth/o/google-oauth2/?auth/o/google-oauth2/?code=4%2F0AY0e-g4mcfnF7XW-38BJbhCqeNDhbtysetFN2JWNaVO4CyVn-lrT0X7b_mlrpYeN_eSfvg&state=AJzZQvKpd19RTRWazK1IJiML3SxaSHt2`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }}).then(res => res.data)
        },
}

    return (
        <React.Fragment>
                <Box height='500px'>
                    <button onClick={() => authApi.post()}>buton</button>
                    <button onClick={() => authApi.get()}>get</button>
                </Box>





                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {books.map((book) => (
                            <Book key={book.id} book={book} />

                        ))}
                    </Grid>
                </Container>

        </React.Fragment>
    );
}

export default BooksList
