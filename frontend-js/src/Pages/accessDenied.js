export default function AccessDenied() {
  return (
    <div className="bg-green-500" style={{ height: "100vh" }}>
      <div className=" absolute left-1/2 transform -translate-x-1/2 top-5">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-80 w-80"
            color="white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="text-white uppercase font-bold text-8xl">
          Access Denied
        </div>
        <div className="text-white text-center mt-2 italic text-2xl">
          You are not given permission to view this page
        </div>
      </div>
    </div>
  );
}
