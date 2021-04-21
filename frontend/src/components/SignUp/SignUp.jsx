import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'react-final-form';
import {
  TextField,
} from 'mui-rff';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  MenuItem,
  InputAdornment,
} from '@material-ui/core';

const validate = values => {
  const errors = {};
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



function SignUp({onSubmit}) {

  const formFields = [
    {
      size: 12,
      field: (
        <TextField
          label="Имя или никнейм"
          name="username"
          margin=""
          required={true}
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          type="email"
          label="Email"
          name="email"
          margin="none"
          required={true}
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
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />

      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Регистрация
      </Typography>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                {formFields.map((item, idx) => (
                  <Grid item xs={item.size} key={idx}>
                    {item.field}
                  </Grid>
                ))}

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
            </Paper>

          </form>
        )}
      />
    </div>
  );
}

export default SignUp
