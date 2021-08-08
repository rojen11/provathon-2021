import ItemButton from "../../../../components/ItemButton";

export default function TicketSubmit({ info, setInfo, handleClose }: any) {
  return (
    <div className="mt-3">
      <input
        value={info.input}
        onChange={(e) => setInfo({ ...info, input: e.target.value })}
        className="focus:outline-none rounded-lg ring-2 text-lg ring-black px-5 py-2 w-full"
        placeholder="Enter Title"
      />
      <textarea
        value={info.textarea}
        onChange={(e) => setInfo({ ...info, textarea: e.target.value })}
        className="focus:outline-none mt-5 ring-2 ring-black px-5 py-2 w-full h-80 resize-none"
        placeholder="Enter Your Question or Confusion"
      />
      <div className="flex gap-x-40">
        <ItemButton
          click={() => setInfo({ input: "", textarea: "" })}
          name="Reset"
          p="mt-3"
        />
        <ItemButton click={handleClose} name="Close" p="mt-3" />
      </div>
    </div>
  );
}
