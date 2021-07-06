import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as ActionType from "../Store/actionTypes";
import AxiosFunction from "../Store/axiosFunction";

const Login = (props) => {
  const [val, setVal] = useState({ email: "", pass: "", remember: false });
  const [error, setError] = useState("");
  const history = useHistory();

  function onLogin() {
    AxiosFunction(`mutation {
      tokenAuth(email: "${val.email}", password: "${val.pass}") {
        success,
        errors,
        token,
        refreshToken,
     
        user {
          id,
          firstName,
          lastName,
          isTeacher
        }
      }
    }
  `).then((res) => {
      const data = res.data.data.tokenAuth;
      if (data.success) {
        props.onStoreUser(data.user);
        props.onStoreAccessToken(data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        history.push("/dashboard");
      } else {
        setError(data.errors[Object.keys(data.errors)[0]][0].message);
      }
    });
  }

  const paperStyle = {
    padding: 20,
    width: 350,
    margin: "100px auto",
    borderRadius: "20px",
  };

  return (
    <Paper elevation={15} style={paperStyle}>
      <Grid align="center">
        <b className="text-2xl text-black uppercase">Exam Taker</b>
      </Grid>
      <TextField
        onChange={(e) => setVal({ ...val, email: e.target.value })}
        label="Email"
        placeholder="Enter your email"
        className="mt-5"
        InputProps={{ className: "border-white" }}
        fullWidth
        required
      />
      <TextField
        onChange={(e) => setVal({ ...val, pass: e.target.value })}
        label="Password"
        placeholder="Enter password"
        type="password"
        className="mt-3"
        fullWidth
        required
      />
      <Grid align="left">
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              className="text-blue-500"
              onChange={(e) => setVal({ ...val, remember: e.target.checked })}
            />
          }
          className="mt-4"
          label="Remember me"
        />
        <Button
          onClick={onLogin}
          type="login"
          variant="contained"
          className="mt-6 bg-green-500 text-white hover:bg-green-600"
          fullWidth
        >
          Login
        </Button>
      </Grid>
      {error !== "" && (
        <div className="text-red-600 text-md font-semibold text-center mb-2 mt-2">
          Error: {error}
        </div>
      )}
      <Typography className="mt-3">
        <Link to="/forgot-password">Forgot password?</Link>
      </Typography>
      <Typography className="mt-2 mb-5 flex gap-x-2">
        Don't have an account?
        <Link to="/signup">Sign Up</Link>
      </Typography>
    </Paper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreUser: (val) =>
      dispatch({
        type: ActionType.STORE_USER,
        user: { ...val },
      }),
    onStoreAccessToken: (token) =>
      dispatch({ type: ActionType.STORE_ACCESSTOKEN, token: token }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
