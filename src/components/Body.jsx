import { useRef, useState } from "react";
import data from "../utils/quizData";
const Body = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [save, setSave] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const optionRefs = Array.from({ length: question?.options?.length }, () =>
    useRef(null)
  );
  const checkAns = (e, ans) => {
    if (save === false) {
      if (question?.answer === ans) {
        e.target.classList.add("correct");
        setSave(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setSave(true);
        optionRefs[question?.answer - 1].current.classList.add("correct");
      }
    }
  };

  const nextQuestion = () => {
    if (save === true) {
      if (index + 1 === data.length) {
        // Add logic for finalization, scoring, or submission
        setResult(true);
        return 0;
      } else {
        // If it's not the last question, move to the next question
        setIndex((prevIndex) =>
          prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex
        );
        setQuestion(data[index + 1]);
        setSave(false);
        optionRefs?.map((option) => {
          option.current.classList.remove("correct");
          option.current.classList.remove("wrong");
          return null;
        });
      }
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setSave(false);
    setScore(0);
    setResult(false);
  };
  return (
    <>
      <div className="xsm:mx-15 md:mx-32  body">
        <div className=" border border-white my-16 shadow rounded-lg px-5 py-9 shadow-white w-[550px] min-h-[510px]">
          <h1 className=" mobile:items-center mobile:flex  gap-2  mobile:justify-center">
            Welcome to <span className="text-red-500">Quiz Mania!</span>
          </h1>
          <div>
            {result ? (
              <>
                <div className="flex-col items-center justify-center text-center">
                  <img
                    src="/trophy.png"
                    alt=""
                    className="h-40 w-36 my-8 mx-auto"
                  />
                  <div className="my-2 flex items-center gap-2 justify-center ">
                    <h2 className="text-2xl">Your Score is :</h2>
                    <span className="text-2xl text-red-500">{score}</span>
                  </div>
                  <button
                    className="p-2 rounded-lg  my-4"
                    onClick={() => reset()}
                  >
                    Attempt Again!
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="my-4">
                  <h2 className="py-4 flex  gap-2 text-lg">
                    <span className="text-red-500 text-xl">Q.{index + 1}</span>
                    {question?.question}
                  </h2>
                  <ul className="">
                    {question?.options?.map((ans, i) => {
                      const letter = (i + 10).toString(36).toUpperCase();
                      return (
                        <>
                          <li
                            key={i}
                            onClick={(e) => {
                              checkAns(e, i + 1);
                            }}
                            ref={optionRefs[i]}
                            className="p-2 cursor-pointer rounded-md flex items-center gap-3 border my-3 group hover:border-gray-500"
                          >
                            <span className="px-[10px] py-1 rounded-md bg-stone-500 text-lg group-hover:text-gray-900">
                              {letter}
                            </span>
                            {ans}
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex items-center justify-between">
                  <span className=" ">
                    {index + 1} of {data.length}
                  </span>
                  <button
                    onClick={nextQuestion}
                    className={` text-base font-medium px-4 py-1 rounded-md hover:border hover:border-red-500 cursor-pointer ${
                      save
                        ? ""
                        : "bg-[#333333] text-[#666666] cursor-help line-through"
                    }`}
                  >
                    {index + 1 == data.length ? "Submit" : "Next"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
