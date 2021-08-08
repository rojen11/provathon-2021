import { Menu } from "@headlessui/react";

type Props = {
  name: string;
  color: string;
  handleClick: () => void;
};

export default function SettingsTab({ name, color, handleClick }: Props) {
  return (
    <Menu.Item
      onClick={handleClick}
      as="button"
      className={`w-44 pl-3 text-left py-2 text-xl hover:bg-${color}-500 hover:text-white rounded-lg`}
    >
      {name}
    </Menu.Item>
  );
}
