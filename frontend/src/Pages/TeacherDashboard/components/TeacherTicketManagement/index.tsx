
type Props = {
    title: string;
    body: string;
    selected: boolean;
    click: () => void;
    name: string;
}

export default function TeacherTicketCard({ title, body, selected, name, click }: Props) {
    return (
      <div
        onClick={click}
        className={`${
          selected && "border-2 border-black"
        } bg-white px-2 py-2 pb-2 shadow-xl cursor-pointer mt-4`}
      >
        <div className="text-xl font-semibold">{title}</div>
        <div>{body}</div>
        <div className="text-sm text-right text-gray-400">By {name}</div>
      </div>
    );
  }
  