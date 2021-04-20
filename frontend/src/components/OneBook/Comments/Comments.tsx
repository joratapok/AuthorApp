import React from 'react'
import {commentsInitialType} from "../../../redux/commentReducer";
import CommentForm, {addCommentDataType} from "./CommentForm";

type CommentsType = {
    comments: commentsInitialType
    addComment: (data: addCommentDataType) => void
    fetchNewPageComments: (url: string | null) => void
}

export const Comments: React.FC<CommentsType> = ({comments, addComment, fetchNewPageComments}) => {

    const fetchNewPage = (url: string | null) => {
        fetchNewPageComments(url)
    }

    if (comments.results.length === 0) {
        return <div>
            Комментариев пока нет, но вы можете оставить один... или два
            <div>
                <CommentForm comments={comments} addComment={addComment} />
            </div>
        </div>
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
            {(comments.previous != null) &&
              <button onClick={() => fetchNewPage(comments.previous)}>left</button>}
            {comments.next &&
               <button onClick={() => fetchNewPage(comments.next)}>right</button>}
        </div>
    )
}

export default Comments
