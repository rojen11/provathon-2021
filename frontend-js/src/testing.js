const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Testing() {
  return (
    <div className="bg-gray-300 w-80 h-80 m-10">
      <div className="text-3xl text-center pt-2">Month</div>
      <div className="text-gray-500 flex justify-around pt-2 px-5">
        {weekDays.map((day) => (
          <div>{day}</div>
        ))}
      </div>
      <div className="grid grid-rows-5">
        <div className="grid grid-cols-7"></div>
      </div>
    </div>
  );
}
