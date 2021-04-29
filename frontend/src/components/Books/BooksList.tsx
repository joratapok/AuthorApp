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

    return (
        <React.Fragment>
            <Box height='500px'>
            </Box>

            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {books.map((book) => (
                        <Book key={book.id} book={book}/>

                    ))}
                </Grid>
            </Container>

        </React.Fragment>
    );
}

export default BooksList
