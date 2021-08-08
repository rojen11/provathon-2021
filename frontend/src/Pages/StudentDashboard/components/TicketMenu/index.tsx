import ItemButton from "../../../../components/ItemButton";
import Comment from "../Comment";
import { useState } from "react";

type Props = {
  handleClick: (comment: string) => void;
  title: string;
  body: string;
  comments: any[];
};

export default function TicketMenu({ handleClick, title, body, comments }: Props) {
  const [comment, setComment] = useState("");

  return (
    <div>
      <div className="ring-2 ring-black rounded-lg">
        <div className="text-center text-xl border-b-2 border-black py-2">
          {title}
        </div>
        <div className="text-lg py-3 px-2">{body}</div>
      </div>
      <div className="mt-6">
        {comments.map((c) => (
          <Comment body={c.body} user={c.user} />
        ))}
      </div>
      <div className="mt-10 absolute bottom-7 w-full left-0">
        <textarea
          className="focus:outline-none border-t-2 border-b-2 h-32 border-black px-5 py-2 w-full h-20 resize-none text-md"
          placeholder="Enter Your Question or Confusion"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-around">
          <ItemButton name="Send" p="mt-3 z-10" click={() => handleClick(comment)} />
          <ItemButton
            click={() => handleClick("")}
            name="Back"
            p="mt-3 bg-green-300 hover:bg-green-400 z-10"
          />
        </div>
      </div>
    </div>
  );
}
