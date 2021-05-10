import React, {useState} from 'react'
import c from "../EveryBook/Book.module.css";
import {makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {NavLink} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import {bookType} from "../../common/types/types";
import octaButton from '../../../assets/image/octaButton.png'


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
        paddingTop: '125%',
        transition: '2s',
        '&:hover': {
            transform: 'scale(1.1)',
            filter: 'saturate(300%)',
        },
    },
    cardContent: {
        flexGrow: 1,
        zIndex: 3001,
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

    let classButton = c.readButton + ' ' + (hover ? c.hoverButton : '')


    return (
        <Grid item xs={12} sm={6} md={4}>
            <div className={c.bookWrapper}>

                <div className={classButton}
                     onMouseEnter={setHoverOn}
                     onMouseLeave={setHoverOff}>
                    <img src={octaButton} alt=""/>
                </div>

                <Card className={classes.card}>

                    <NavLink className={c.navLink} to={'/book/' + book.id}>

                        {book.mini_poster ? (
                            <CardMedia
                                className={classes.cardMedia}
                                image={book.mini_poster}
                                title={book.name}
                                onMouseEnter={setHoverOn}
                                onMouseLeave={setHoverOff}
                            />
                        ) : (<CircularProgress/>)
                        }

                    </NavLink>

                    <CardContent className={classes.cardContent}>
                        <Typography align='center'
                                    variant='body2'>
                            {book.genre.map((el, idx) => {
                                if (idx === book.genre.length - 1) {
                                    return <span key={el}> {el} </span>
                                }
                                return (<span key={el}>
                                        {el + ' / '}
                                    </span>)
                            })}
                        </Typography>

                        <Typography variant="h5"
                                    component="h2"
                                    align='center'>
                            {book.name}
                        </Typography>

                    </CardContent>
                </Card>

            </div>
        </Grid>
    )
}

export default Book;
