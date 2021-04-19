import React from 'react'
import {commentsInitialType} from "../../../redux/commentReducer";
import CommentForm, {addCommentDataType} from "./CommentForm";

type CommentsType = {
    comments: commentsInitialType
    addComment: (data: addCommentDataType) => void
}

export const Comments: React.FC<CommentsType> = ({comments, addComment}) => {

    if (comments.results.length === 0) {
        return <div>Комментариев пока нет, но вы можете оставить один... или два</div>
    }

    return (
        <div>
            <div>
                <CommentForm comments={comments} addComment={addComment} />
            </div>
            <div>
                Комментарии:
                {comments.results.map((el) => <div key={el.id}>{el.text}</div>)}
            </div>
        </div>
    )
}

export default Comments
