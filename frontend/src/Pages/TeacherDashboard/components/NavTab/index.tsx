import { useState } from 'react';

export default function NavTab() {
  const [tab, setTab] = useState(0);
  return (
    <div className="flex justify-around mb-2">
      <button
        onClick={() => setTab(0)}
        className={`${
          tab === 0 && "border-b-2 "
        } border-green-500 px-6 py-2 hover:bg-white`}
      >
        ALL
      </button>
      <button
        onClick={() => setTab(1)}
        className={`${
          tab === 1 && "border-b-2 "
        } border-green-500 px-6 py-2 hover:bg-white`}
      >
        PROBLEM
      </button>
      <button
        onClick={() => setTab(2)}
        className={`${
          tab === 2 && "border-b-2 "
        } border-green-500 px-6 py-2 hover:bg-white`}
      >
        CLOSED
      </button>
    </div>
  );
}
