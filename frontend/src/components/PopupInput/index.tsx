import { Button, TextField } from "@material-ui/core";
import { useState } from "react";

type Props = {
  handleClose: () => void;
  title: string;
  inputLabel: string;
  handleButtonClick: (value: string) => void;
};

export default function PopupInput({
  handleClose,
  title,
  inputLabel,
  handleButtonClick,
}: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="z-10 bg-white w-96 ring-4 ring-gray-300 rounded-lg shadow-xl filter drop-shadow-xl">
      <div className="p-5 pt-2 pb-2 border-b-2 border-black">
        <button
          onClick={handleClose}
          className="absolute top-0 left-0 bg-green-500 hover:bg-green-600 rounded-br-lg rounded-tl-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            color="white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-3xl text-center uppercase ">{title}</div>
      </div>
      <div className="text-center flex flex-col">
        <TextField
          onChange={(e: any) => setValue(e.target.value)}
          variant="outlined"
          label={inputLabel}
          size="medium"
          className={"m-5"}
          value={value}
        />
        <Button
          onClick={() => handleButtonClick(value)}
          size="large"
          className="mx-5 mt-2 mb-7 text-white bg-green-500 hover:bg-green-600"
        >
          {title}
        </Button>
      </div>
    </div>
  );
}
