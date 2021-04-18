import React from "react";
import {Field, Form} from "react-final-form";
import {required} from "../../../utils/validators/validator";

type PropsType = {
    onSubmit: (data: addCommentDataType) => any
}
export type addCommentDataType = {
    text: string
}

const CommentForm: React.FC<PropsType> = ({onSubmit,}) => {

    return(
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit, submitError, form, submitting, pristine, values}) => (
                <form onSubmit={handleSubmit}>
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