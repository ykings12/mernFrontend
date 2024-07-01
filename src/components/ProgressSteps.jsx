import { AiFillCheckCircle } from "react-icons/ai";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-3">
      <div className={`${step1 ? "text-orange-500 " : "text-gray-300"}`}>
        <span className="ml-2 font-semibold text-lg">Login</span>
        <div className="mt-2 ml-3 text-lg text-center">
          <AiFillCheckCircle size={32} className="items-center" />
        </div>
      </div>

      {step2 && (
        <>
          {step1 && <div className="h-0.5 w-[30rem] bg-orange-500"></div>}
          <div className={`${step1 ? "text-orange-500" : "text-gray-300"}`}>
            <span className="font-semibold text-lg">Shipping</span>
            <div className="mt-2 ml-4 text-lg text-center">
              <AiFillCheckCircle size={32} className= {`${step1 ? "text-orange-500" : "text-gray-300"} items-center`} />
            </div>
          </div>
        </>
      )}

      <>
        {step1 && step2 && step3 ? (
          <div className="h-0.5 w-[30rem] bg-orange-500"></div>
        ) : (
         ""
        )}

        <div className={`${step3 ? "text-orange-500" : "text-gray-300"}`}>
          <span
            className={`${!step3 ? "ml-[30rem]" : ""} font-semibold text-lg`}
          >
            Summary
          </span>
          {step1 && step2 && step3 ? (
            <div className="mt-2 ml-4 text-lg text-center">
              <AiFillCheckCircle size={32} className="text-orange-500 items-center" />
            </div>
          ) : (
            <div className="mt-2 ml-[31rem] text-lg text-center">
            <AiFillCheckCircle size={32} className="text-gray-300 items-center" />
          </div>
          )}
        </div>
      </>
    </div>
  );
};

export default ProgressSteps;
