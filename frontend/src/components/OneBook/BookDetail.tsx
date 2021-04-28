import React, {useState} from 'react'
import classes from './BookDetail.module.css'
import {OneBookType,} from "../../redux/bookReducer"
import {commentsInitialType} from "../../redux/commentReducer"
import {addCommentDataType} from "./Comments/CommentForm"
import Comments from "./Comments/Comments"
import ReaderBoxContainer from "./ReaderBox/ReaderBoxContainer"
import {AuthinitialType} from "../../redux/authReducer"
import {Rating} from "@material-ui/lab";
import {
    Box, createStyles, Grid, makeStyles, withStyles,
    Button, Paper, Theme, Typography, Tooltip, IconButton
} from "@material-ui/core";
import {deepOrange, green} from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import ScrollContainer from "react-indiana-drag-scroll";


type BookDetailType = {
    book: OneBookType
    comments: commentsInitialType
    auth: AuthinitialType
    addComment: (data: addCommentDataType) => void
    fetchNewPageComments: (id: number, page: number) => void
    setCurrentRatingThunk: (bookId: number, data: number | null, JWTToken: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(3),
            textAlign: 'center',
            height: '100%',
            color: theme.palette.text.secondary,
        },
        typography: {
            fontWeight: 700,
            color: 'white'
        },
        totalMarks: {},
        xButton: {
            width: 50,
            height: 50,
        },
        tempo: {
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }
    }),
)

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);
const DownloadButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[400],
        '&:hover': {
            backgroundColor: deepOrange[600],
        },
    },
}))(Button);
const ReadButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(green[600]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);


export const BookDetail: React.FC<BookDetailType> = ({
                                                         book, comments,
                                                         auth, addComment,
                                                         fetchNewPageComments, setCurrentRatingThunk
                                                     }) => {
    const cl = useStyles();
    const [modal, setModal] = useState(false)
    let buttonModalOffClass = classes.buttonModalOff + ' ' + (modal ? classes.activeButtonModalOff : '')

    const onStarClick = (newValue: number | null) => {
        setCurrentRatingThunk(book.id, newValue, auth.accessToken)
    }

    const setReaderOn = () => {
        setModal(true)
    }
    const setReaderOff = ():any => {
        setModal(false)
    }


    return (
        <div className={classes.bookWrapper}>
            <Box height='100px'></Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <img src={book.poster} alt={"Обложка"}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper className={cl.paper}>
                        <Box display='flex' alignItems='center' my={1}>
                            <Box mx={2} width='50%'>
                                <a href={book.book_file}>
                                    <DownloadButton variant="contained" color="primary" className={classes.margin}
                                                    fullWidth>
                                        Скачать
                                    </DownloadButton></a>
                            </Box>
                            <Box mx={2} width='50%'>
                                <ReadButton variant="contained" color="primary" className={classes.margin}
                                            onClick={setReaderOn} fullWidth>
                                    Читать
                                </ReadButton>
                            </Box>
                        </Box>

                        <Box display='flex' alignItems='center'>
                            <Box width='40px' height='40px' borderRadius='50%' bgcolor='#BAD227' alignSelf='flex-start'
                                 p={1}>
                                <Typography className={cl.typography}>{book.rated_books}</Typography>
                            </Box>
                            <Box mx={1}>Всего оценок: {book.count_rate}</Box>
                        </Box>

                        <Box my={1} display='flex' alignSelf='flex-start'>
                            {!auth.isAuth &&
                            <LightTooltip disableFocusListener
                                          title="для того оценить книгу необходимо авторизоваться"
                                          placement="right">
                                <Box>
                                    <Rating
                                        name="simple-controlled"
                                        value={Math.floor(book.rated_books)}
                                        readOnly={!auth.isAuth}
                                        onChange={(event, newValue) => {
                                            onStarClick(newValue);
                                        }}
                                    />
                                </Box>
                            </LightTooltip>
                            }

                            {auth.isAuth && <Rating
                                name="simple-controlled"
                                value={book.current_rate}
                                onChange={(event, newValue) => {
                                    onStarClick(newValue);
                                }}
                            />
                            }
                        </Box>

                        <Typography variant="h4">
                            {book.name}
                        </Typography>
                        <Typography variant="body2">
                            {book.description}
                        </Typography>


                    </Paper>
                </Grid>
            </Grid>

            <div>
                <Comments addComment={addComment}
                          comments={comments}
                          fetchNewPageComments={fetchNewPageComments}
                          bookId={book.id}
                          isAuth={auth.isAuth}/>
            </div>

            <ReaderBoxContainer toggleReader={modal} setReaderOff={setReaderOff} />



            <Box display='block' height='200px' width='200px' overflow='hidden' border='2px solid black' >
                <ScrollContainer vertical={true} horizontal={true} hideScrollbars={false}
                className={cl.tempo}>

                e test text ----Глава 1 И пришел спаситель и сказал - Дети мои да прибудет с вами сила, да окрепнут запястия на трудовых руках ваших, да Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mollis dui nulla, quis laoreet lorem euismod ut. Cras dictum lacinia lacus, vitae condimentum magna vehicula id. Nulla in lobortis augue. Duis sit amet quam ac dui blandit accumsan. Ut quis dui mi. Duis eget magna a nunc auctor semper. Maecenas quis ultricies nulla. Curabitur vestibulum dui et nulla luctus iaculis at id sapien. Nulla facilisi. Donec consectetur dignissim tempus. Aliquam erat volutpat. Morbi at leo ac eros tincidunt accumsan sit amet eget nunc. Donec ac lorem ligula. Quisque fringilla nec elit ut lacinia. Donec nunc lorem, ornare vel feugiat quis, commodo in mauris. Sed tempor, urna eget bibendum placerat, neque velit placerat ex, sed tristique lectus dui ut ex. Nullam vehicula sem ac vulputate volutpat. Donec ultricies est a dictum feugiat. Curabitur consectetur tempor nibh ut interdum. Aenean efficitur libero id magna suscipit, blandit sollicitudin risus bibendum. Curabitur molestie tortor at augue tempus, sed fermentum turpis vulp

                </ScrollContainer>
            </Box>



        </div>
    )
}

export default BookDetail;
