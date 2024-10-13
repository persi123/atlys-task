import { useEffect, useRef, useState } from "react";
import FunctionForm from "./functionFormComponent.tsx";

const CardConnector = () => {
  const cardRefs = useRef<
    { input: HTMLElement | null; output: HTMLElement | null }[]
  >([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<number>(2);
  const [outputValue, setOutputValue] = useState<number>(0);
  const [functionInfo, setFunctionInfo] = useState<{ [key: string]: string }>({
    "Function:1": "x^2",
    "Function:2": "2x+4",
    "Function:3": "x^2+20",
    "Function:4": "x-2",
    "Function:5": "x/2",
  });

  const [functionSequence] = useState({
    "Function:1":  "Function:2",
    "Function:2":  "Function:4",
    "Function:3":  "-",
    "Function:4":  "Function:5",
    "Function:5":  "Function:3",
  });

  const calculateOutput = (
    input: number,
    functions: { [key: string]: string },
    sequence: Object
  ) => {
    let result = input;
    Object.keys(sequence).forEach((key) => {
      if(key === '-') return
      const func = functions[key];
      console.log(func, "func");
      // Insert '*' between any number and 'x', replace 'x' with the current result, and '^' with '**'
      const expression = func
        .replace(/(\d)(x)/g, "$1*$2")
        .replace(/x/g, `${result}`)
        .replace(/\^/g, "**");
      console.log(expression, "exp");
      result = eval(expression);
      console.log(result, "ress");
    });
    setOutputValue(result);
  };

  useEffect(() => {
    calculateOutput(inputValue, functionInfo, functionSequence);
  }, [inputValue, functionInfo]);

  useEffect(() => {
    const newPaths: string[] = [];

    if (cardRefs.current.length > 0) {
      // Example connection array. Each object links output of one card to input of another
      const connections = [
        { from: 0, to: 1 }, // Connect Card 1 to Card 2
        { from: 1, to: 2 }, // Connect Card 2 to Card 3
        { from: 2, to: 3 }, // Connect Card 3 to Card 4
        { from: 0, to: 4 }, // Connect Card 1 to Card 5
        { from: 3, to: 4 }, // Connect Card 4 to Card 5
      ];

      connections.forEach((connection) => {
        const outputRect =
          cardRefs.current[connection.from]?.output?.getBoundingClientRect();
        const inputRect =
          cardRefs.current[connection.to]?.input?.getBoundingClientRect();

        const startX = outputRect?.right ?? 0;
        const startY = (outputRect?.top ?? 0) + (outputRect?.height ?? 0) / 2;
        const endX = inputRect?.left ?? 0;
        const endY = (inputRect?.top ?? 0) + (inputRect?.height ?? 0) / 2;

        const path = `M ${startX} ${startY} C ${startX + 50} ${startY}, ${
          endX - 50
        } ${endY}, ${endX} ${endY}`;
        newPaths.push(path);
      });

      setPaths(newPaths);
    }
  }, []);

  return (
    <div className="relative h-full">
      {/* SVG for all paths */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {paths.map((path, index) => (
          <path
            key={index}
            d={path}
            stroke="blue"
            fill="transparent"
            strokeWidth="2"
          />
        ))}
      </svg>

      {/* Card Elements */}
      <div className="flex  items-center h-full gap-16 flex-wrap justify-center">
        {Object.keys(functionInfo).map((el, index) => (
          <FunctionForm
            key={index}
            index={index}
            title={el}
            eq={functionInfo[el]}
            setFunctionInfo={setFunctionInfo}
            inputValue={inputValue}
            outputValue={outputValue}
            setInputValue={setInputValue}
            functionSequence={functionSequence}
            // setOutputValue={setOutputValue}
            // className="card w-32 h-20 bg-gray-200 flex justify-center items-center m-2 relative"
            ref={(el: HTMLDivElement | null) => {
              if (el) {
                cardRefs.current[index] = {
                  input: el.querySelector(".input")!,
                  output: el.querySelector(".output")!,
                };
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CardConnector;
