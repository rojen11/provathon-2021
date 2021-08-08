import React from "react";
import { Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useActions } from "../../store/useActions";

type HandleFieldChange = {
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  field: "email" | "password" | "remember";
};

const paperStyle = {
  padding: 20,
  width: 350,
  margin: "100px auto",
  borderRadius: "20px",
};


export default function Login() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error] = useState("");

  const action = useActions();


  function handleLogin() {
    action.login({ email: fields.email, password: fields.password });
  }

  function handleFieldChange(params: HandleFieldChange) {
    const { e, field } = params;

    if (e.target === null) return;

    if (field === "remember") {
      // @ts-ignore
      setFields({ ...fields, [field]: e.target.checked });
      return;
    }

    setFields({ ...fields, [field]: e.target.value });
  }

  return (
    <Paper elevation={15} style={paperStyle}>
      <Grid className="text-center">
        <b className="text-2xl text-black uppercase">Exam Taker</b>
      </Grid>
      <TextField
        onChange={(e) => handleFieldChange({ e, field: "email" })}
        label="Email"
        placeholder="Enter your email"
        className="mt-5"
        InputProps={{ className: "border-white" }}
        value={fields.email}
        fullWidth
        required
      />
      <TextField
        onChange={(e) => handleFieldChange({ e, field: "password" })}
        label="Password"
        placeholder="Enter password"
        type="password"
        className="mt-3"
        fullWidth
        required
      />
      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              className="text-blue-500"
              onChange={(e) => handleFieldChange({ e, field: "remember" })}
            />
          }
          className="mt-4"
          label="Remember me"
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          color="primary"
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
}
