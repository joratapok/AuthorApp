import React from "react"
import {commentsInitialType} from "../../../redux/commentReducer"
import CommentForm, {addCommentDataType} from "./CommentForm"
import defaultAvatarCat from "../../../assets/image/defaultAvatarCat.png"
import {makeStyles} from "@material-ui/core/styles"
import {
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography, Box, Paper
} from "@material-ui/core"
import Container from "@material-ui/core/Container"
import {Pagination} from "@material-ui/lab"

type CommentsType = {
    isAuth: boolean
    bookId: number
    comments: commentsInitialType
    addComment: (data: addCommentDataType) => void
    fetchNewPageComments: (id: number, page: number) => void
}

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    fonts: {
        fontWeight: "bold"
    },
    inline: {
        display: "inline"
    },
    commentForm: {
        display: 'flex',
        flexDirection: 'column',
    },
    listComments: {
        margin: '16px 0'
    },
    noComment: {
        textAlign: 'center'
    }
}));

export const Comments: React.FC<CommentsType> = ({
                                                     isAuth, comments, bookId,
                                                     addComment, fetchNewPageComments
                                                 }) => {
    const classes = useStyles();

    const paginationHandler = (event: object, page: number) => {
        fetchNewPageComments(bookId, page)
    }

    return (
        <Box my={5}>
            {!comments.results.length &&
            <Typography className={classes.noComment}>
                Комментариев пока нет, но вы можете оставить один... или два
            </Typography>}
            <Container maxWidth="md" className={classes.commentForm}>
                <CommentForm isAuth={isAuth} comments={comments} addComment={addComment}/>
            </Container>
            <Container maxWidth="md">
                <Paper elevation={3} className={classes.listComments}>
                    {comments.results.map((el) => {
                        return <React.Fragment key={el.id}>
                            <ListItem key={el.id} alignItems="flex-start">
                                <>
                                    {el.avatar &&
                                    <ListItemAvatar><Avatar alt="avatar" src={el.avatar}/></ListItemAvatar>}
                                    {!el.avatar &&
                                    <ListItemAvatar><Avatar alt="avatar" src={defaultAvatarCat}/></ListItemAvatar>}
                                </>
                                <ListItemText
                                    primary={
                                        <Typography className={classes.fonts}>
                                            {el.owner}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {el.text}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                            <Divider/>
                        </React.Fragment>
                    })}
                </Paper>
            </Container>
            {}
            <Box display='flex' justifyContent='center' my={1}>
                <Pagination count={Math.ceil(comments.count / 10)} color="primary" onChange={paginationHandler}/>
            </Box>
        </Box>
    )
}

export default Comments
