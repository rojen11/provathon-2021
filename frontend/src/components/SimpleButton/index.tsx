import React from "react";

type SimpleButtonProps = {
  name?: string;
  icon: React.ReactNode;
  color: string;
  yspacing: string;
  xspacing: string;
  mr?: string;
  rounded?: string;
  click?: () => void;
  p?: string;
};

export default function SimpleButton({
  name,
  icon,
  color,
  yspacing,
  xspacing,
  mr,
  rounded,
  click,
  p,
}: SimpleButtonProps) {
  return (
    <button
      onClick={click}
      className={`${p} ${rounded} mr-${mr} bg-${color}-600 hover:bg-${color}-700 py-${yspacing} px-${xspacing} flex`}
    >
      {icon}
      <div className="text-white">{name}</div>
    </button>
  );
}
