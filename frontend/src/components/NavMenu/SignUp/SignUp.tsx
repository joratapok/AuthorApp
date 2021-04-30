import React, {useEffect} from 'react';
import classes from "./SignUp.module.css"
import {Field, Form} from 'react-final-form';
import {SignUpFormDataType,} from "../../../api/api";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import {
    TextField,
} from 'mui-rff';
import {
    Typography, Fade, Backdrop,
    Grid, Modal, Button,
} from '@material-ui/core';

type PropsType = {
    onSubmit: (data: SignUpFormDataType) => void
    signUpModal: boolean
    closeSignUpModal: () => void
}

const formFields: Array<any> = [
    {
        size: 12,
        field: (
            <TextField
                label="Имя или никнейм"
                name="username"
                margin="none"
                variant="outlined"
                required
                autoFocus
            />
        ),
    },
    {
        size: 12,
        field: (
            <TextField
                label="Email"
                name="email"
                margin="none"
                variant="outlined"
                required
                type="email"
            />
        ),
    },
    {
        size: 12,
        field: (
            <TextField
                label="Пароль"
                name="password"
                margin="none"
                variant="outlined"
                required
                type='password'
            />
        ),
    },
    {
        size: 12,
        field: (
            <TextField
                label="Пароль еще раз"
                name="re_password"
                margin="none"
                variant="outlined"
                required
                type='password'
            />
        ),
    },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
)

const SignUp: React.FC<PropsType> = ({onSubmit, signUpModal, closeSignUpModal}) => {

    const cl = useStyles();

    const [modal, setModal] = React.useState(false)

    useEffect(() => {
        setModal(signUpModal)
    }, [signUpModal])

    const validate = (values: SignUpFormDataType) => {
        const errors: any = {};
        if (!values.username) {
            errors.username = 'Обязательное поле';
        }
        if (!values.email) {
            errors.email = 'Обязательное поле';
        }
        if (!values.password) {
            errors.password = 'Обязательное поле';
        }
        if (!values.re_password) {
            errors.re_password = 'Обязательное поле';
        }
        return errors;
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={cl.modal}
            open={modal}
            onClose={closeSignUpModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={modal}>
                <>
                    <div className={classes.signWrap}>
                        <Form
                            onSubmit={onSubmit}
                            
                            render={({handleSubmit, submitError, form, submitting, pristine, values}) => (
                                <form onSubmit={handleSubmit}>
                                    <Typography variant="h5" align="center" component="h2" gutterBottom>
                                        Регистрация
                                    </Typography>

                                    <Grid container alignItems="flex-start" spacing={2}>
                                        {formFields.map((item, idx) => (
                                            <Grid item xs={item.size} key={idx}>
                                                {item.field}
                                            </Grid>
                                        ))}

                                        {submitError && <div className="error">{submitError}</div>}

                                        <Grid item style={{marginTop: 16}}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={submitting}
                                            >
                                                Отправить
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        />
                    </div>
                </>
            </Fade>
        </Modal>
    );
}

export default SignUp
