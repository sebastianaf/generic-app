import React from "react";
import Lines from "../components/charts/Lines";
import VerticarBars from "../components/charts/VerticarBars";

const DasboartLayout2 = () => {
  return (
    <div className={`flex justify-center items-start w-full`}>
      <div className={`flex flex-row flex-wrap max-w-[1280px] w-full`}>
        <div
          className={`p-1 md:p-2 w-full md:w-1/2 lg:w-7/12 h-[300px] md:h-[400px] lg:h-[500px]`}
        >
          <div
            className={`shadow border rounded-lg  overflow-hidden h-full w-full p-2`}
          >
            <VerticarBars />
          </div>
        </div>
        <div
          className={`w-full h-[600px] md:h-auto md:w-1/2 lg:w-5/12 flex flex-col `}
        >
          <div className={`flex flex-row flex-wrap h-1/2 md:h-2/6`}>
            <div className={`p-1 md:p-2 w-full sm:w-1/2`}>
              <div
                className={`w-full shadow border rounded-lg overflow-hidden`}
              >
                <Lines />
              </div>
            </div>
            <div className={`p-1 md:p-2 w-full sm:w-1/2`}>
              <div
                className={`w-full shadow border rounded-lg overflow-hidden`}
              >
                <Lines />
              </div>
            </div>
          </div>
          <div className={`p-1 md:p-2 w-full h-1/2 md:h-4/6`}>
            <div
              className={`w-full h-full shadow border rounded-lg  overflow-hidden`}
            ></div>
          </div>
        </div>
        <div
          className={`p-1 md:p-2 w-full  h-[300px] md:h-[400px] lg:h-[500px] `}
        >
          <div
            className={`w-full h-full shadow border rounded-lg  overflow-hidden`}
          ></div>
        </div>
        <div
          className={`p-1 md:p-2 w-full h-[300px] md:h-[400px] lg:h-[500px] `}
        >
          <div
            className={`w-full h-full shadow border rounded-lg  overflow-hidden`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DasboartLayout2;
