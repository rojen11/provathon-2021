export default function TicketCard({ title, body, click }) {
  return (
    <button
      onClick={click}
      className="w-full p-2 mb-5 border-2 border-black shadow-md cursor-pointer rounded-lg text-left"
    >
      <div className="text-xl">Title: {title}</div>
      <div className="mb-2">{body}</div>
      <div className="text-sm text-green-700 font-bold text-right">
        SOLVED by Teacher Name
      </div>
    </button>
  );
}
