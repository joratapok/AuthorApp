import React from 'react'
import {commentsInitialType} from "../../../redux/commentReducer";
import CommentForm, {addCommentDataType} from "./CommentForm";
import defaulAvatarCat from "../../../assets/image/defaultAvatarCat.png"
import {makeStyles} from "@material-ui/core/styles";
import {
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography
} from "@material-ui/core";
import Container from "@material-ui/core/Container";

type CommentsType = {
    isAuth: boolean
    comments: commentsInitialType
    addComment: (data: addCommentDataType) => void
    fetchNewPageComments: (url: string | null) => void
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
}));

export const Comments: React.FC<CommentsType> = ({isAuth, comments, addComment, fetchNewPageComments}) => {
    const classes = useStyles();

    const fetchNewPage = (url: string | null) => {
        fetchNewPageComments(url)
    }

    return (
        <div>
            {!comments.results.length && <Typography>Комментариев пока нет, но вы можете оставить один... или два</Typography>}
            <Container maxWidth="md" className={classes.commentForm}>
                <CommentForm isAuth={isAuth} comments={comments} addComment={addComment}/>
            </Container>
            <Container maxWidth="md">
                {comments.results.map((el) => {
                    return <React.Fragment key={el.id}>
                        <ListItem key={el.id} alignItems="flex-start">
                            <>
                                {el.avatar &&
                                <ListItemAvatar><Avatar alt="avatar" src={el.avatar}/></ListItemAvatar>}
                                {!el.avatar &&
                                <ListItemAvatar><Avatar alt="avatar" src={defaulAvatarCat}/></ListItemAvatar>}
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
            </Container>
            {(comments.previous != null) &&
            <button onClick={() => fetchNewPage(comments.previous)}>left</button>}
            {comments.next &&
            <button onClick={() => fetchNewPage(comments.next)}>right</button>}
        </div>
    )
}

export default Comments
