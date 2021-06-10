import React from 'react'
import c from '../EveryBook/Book.module.css'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { NavLink } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { bookType } from '../../common/types/types'
import ScrollAnimation from 'react-animate-on-scroll'

type BookType = {
    key: number
    book: bookType
}

const useStyles = makeStyles(() => ({

    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '125%',
        transition: '0.5s',
        '&:hover': {
            transform: 'scale(1.07)',
            filter: 'saturate(300%)'
        }
    },
    cardContent: {
        backgroundColor: 'white',
        flexGrow: 1,
        zIndex: 3001
    }

}))

const theme = createMuiTheme()

theme.typography.h4 = {
    fontFamily: 'Pacifico',
    fontSize: '1.5rem',
    fontWeight: 400,
    [theme.breakpoints.down('xs')]: {
        fontSize: '0.9rem'
    }
}
theme.typography.h5 = {
    fontFamily: 'Pacifico',
    fontSize: '1rem',
    fontWeight: 400,
    [theme.breakpoints.down('xs')]: {
        fontSize: '0.7rem'
    }
}

export const Book: React.FC<BookType> = React.memo(({ book }) => {
    const classes = useStyles()

    return (
        <Grid item xs={6} md={4}>
            <div className={c.bookWrapper}>

                <ScrollAnimation style={{ height: '100%' }} animateIn='fadeInUp' offset={100}>

                    <Card className={classes.card}>
                        <NavLink className={c.navLink} to={'/book/' + book.id}>
                            {book.mini_poster
                                ? (
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={book.mini_poster}
                                        title={book.name}
                                    />
                                )
                                : (<CircularProgress/>)
                            }

                        </NavLink>

                        <CardContent className={classes.cardContent}>
                            <ThemeProvider theme={theme}>

                                <Typography align='center'
                                    variant='h5'>

                                    {book.genre.map((el, idx) => {
                                        if (idx === book.genre.length - 1) {
                                            return el
                                        }
                                        return el + ' / '
                                    })}
                                </Typography>

                                <Typography variant="h4"
                                    component="h2"
                                    align='center'>
                                    {book.name}
                                </Typography>

                            </ThemeProvider>
                        </CardContent>
                    </Card>
                </ScrollAnimation>
            </div>
        </Grid>
    )
})

Book.displayName = 'Book'
