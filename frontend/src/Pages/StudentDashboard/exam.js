import SimpleButton from "../../Components/simplebutton";
import Header from "../../Components/header";
import { useState } from "react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import TicketSystem from "./ticketSystem";
import * as Test from './test.pdf'

export default function Exam() {
  const [show, setShow] = useState(true);

  return (
    <div className="flex flex-col" style={{ height: "100vh" }}>
      <Header />
      <AnimateSharedLayout>
        <div className="flex h-full overflow-hidden">
          <ExamPage showState={[show, setShow]} />
          <AnimatePresence initial={false}>
            {show && <TicketSystem />}
          </AnimatePresence>
        </div>
      </AnimateSharedLayout>
    </div>
  );
}

function ExamPage(props) {
  const [numPages, setNumPages] = useState(null);

  return (
    <motion.div className="relative flex-grow" layout>
      <motion.div layout="position">
        Exam page
      </motion.div>
      <motion.div className="absolute top-0 right-10 py-5 px-7" layout>
        <SimpleButton
          name="Upload Paper"
          xspacing="5"
          yspacing="3"
          color="green"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              color="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          }
        />
      </motion.div>
      <button
        onClick={() => props.showState[1](!props.showState[0])}
        className={`absolute top-0 right-0 ${
          props.showState[0]
            ? "transform transition duration-500 rotate-0"
            : "transform transition duration-500 rotate-180"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </motion.div>
  );
}
