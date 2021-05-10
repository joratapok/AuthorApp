import React from "react"
import {Field, Form} from "react-final-form"
import {required} from "../../../utils/validators/validator"
import {Box, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import {makeStyles} from "@material-ui/core/styles";

type PropsType = {
    comments: any
    addComment: (data: addCommentDataType) => any
    isAuth: boolean
}
export type addCommentDataType = {
    text: string
}
type ErrorsType = {
    text: null | string
}

const useStyles = makeStyles((theme) => ({
    textInput: {
        width: '100%',
        margin: '10px 0'
    },
}));

const CommentForm: React.FC<PropsType> = ({isAuth, addComment}) => {
    const cl = useStyles();

    const validate = (values: ErrorsType) => {
        const errors: ErrorsType = {text: null};
        if (!values.text) {
            errors.text = 'NADA';
        }

        return errors;
    };

    return (
        <Form
            onSubmit={addComment}

            render={({
                         handleSubmit, submitError, form,
                         submitting, pristine, values
                     }) => (
                <form onSubmit={async (event) => {
                    const error = await handleSubmit(event);
                    if (error) {
                        return error;
                    }
                    form.reset();
                }}>
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                        <Field name={'text'}
                               component="input"
                               validate={required}>
                            {({input, meta: {touched, error}}) => (
                                <TextField {...input}
                                           type="text"
                                           label={isAuth ? "Комментарий" : "Что бы оставить комментарий необходимо авторизоваться"}
                                           disabled={!isAuth}
                                           multiline
                                           rows={4}
                                           required={true}
                                           variant="outlined"
                                           className={cl.textInput}
                                />
                            )}
                        </Field>

                        {isAuth && <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={submitting || pristine}
                            endIcon={<Icon>send</Icon>}
                        >
                            Send
                        </Button>}

                        {submitError && <div className="error">{submitError}</div>}
                    </Box>
                </form>
            )}
        />
    )
}

export default CommentForm
