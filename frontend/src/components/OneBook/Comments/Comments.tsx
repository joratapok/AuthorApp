import React from 'react'
import {commentsInitialType} from "../../../redux/commentReducer";
import CommentForm, {addCommentDataType} from "./CommentForm";

type CommentsType = {
    comments: commentsInitialType
    onSubmit: (text: addCommentDataType) => void
}

export const Comments: React.FC<CommentsType> = (comments, onSubmit) => {

    if (comments.comments.results.length === 0) {
        return <div>Комментариев пока нет, но вы можете оставить один... или два</div>
    }

    return (
        <div>
            <div>
                <CommentForm onSubmit={onSubmit} />
            </div>
            <div>
                Комментарии:
                {comments.comments.results.map((el) => <div key={el.id}>{el.text}</div>)}
            </div>
        </div>
    )
}

export default Comments