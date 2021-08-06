import TextField from "@material-ui/core/TextField";

type Props = {
  label: string;
  p?: string;
  change: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string | number;
};

export default function TextInput({ label, p, change, value }: Props) {
  return (
    <TextField
      onChange={(e) => change(e)}
      variant="outlined"
      label={label}
      size="medium"
      className={`${p}`}
      value={value}
    />
  );
}
