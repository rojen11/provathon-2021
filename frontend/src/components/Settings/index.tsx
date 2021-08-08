import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import SettingsTab from "./settingsTab";
import { useActions } from "../../store/useActions";

export default function Settings() {
  //   const history = useHistory();

  const { logout } = useActions();

  //   function onSignOut() {
  //     AxiosFunction(`mutation {
  //       revokeToken(
  //         refreshToken: "${localStorage.getItem("refreshToken")}"
  //       ) {
  //         success,
  //         errors
  //       }
  //     }`).then(() => {
  //       store.dispatch({ type: ActionType.SIGN_OUT });
  //       localStorage.clear();
  //       history.push("/login");
  //     });
  //   }

  return (
    <Menu as="div">
      <Menu.Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 mr-5 ml-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="bg-white absolute left-8 top-18 rounded-lg shadow-2xl filter drop-shadow-xl z-10 flex flex-col p-3">
          <SettingsTab
            name="Sign Out"
            color="red"
            handleClick={() => logout()}
          />
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
