import React from "react"
import {Field, Form} from "react-final-form"
import {required} from "../../../utils/validators/validator"
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import {makeStyles} from "@material-ui/core/styles";

type PropsType = {
    comments: any
    addComment: (data: addCommentDataType) => any

}
export type addCommentDataType = {
    text: string
}

const useStyles = makeStyles((theme) => ({
    textInput: {
        width: '75%',

    },
}));

const CommentForm: React.FC<PropsType> = ({addComment}) => {
    const cl = useStyles();

    return (
        <Form
            onSubmit={addComment}
            render={({handleSubmit, submitError, form, submitting, pristine, values}) => (
                <form onSubmit={async (event) => {
                    const error = await handleSubmit(event);
                    if (error) {
                        return error;
                    }
                    form.reset();
                }}>
                    <Field name={'text'}
                           component="input"
                           validate={required}>
                        {({input, meta}) => (
                            <TextField
                                {...input}
                                id="outlined-multiline-static"
                                label="Комментарий"
                                multiline
                                rows={4}
                                variant="outlined"
                                className={cl.textInput}
                            />
                        )}
                    </Field>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={submitting || pristine}
                        endIcon={<Icon>send</Icon>}
                    >
                        Send
                    </Button>

                    {submitError && <div className="error">{submitError}</div>}
                </form>
            )}
        />
    )
}

export default CommentForm
