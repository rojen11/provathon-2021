type Props = {
  body: string;
  user: string;
};

export default function Comment({ body, user }: Props) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-lg filter drop-shadow-lg">
      <div className="text-xl">{body}</div>
      <div className="text-sm text-gray-500 text-right pt-2">{user}</div>
    </div>
  );
}
