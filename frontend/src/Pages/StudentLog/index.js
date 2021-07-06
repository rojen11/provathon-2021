import { useParams } from "react-router-dom";
import { useEffect } from 'react';

export default function StudentLog() {
  const { examid } = useParams();

    useEffect(() => {
        
    },[])

  return (
    <div className="flex flex-row gap-4 p-4 relative min-h-screen">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </div>
      <div className="w-full">
        <h3 className="text-center font-bold text-5xl">{examid}</h3>
        <div className="mt-5 shadow-lg rounded-lg border-2 border-gray-100 h-4/5">
          Hello world
        </div>
      </div>
    </div>
  );
}
