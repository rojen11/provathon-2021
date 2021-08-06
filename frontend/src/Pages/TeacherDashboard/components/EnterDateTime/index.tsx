import { TextField } from "@material-ui/core";

type Props = {
  label: string;
  change: (e: React.ChangeEvent) => void;
};

export default function EnterDateTime({ label, change }: Props) {
  return (
    <TextField
      onChange={change}
      variant="outlined"
      label={label}
      type="datetime-local"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
