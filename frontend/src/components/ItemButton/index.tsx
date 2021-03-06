import Button from "@material-ui/core/Button";

type Props = {
  name: string;
  icon?: React.ReactNode;
  p?: string;
  click?: () => void;
  disabled?: boolean;
};

export default function ItemButton({
  name,
  icon,
  p,
  click,
  disabled = false,
}: Props) {
  return (
    <Button
      onClick={click}
      size="small"
      style={{ fontSize: 16 }}
      className={`${p} flex items-center bg-white font-sans transition duration-500 hover:bg-gray-100 shadow-lg filter drop-shadow-lg px-5 py-2 rounded-full`}
      disabled={disabled}
    >
      {icon}
      {name}
    </Button>
  );
}
