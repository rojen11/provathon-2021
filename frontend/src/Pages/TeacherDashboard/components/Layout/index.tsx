import Navbar from "../Navbar/index";
import Title from "../Title/index";
import CourseList from "../CourseList";

type Props = {
  children: React.ReactChild;
};

export default function Layout(props: Props) {
  return (
    <div className="grid grid-cols-5 place-items-center gap-x-7 p-5 h-screen">
      <CourseList
      // showState={[show, setShow]}
      // deleteState={[del, setDelete]}
      // selectState={[selected, setSelected]}
      // courseState={[course, setCourse]}
      />
      <div className="col-span-4 bg-white h-full w-full rounded-lg relative">
        <Title title="Math" code="123" />
        <div className="grid place-items-center">{props.children}</div>
        <Navbar />
      </div>
    </div>
  );
}
