import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {bookType} from "../../redux/bookReducer";
import Book from "./EveryBook/Book";

type BooksType = {
    books: Array<bookType>
}

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));


const BooksList: React.FC<BooksType> = ({books}) => {
    const classes = useStyles();

    return (
        <React.Fragment>

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
