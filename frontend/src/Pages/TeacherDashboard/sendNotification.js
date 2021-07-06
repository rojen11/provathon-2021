import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function SendNotification() {
  return (
    <Paper elevation={5} className="mt-5 w-1/2 p-5 text-center">
      <TextField
        variant="outlined"
        label="Enter Notification Description"
        rows={15}
        fullWidth
        multiline
      />
      <Button
        variant="filled"
        size="large"
        className="p-4 mt-6 w-full text-white bg-green-500"
      >
        Send Notification
      </Button>
    </Paper>
  );
}
