import React from "react"
import {Field, Form} from "react-final-form"
import {required} from "../../../utils/validators/validator"
import {commentsInitialType} from "../../../redux/commentReducer"

type PropsType = {
    comments: any
    addComment: (data: addCommentDataType) => any

}
export type addCommentDataType = {
    text: string
}

const CommentForm: React.FC<PropsType> = ({comments, addComment}) => {

    return(
        <Form
            onSubmit={addComment}
            render={({handleSubmit, submitError, form, submitting, pristine, values}) => (
                <form onSubmit={async (event) => {
                    const error = await handleSubmit(event);
                    if (error) { return error; }
                    form.reset();
                  }}>
                    <div>
                        <label>Комментарий</label>
                        <Field name={'text'}
                               component="input"
                               validate={required}>
                            {({input, meta}) => (
                                <div>
                                    <input {...input} type="text" placeholder="Написать комментарий"/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                    </div>

                    <div className="buttons">
                        <button type="submit" disabled={submitting || pristine}>
                            Отправить
                        </button>
                        {submitError && <div className="error">{submitError}</div>}
                    </div>
                </form>
            )}
        />
    )
}

export default CommentForm
