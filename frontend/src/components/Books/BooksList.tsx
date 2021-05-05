import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {bookType} from "../../redux/bookReducer";
import Book from "./EveryBook/Book";
import {Box, Typography} from "@material-ui/core";
import Intro from './Intro/Intro'
import axios from "axios";

type BooksType = {
    books: Array<bookType>
}

const useStyles = makeStyles((theme: Theme) => ({
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
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Box textAlign='center'>
                            <Intro/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">
                              image must be here
                        </Typography>

                    </Grid>

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
