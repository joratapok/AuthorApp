import React from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles, Theme} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Book from "./EveryBook/Book"
import Introduction from './Introduction/Introduction'
import axios from "axios"
import {bookType} from "../common/types/types"


type BooksType = {
    books: Array<bookType>
}

const useStyles = makeStyles((theme: Theme) => ({
    introGrid: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(8),
    },
    cardGrid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
}));

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
