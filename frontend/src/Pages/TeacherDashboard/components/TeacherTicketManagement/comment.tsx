type Props = {
    name: string;
    body: string;
}

export default function Comment({ name, body }: Props) {
  return (
    <section className="mt-4 rounded-lg shadow-xl p-4 border border-gray-200">
      <span className="font-bold">{name}</span>
      <div className="p-3">
        <hr></hr>
        <p className="p-2">{body}</p>
      </div>
    </section>
  );
}
