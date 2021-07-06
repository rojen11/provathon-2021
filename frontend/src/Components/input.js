import TextField from "@material-ui/core/TextField";

export default function Input({ label, p, change }) {
  return (
    <TextField
      onChange={(e) => change(e)}
      variant="outlined"
      label={label}
      size="medium"
      className={`${p}`}
    />
  );
}
