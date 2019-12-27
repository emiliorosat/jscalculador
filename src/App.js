import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(0);
  const [exe, setExe] = useState(false);

  function Operacion(str) {
    if (typeof str === "string" && str !== "") {
      return eval(str);
    }
  }

  document.addEventListener("keyup", function(e) {
    keySelect(e.key);
  });

  function handleKey(e) {
    let key = e.target.title;
    keySelect(key);
  }

  function keySelect(key) {
    switch (key) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (input === "" && output !== 0) {
          setInput(key);
          setOutput(key);
        } else if (output === 0) {
          setOutput(key);
          setInput(input + key);
        } else {
          Insert(key);
        }
        break;
      case "0":
        if (output === 0) {
          return;
        } else {
          Insert(key);
        }
        break;
      case ".":
        {
          const rex = /[.]/;
          if (output === 0) {
            setOutput(output + ".");
            setInput(input + "0.");
          } else if (!rex.test(output)) {
            Insert(key);
          } else {
            return;
          }
        }
        break;
      case "+":
      case "-":
      case "/":
      case "*":
        console.log(output.charAt(output.length - 1))
        setOutput(key);
        setInput(input + key);
        //console.log(input.charAt(input -1))
        const rex = /-/;
        if (!rex.test(output) && input.charAt(input - 1) !== "-") {
          Insert(key);
        } else {
          //setOutput(0);
          //Insert(key);
          //verify(input, key)
        }

        break;
      case "Escape":
        Clear();
        break;
      /*
      case "=":
      case "Enter":
        Execute();
        break;
        */
      default:
        return;
    }
  }

  function Insert(key) {
    setInput(input + key);
    setOutput(output + key);
  }

  function Clear() {
    setOutput(0);
    setInput("");
    setExe(false);
  }

  function Execute() {
    let done = Operacion(input);
    if (done !== "" && done !== undefined) {
      setInput("");
      setOutput(done);
    }
  }

  return (
    <main className="App">
      <div className="App-header">
        <div className="">
          <div className="display">
            <span className="dp op">{input}</span>
            <span className="dp" id="display">
              {output}
            </span>
          </div>
          <div className="keyboard">
            <div onClick={Execute} dangerouslySetInnerHTML={{ __html: "=" }} id="equals" title="=" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "0" }} id="zero" title="0" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "1" }} id="one" title="1" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "2" }} id="two" title="2" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "3" }} id="three" title="3" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "4" }} id="four" title="4" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "5" }} id="five" title="5" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "6" }} id="six" title="6" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "7" }} id="seven" title="7" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "8" }} id="eight" title="8" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "9" }} id="nine" title="9" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "+" }} id="add" title="+" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "-" }} id="subtract" title="-" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "x" }} id="multiply" title="*" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "/" }} id="divide" title="/" />
            <div onClick={handleKey} dangerouslySetInnerHTML={{ __html: "." }} id="decimal" title="." />
            <div onClick={Clear} dangerouslySetInnerHTML={{ __html: "AC" }} id="clear" title="Escape" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
