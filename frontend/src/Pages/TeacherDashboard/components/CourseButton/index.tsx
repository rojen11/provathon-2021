import Button from "@material-ui/core/Button";

type Props = {
  name: string;
  m: string;
  color: string;
  hoverColor: string;
  handleClick: () => void;
};

export default function CourseButton({
  name,
  m,
  color,
  hoverColor,
  handleClick,
}: Props) {
  return (
    <Button
      onClick={handleClick}
      className={`${m} ${color} hover:${hoverColor} p-5 shadow-lg filter drop-shadow-lg w-full`}
    >
      <div className="text-xl">{name}</div>
    </Button>
  );
}
