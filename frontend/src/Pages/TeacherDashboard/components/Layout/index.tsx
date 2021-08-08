import Navbar from "../Navbar/index";
import Title from "../Title/index";
import CourseList from "../CourseList";
import { useState } from "react";
import CreateCourse from "../CreateCourse";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

type Props = {
  children: React.ReactChild;
};

export default function Layout(props: Props) {
  const [showPopup, setShowPopup] = useState(false);

  const courseState = useSelector((state: RootState) => state.course);

  return (
    <>
      <div className="grid grid-cols-5 place-items-center gap-x-7 p-5 h-screen">
        <CourseList
          setShowPopup={setShowPopup}
          // showState={[show, setShow]}
          // deleteState={[del, setDelete]}
          // selectState={[selected, setSelected]}
          // courseState={[course, setCourse]}
        />
        <div className="col-span-4 bg-white h-full w-full rounded-lg relative">
          <Title
            title={
              courseState.active !== null &&
              courseState.active.name !== undefined
                ? courseState.active?.name
                : ""
            }
            code={
              courseState.active !== null &&
              courseState.active.code !== undefined
                ? courseState.active.code
                : ""
            }
          />
          <div className="grid place-items-center">{props.children}</div>
          <Navbar />
        </div>
      </div>
      <>
        {showPopup && (
          <div className="absolute left-1/2 top-1/4 transform -translate-x-1/2 text-xl z-10">
            <CreateCourse
              show={showPopup}
              handleClose={() => setShowPopup(false)}
            />
          </div>
        )}
      </>
    </>
  );
}
