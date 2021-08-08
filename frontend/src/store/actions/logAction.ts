import { RootState } from "..";

type logProps = {
  message: string;
  examId: string;
};

export const logAction = ({ message, examId }: logProps) => {
  return (dispatch: Function, getAction: () => RootState) => {
    const { socket } = getAction().socket;


    if (socket != null) {
      socket.emit("log", {
        userId: getAction().auth.user.pk,
        message: message,
        examId,
      });
    }
  };
};
