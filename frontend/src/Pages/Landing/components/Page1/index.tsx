import SimpleButton from "../../../../components/SimpleButton";
import { Link } from "react-router-dom";

export default function Page1() {
  return (
    <div className="bg-green-500 relative" style={{ height: "100vh" }}>
      <div className="absolute top-5 right-10">
        <Link to="/login">
          <button className="text-green-100 rounded-lg ring-2 ring-gray-200 px-5 py-1 transition duration-500 hover:bg-white hover:text-black">
            Login
          </button>
        </Link>
      </div>
      <div className="text-center absolute top-40 left-1/2 transform -translate-x-1/2 w-full">
        <div className="text-9xl font-bold text-white uppercase">
          Exam Taker
        </div>
        <div className="italic text-gray-200 text-2xl">
          Taking Exams Have Never Been More Simpler
        </div>
        <div className="flex justify-center mt-5">
          <Link to="/signup">
            <SimpleButton
              name="Sign Up"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  color="white"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              }
              color="green"
              xspacing="5"
              yspacing="3"
              mr="2"
              rounded="rounded-lg"
            />
          </Link>
          <SimpleButton
            click={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                left: 0,
                behavior: "smooth",
              })
            }
            name="Download"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                color="white"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            }
            color="green"
            xspacing="5"
            yspacing="3"
            rounded="rounded-lg"
          />
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ffffff"
          fill-opacity="1"
          d="M0,64L48,80C96,96,192,128,288,160C384,192,480,224,576,213.3C672,203,768,149,864,133.3C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
