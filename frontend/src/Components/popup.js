import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export default function PopUp({
  show,
  setShow,
  title,
  body,
  buttonName,
  color,
  click,
}) {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Dialog
        static
        onClose={() => setShow(false)}
        className="shadow-xl filter z-10 drop-shadow-lg absolute w-96 h-48 top-1/4 left-1/2 transform -translate-x-1/2 bg-white border-2 border-black rounded-lg"
      >
        <Dialog.Title className="font-bold uppercase text-xl text-center pt-2 pb-2 border-b-2 border-black">
          {title}
        </Dialog.Title>
        <Dialog.Description className="p-5 pt-2 pb-2 text-gray-500">
          {body}
        </Dialog.Description>
        <button
          className={`focus:outline-none bg-${color}-400 bg-opacity-50 hover:bg-${color}-300 px-7 py-1 rounded-lg text-right absolute right-10`}
          onClick={() => {
            setShow(false);
            click();
          }}
        >
          {buttonName}
        </button>
      </Dialog>
    </Transition>
  );
}
