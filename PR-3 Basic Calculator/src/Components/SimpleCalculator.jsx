import { useState } from "react";

function SimpleCalculator() {
  const [input, setInput] = useState("");

  const operators = ["+", "-", "*", "/", "%"];

  // Normal button click
  const handleClick = (value) => {
    const last = input.slice(-1);

    // operator rules
    if (operators.includes(value) && input === "") return;
    if (operators.includes(value) && operators.includes(last)) return;

    // dot rule
    if (value === ".") {
      const parts = input.split(/[\+\-\*\/\%]/);
      if (parts[parts.length - 1].includes(".")) return;
    }

    setInput(input + value);
  };

  // C = clear all
  const clearAll = () => setInput("");

  // Backspace = remove last char
  const backspace = () => setInput(input.slice(0, -1));

  // calculate
  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      {/* Display */}
      <input type="text" value={input} readOnly />
      {/* Row 1 */}
      <button className="op" onClick={() => handleClick("%")}>
        %
      </button>
      <button className="op" onClick={backspace}>
        ⌫
      </button>{" "}
      {/* ✅ CE replaced */}
      <button className="op" onClick={clearAll}>
        C
      </button>
      <button className="op" onClick={() => handleClick("+")}>
        +
      </button>
      {/* Row 2 */}
      <button onClick={() => handleClick("9")}>9</button>
      <button onClick={() => handleClick("8")}>8</button>
      <button onClick={() => handleClick("7")}>7</button>
      <button className="op" onClick={() => handleClick("-")}>
        -
      </button>
      {/* Row 3 */}
      <button onClick={() => handleClick("6")}>6</button>
      <button onClick={() => handleClick("5")}>5</button>
      <button onClick={() => handleClick("4")}>4</button>
      <button className="op" onClick={() => handleClick("*")}>
        *
      </button>
      {/* Row 4 */}
      <button onClick={() => handleClick("3")}>3</button>
      <button onClick={() => handleClick("2")}>2</button>
      <button onClick={() => handleClick("1")}>1</button>
      <button className="op" onClick={() => handleClick("/")}>
        /
      </button>
      {/* Row 5 */}
      <button onClick={() => handleClick("0")}>0</button>
      <button onClick={() => handleClick("00")}>00</button>
      <button onClick={() => handleClick(".")}>.</button>
      <button className="equal" onClick={calculate}>
        =
      </button>
    </div>
  );
}

export default SimpleCalculator;
