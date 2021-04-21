import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import classes from "./SignUp.module.css"
import { Form } from 'react-final-form';
import {SignUpFormDataType, } from "../../api/api";
import {
  TextField,
} from 'mui-rff';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
} from '@material-ui/core';


type PropsType = {
    onSubmit: (data: SignUpFormDataType) => void
}

const SignUp: React.FC<PropsType> = ({onSubmit}) => {

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
      errors.email = 'Обязательное поле';
    }
    return errors;
  };

  const formFields = [
    {
      size: 12,
      field: (
        <TextField
          label="Имя или никнейм"
          name="username"
          margin="none"
          required={true}

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
          required={true}
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
          required={true}
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
          required={true}
          type='password'
        />
      ),
    },

  ];

  return (
    <div className={classes.signWrap}>




      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitError,form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>


            <Typography variant="h5" align="center" component="h2" gutterBottom>
              Регистрация
            </Typography>

              <Grid container alignItems="flex-start" spacing={2}>
                {formFields.map((item, idx) => (
                  // @ts-ignore
                  <Grid item xs={item.size} key={idx}>
                    {item.field}
                  </Grid>
                ))}

                {submitError && <div className="error">{submitError}</div>}

                <Grid item style={{ marginTop: 16 }}>
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
  );
}

export default SignUp
