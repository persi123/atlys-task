import { useEffect, useRef, useState } from "react";
import FunctionForm from "./functionFormComponent.tsx";

const CardConnector = () => {
  const cardRefs = useRef<
    {name:String | null ; input: HTMLElement | null; output: HTMLElement | null }[]
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
  } as { [key: string]: string });

  const [functionSequence] = useState({
    "Function:1":  "Function:2",
    "Function:2":  "Function:4",
    "Function:3":  "-",
    "Function:4":  "Function:5",
    "Function:5":  "Function:3",
  }as { [key: string]: string });

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
    const container = document.querySelector('.relative');
    if (cardRefs.current.length > 0 && container) {
      const containerRect = container.getBoundingClientRect();
      ['initial',...Object.keys(functionSequence),'output'].forEach((fromFunction,index) => {
        if(index === 0){
          const fromFunction = "Function:1"
          const fromCard = cardRefs.current.find(card => card.name === fromFunction);
          const outputRect = fromCard?.input?.getBoundingClientRect();
          const inputRect = document.querySelector('.input-1')?.getBoundingClientRect();


          if (outputRect && inputRect) {
            const startX = outputRect.left - containerRect.left + outputRect.width / 2;
            const startY = outputRect.top - containerRect.top + outputRect.height / 2;
            const endX = inputRect.left - containerRect.left + inputRect.width / 2;
            const endY = inputRect.top - containerRect.top + inputRect.height / 2;


            // Adjust the control points for a smooth curve
            const controlX1 = startX + (endX - startX) / 2;
            const controlY1 = startY;
            const controlX2 = startX + (endX - startX) / 2;
            const controlY2 = endY;

            const path = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
            newPaths.push(path);
          }

        }else if(index === 6){
          const toFunction = "Function:3"
          const toCard = cardRefs.current.find(card => card.name === toFunction);
          const inputRect = toCard?.output?.getBoundingClientRect();
          const outputRect = document.querySelector('.output-1')?.getBoundingClientRect();


          if (outputRect && inputRect) {
            const startX = outputRect.left - containerRect.left + outputRect.width / 2;
            const startY = outputRect.top - containerRect.top + outputRect.height / 2;
            const endX = inputRect.left - containerRect.left + inputRect.width / 2;
            const endY = inputRect.top - containerRect.top + inputRect.height / 2;


            // Adjust the control points for a smooth curve
            const controlX1 = startX + (endX - startX) / 2;
            const controlY1 = startY;
            const controlX2 = startX + (endX - startX) / 2;
            const controlY2 = endY;

            const path = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
            newPaths.push(path);
          }

        }else{
        const toFunction = functionSequence[fromFunction];
     
        if (toFunction !== "-") {
          const fromCard = cardRefs.current.find(card => card.name === fromFunction);
          const toCard = cardRefs.current.find(card => card.name === toFunction);

          if (fromCard && toCard) {
            const outputRect = fromCard.output?.getBoundingClientRect();
            const inputRect = toCard.input?.getBoundingClientRect();
            console.log(outputRect, inputRect, 'path');

            if (outputRect && inputRect) {
              const startX = outputRect.left - containerRect.left + outputRect.width / 2;
              const startY = outputRect.top - containerRect.top + outputRect.height / 2;
              const endX = inputRect.left - containerRect.left + inputRect.width / 2;
              const endY = inputRect.top - containerRect.top + inputRect.height / 2;


              // Adjust the control points for a smooth curve
              const controlX1 = startX + (endX - startX) / 2;
              const controlY1 = startY;
              const controlX2 = startX + (endX - startX) / 2;
              const controlY2 = endY;

              const path = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
              newPaths.push(path);
            }
          }
        }}
      });
      console.log(newPaths, 'path');
      setPaths(newPaths);
    }
  }, [functionInfo, cardRefs.current]);

  return (
    <div className="relative h-full">
      {/* SVG for all paths */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {/* <path d="M 414.125 250.5 C 544.5625 250.5, 544.5625 250.5, 635 250.5" fill="#000000"/> */}
  {paths.map((path, index) => (
    <path
      key={index}
      d={path}
      className="path-style"
    />
  ))}
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="92 260 220.9 0">
	<path d="M 92 260 c 130.4375 0 130.4375 0 220.875 0" fill="#000000"/>
</svg>

      {/* Card Elements */}
      <div className="flex  items-center h-full gap-16 flex-wrap justify-center">
        {Object.keys(functionInfo).map((value, index) => (
          <FunctionForm
            key={index}
            index={index}
            title={value}
            eq={functionInfo[value]}
            setFunctionInfo={setFunctionInfo}
            inputValue={inputValue}
            outputValue={outputValue}
            setInputValue={setInputValue}
            functionSequence={functionSequence}
            // setOutputValue={setOutputValue}
            // className="card w-32 h-20 bg-gray-200 flex justify-center items-center m-2 relative"
            ref={(el: HTMLDivElement | null) => {
            
              if (el) {
                console.log(el,'ppo',{
                  input: el.querySelector(".input")!,
                  output: el.querySelector(".output")!,
                })
                cardRefs.current[index] = {
                  name:value.toString(),
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
