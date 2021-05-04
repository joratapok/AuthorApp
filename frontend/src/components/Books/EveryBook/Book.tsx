import React, {useState} from 'react'
import {bookType} from "../../../redux/bookReducer";
import c from "../EveryBook/Book.module.css";
import {makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {NavLink} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';


type BookType = {
    key: number
    book: bookType
}

const useStyles = makeStyles((theme) => ({

    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',

    },
    cardMedia: {
        paddingTop: '125%', // 4:3
    },
    cardContent: {
        flexGrow: 1,
    },

}));

const Book: React.FC<BookType> = ({book}) => {
    const classes = useStyles();

    const [hover, setHover] = useState(false)
    const setHoverOn = () => {
        setHover(true)
    }
    const setHoverOff = () => {
        setHover(false)
    }

    let classCover =classes.cardMedia + ' ' + c.passiveBook + ' ' + (hover ? c.activeBook : '')
    let classButton = c.readButton + ' ' + (hover ? c.hoverButton : '')

    return (
        <Grid item xs={12} sm={6} md={4}>
            <div className={c.bookWrapper}>
                <NavLink className={c.navLink} to={'/book/' + book.id}>

                    <button className={classButton}
                            onMouseEnter={setHoverOn}
                            onMouseLeave={setHoverOff}>
                        Скачать
                    </button>

                    <Card className={classes.card}>
                        <div className={classCover}
                             onMouseEnter={setHoverOn}
                             onMouseLeave={setHoverOff}>
                        </div>

                        {book.mini_poster ? (
                            <CardMedia
                                className={classes.cardMedia}
                                image={book.mini_poster}
                                title="Image title"
                                onMouseEnter={setHoverOn}
                                onMouseLeave={setHoverOff}
                            />
                            ) : ( <CircularProgress/> )
                        }
                        <CardContent className={classes.cardContent}>
                            <Typography align='center'
                                        variant='subtitle1'>
                                Фэнтези / Комедия
                            </Typography>

                            <Typography variant="h5"
                                        component="h2"
                                        align='center'>
                                {book.name}
                            </Typography>

                        </CardContent>
                    </Card>
                </NavLink>
            </div>
        </Grid>
    )
}

export default Book;
