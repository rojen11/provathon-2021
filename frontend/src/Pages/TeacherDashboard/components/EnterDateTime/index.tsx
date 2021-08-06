import { TextField } from "@material-ui/core";

type Props = {
  label: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function EnterDateTime({ label, change, value }: Props) {
  return (
    <TextField
      onChange={change}
      variant="outlined"
      label={label}
      type="datetime-local"
      InputLabelProps={{
        shrink: true,
      }}
      value={value}
    />
  );
}
