export default function Header() {
  return (
    <div className="px-5 py-2 h-16 shadow-md flex items-center text-4xl border-b-2 border-green-800">
      <div className="font-bold uppercase text-green-600">Exam Taker</div>
      <div className="flex-grow text-center">MATH 200 EXAM</div>
      <div className="font-bold">TIMER: 1:00</div>
    </div>
  );
}
