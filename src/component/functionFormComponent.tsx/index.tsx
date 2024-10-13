import { forwardRef } from "react";

const Index = forwardRef<
  HTMLDivElement,
  { index: number; title: string; eq: String,inputValue:number,outputValue:number,setInputValue:Function ,setFunctionInfo:Function,functionSequence: { [key: string]: string } }
>(({ index, title, eq ,inputValue,outputValue,setInputValue,setFunctionInfo,functionSequence}, ref) => {
  return (
    <div className="flex items-end gap-6">
      {index === 0 && (
        <div className="w-32">
          <div className="bg-[#E29A2D] rounded-full h-5 flex text-white w-wi-31 m-auto mb-1">
            <span className="text-xs font-semibold m-auto leading-4 ">Initial value of x</span>
          </div>
          <input
            className="bg-white appearance-none border-2 border-[#FFC267] rounded-2xl w-wi-31 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            value={inputValue}
            onChange={e=>setInputValue(e.target.value)}
          />
        </div>
      )}
      <div
        className="w-64 text-xs bg-white rounded-2xl overflow-hidden shadow-lg h-64"
        ref={ref}
      >
        <h5 className="pt-4 px-7 text-left text-[#A5A5A5] text-opacity-100">
          {title}
        </h5>
        <div className="w-64">
          <div className="pt-4 w-full">
            <p className="px-7 text-left font-medium"> Equation</p>
            <div className="flex flex-wrap justify-center">
              <div className="md:w-5/6">
                <input
                  className="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  value={eq.toString()}
                  onChange={(e)=>setFunctionInfo((prev: Object)=>{
                    return{
                      ...prev,
                      [title.toString()]:e.target.value
                    }
                  })}
                />
              </div>
            </div>
          </div>
          <div className="py-4 w-full">
            <p className="px-7 text-left font-medium"> Next Function</p>
            <div className="flex flex-wrap justify-center">
              <button className=" opacity-50 cursor-not-allowed bg-[#F5F5F5] flex justify-between group transition-all duration-200 focus:overflow-visible md:w-5/6 h-max p-2 overflow-hidden flex flex-row items-center justify-center bg-white gap-2 rounded-lg border-2 border-gray-200">
                <span>{functionSequence[title]}</span>
                <svg
                  className="rotate-180 group-focus:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
                  />
                </svg>
                {/* <div className="absolute shadow-lg -bottom-60 left-0 w-full h-max p-2 bg-white border border-zinc-200 rounded-lg flex flex-col gap-2">
                {Object.values(functionSequence).map((el: string) => (
                  <span className="flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg">
                    <p>{el}</p>
                  </span>
                ))}
                </div> */}
              </button>
            </div>
          </div>
        </div>
      </div>
      {index === 2 && (
        <div className="w-32">
           <div className="bg-[#2DD179] rounded-full h-5 flex text-white w-wi-31 m-auto mb-1">
            <span className="text-xs font-semibold m-auto leading-4 ">Final Output y</span>
          </div>
          <input
            className="bg-white appearance-none border-2 border-[#2DD179] rounded-2xl w-wi-31 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            value={outputValue}
          />
        </div>
      )}
    </div>
  );
});

export default Index;
