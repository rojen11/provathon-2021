import Button from "@material-ui/core/Button";

export default function ListButton({ name, m, color, hoverColor, click }) {
  return (
    <Button
      onClick={click}
      className={`${m} ${color} hover:${hoverColor} p-5 shadow-lg filter drop-shadow-lg w-72`}
    >
      <div className="text-xl">{name}</div>
    </Button>
  );
}
