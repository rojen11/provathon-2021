type Props = {
  title: string;
  code: string;
};

export default function Title({ title, code }: Props) {
  return (
    <div className="flex justify-center p-5">
      {/* <Settings tabs={[[]]} /> */}
      <div className="flex flex-grow justify-center">
        <div className="border-b-4 border-black w-40 mb-5 mr-5"></div>
        <div className="text-5xl uppercase">{title}</div>
        <div className="border-b-4 border-black w-40 mb-5 ml-5"></div>
      </div>
      <div className="text-2xl">Course Code: {code}</div>
    </div>
  );
}
