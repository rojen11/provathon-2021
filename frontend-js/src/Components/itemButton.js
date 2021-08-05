import Button from "@material-ui/core/Button";

export default function ItemButton({ name, icon, p, click }) {
  return (
    <Button
      onClick={click}
      size="small"
      style={{ fontSize: 16 }}
      className={`${p} flex items-center bg-white font-sans transition duration-500 hover:bg-gray-100 shadow-lg filter drop-shadow-lg px-5 py-2 rounded-full`}
    >
      {icon}
      {name}
    </Button>
  );
}
