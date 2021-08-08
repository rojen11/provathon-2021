import { Dialog } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import Loading from "../Loading";

export default function PopupLoading() {
  return (
    <Transition
      show={true}
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
        onClose={() => {}}
        className="shadow-xl filter z-10 drop-shadow-lg absolute w-96 h-48 top-1/4 left-1/2 transform -translate-x-1/2 bg-white border-2 border-black rounded-lg"
      >
        <div className="relative w-full h-full">
          <div className={"grid w-full h-full place-content-center"}>
            <Loading />
          </div>
          <button
            className={`focus:outline-none bg-red-400 bg-opacity-50 hover:bg-red-300 px-7 py-1 rounded-lg text-right absolute right-2 bottom-2`}
          >
            close
          </button>
        </div>
      </Dialog>
    </Transition>
  );
}
