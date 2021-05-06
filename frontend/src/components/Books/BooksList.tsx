import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {bookType} from "../../redux/bookReducer";
import Book from "./EveryBook/Book";
import {Box, Typography} from "@material-ui/core";
import Introduction from './Introduction/Introduction'
import axios from "axios";
import typeCat from '../../assets/image/typeCatSmall.png'

type BooksType = {
    books: Array<bookType>
}

const useStyles = makeStyles((theme: Theme) => ({
    introGrid: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(5),
    },
    cardGrid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
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
            <Container className={classes.introGrid} maxWidth="lg">
                <Grid container spacing={1}>
                    <Introduction/>
                </Grid>
            </Container>

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
