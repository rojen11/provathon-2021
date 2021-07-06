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
}) {
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
