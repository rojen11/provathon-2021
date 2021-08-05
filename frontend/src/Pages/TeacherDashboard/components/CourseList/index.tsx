import SimpleButton from "../../../../components/SimpleButton";

export default function CourseList() {
  return (
    <div className="bg-white w-full text-center h-full rounded-lg shadow-lg relative filter drop-shadow-lg">
      <div className="text-4xl pb-5 pt-2">Course List</div>
      <div className="fixed -left-1">
        {/* {props.courses.map((item) => (
          <ListButton
            click={() => {
              props.selectState[1](item.id);
              props.courseState[1]({ name: item.name, code: item.code });
            }}
            key={item.id}
            name={item.name}
            m="mt-5"
            color={
              props.selectState[0] === item.id ? "bg-green-400" : "bg-white"
            }
            hoverColor={
              props.selectState[0] === item.id ? "bg-green-400" : "bg-gray-200"
            }
          />
        ))} */}
      </div>
      <div className="absolute bottom-0 mb-5">
        <SimpleButton
        //   click={() => props.showState[1](true)}
          color="blue"
          xspacing="3"
          yspacing="3"
          rounded="rounded-full"
          p="ml-5 focus:ring-4 focus:border-blue-300"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              color="white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          }
        />
      </div>
      <div className="absolute bottom-0 right-0 mb-5">
        <SimpleButton
        //   click={() => props.deleteState[1](true)}
          color="red"
          xspacing="3"
          yspacing="3"
          rounded="rounded-full"
          mr="5"
          p="focus:ring-4 focus:ring-red-300"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              color="white"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
}
