import ExamCard from "../Components/examCard";
import moment from "moment";

export default function ExamGrid({ gridCols, p, click, cards }) {
  return (
    <div className={`grid grid-cols-${gridCols} ${p} place-items-center `}>
      {cards.map((card) => (
        <ExamCard
          key={card.id}
          click={() => click(card.id)}
          title={card.name}
          examDuration={moment
            .duration(moment(card.endTime) - moment(card.startTime))
            .hours()}
          startTime={card.startTime}
          submit={card.submitDuration}
        />
      ))}
    </div>
  );
}
