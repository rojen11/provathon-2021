import Settings from "../../../../components/Settings";
import SimpleButton from "../../../../components/SimpleButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import JoinCourse from "./joinCourse";

export default function Header() {
  const authState = useSelector((state: RootState) => state.auth);

  const active = authState.user;

  const [showJoin, setShowJoin] = useState(false);

  return (
    <>
      <AnimatePresence>
        <motion.div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-10">
          {showJoin && <JoinCourse handleClose={setShowJoin} />}
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center">
        <div className="flex">
          <Settings />
          <div className="text-3xl">
            {active.firstName + " " + active.lastName}
          </div>
        </div>
        <div className="p-5 flex flex-grow justify-center">
          <div className="border-b-4 border-black w-40 mb-5 mr-5"></div>
          <div className="text-5xl">Your Exams & Quizzes</div>
          <div className="border-b-4 border-black w-40 mb-5 ml-5"></div>
        </div>
        <div className="mr-7">
          <SimpleButton
            click={() => setShowJoin(true)}
            name="Add Course"
            color="green"
            xspacing="5"
            yspacing="4"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3"
                color="white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            }
          />
        </div>
      </div>
    </>
  );
}
