import { useEffect, useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link, useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useActions } from "../../store/useActions";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Signup() {
  const [val, setVal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pass: "",
    confirmPass: "",
    account: "",
  });

  const history = useHistory();

  const { signup } = useActions();
  const authState = useSelector((state: RootState) => state.auth);
  const registerSuccess = authState.registerSuccess;

  useEffect(() => {
    if (registerSuccess) {
      history.push("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerSuccess]);

  function handleSignup() {
    const { email, pass, confirmPass, firstName, lastName, account } = val;

    signup({
      email,
      password1: pass,
      password2: confirmPass,
      firstName,
      lastName,
      isTeacher: account === "teacher",
    });
  }

  const paperStyle = {
    padding: 20,
    width: 400,
    margin: "100px auto",
    borderRadius: "20px",
  };
  const btnStyle = { margin: "18px 0" };

  return (
    <Paper elevation={15} style={paperStyle}>
      <Grid className="text-center">
        <b className="text-2xl text-black uppercase w-full text-center">
          Exam Taker
        </b>
      </Grid>
      <div className="flex gap-x-5 justify-center">
        <TextField
          onChange={(e) => setVal({ ...val, firstName: e.target.value })}
          label="First name"
          placeholder="Enter name"
          className="mt-3 w-44"
          required
        />
        <TextField
          onChange={(e) => setVal({ ...val, lastName: e.target.value })}
          label="Last name"
          placeholder="Enter surname"
          className="mt-3 w-44"
          required
        />
      </div>
      <TextField
        onChange={(e) => setVal({ ...val, email: e.target.value })}
        label="Email"
        placeholder="Enter E-mail address"
        className="mt-3"
        fullWidth
        required
      />
      <TextField
        onChange={(e) => setVal({ ...val, pass: e.target.value })}
        label="Password"
        placeholder="Enter password"
        className="mt-3"
        type="password"
        fullWidth
        required
      />

      <TextField
        onChange={(e) => setVal({ ...val, confirmPass: e.target.value })}
        label="Confirm Password"
        placeholder="Enter password again"
        className="mt-3"
        type="password"
        fullWidth
        required
      />

      <RadioGroup
        aria-label="pos"
        name="pos1"
        onChange={(e) => setVal({ ...val, account: e.target.value })}
      >
        <div className="flex justify-around mt-5">
          <FormControlLabel
            value="teacher"
            control={<Radio color="primary" />}
            label="Teacher"
          />
          <FormControlLabel
            value="student"
            control={<Radio color="primary" />}
            label="Student"
          />
        </div>
      </RadioGroup>

      <Grid alignContent="center">
        <Button
          onClick={handleSignup}
          type="button"
          variant="contained"
          style={btnStyle}
          className="text-white"
          fullWidth
          color="primary"
        >
          Sign Up
        </Button>
      </Grid>

      {/* {error !== "" && (
        <div className="text-red-600 text-md font-semibold text-center mb-2 -mt-2">
          Error: {error}
        </div>
      )} */}

      <Typography className="mb-5">
        Already have an account?
        <Link to="/login" className="ml-2">
          Login
        </Link>
      </Typography>
    </Paper>
  );
}
