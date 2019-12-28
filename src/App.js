import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(0);

  function Operacion(str) {
    if (typeof str === "string" && str !== "") {
      //let result = eval(str); //operacion utilizando la funcion global eval
      //let fn = new Function('return '+str) //operacion utilizando el constructor de objeto
      //let result = fn()
      const constr = "constructor"; //utilizando constructor
      let result = constr[constr][constr]("return " + str)();
      if (typeof result !== "number") {
        return;
      }
      return result;
    }
  }
  //agregando escuchador de eventos de teclado
  document.addEventListener("keyup", function(e) {
    keySelect(e.key);
  });

  function handleKey(e) {
    let key = e.target.title;
    keySelect(key);
  }

  function keySelect(key) {
    let lk = input.charAt(input.length - 1);
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
        // let lk = output.charAt(output.length -1)
        if (lk === "+" || lk === "/" || lk === "*") {
          setOutput(key);
          setInput(input + key);
        } else if (input === "" && output !== 0) {
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
        } else if (input === "" && output !== 0) {
          setOutput(key);
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
        let pk = input.charAt(input.length - 2);
        if (input === "" && output !== 0) {
          setInput(output + key);
        }else if(input === '' && output === 0){
            setInput('0'+key)
        } else if (lk === "+" || lk === "/" || lk === "*") {
          if (key === "-") {
            setInput(input + key);
          } else {
            let str = input.slice(0, input.length - 1);
            setInput(str + key);
          }
        } else if (pk === "+" || pk === "/" || pk === "*") {
          if (lk === "-") {
            let str = input.slice(0, input.length - 2);
            setInput(str + key);
          } else {
            setInput(input + key);
          }
        } else if (lk === "-") {
          let str = input.slice(0, input.length - 1);
          setInput(str + key);
        } else {
          setInput(input + key);
        }
        setOutput(key);

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
  }

  function Execute() {
    if (input !== "" && input !== undefined) {
      //valida si el dato en input es valido
      let lk = input.charAt(input.length - 1);
      if (lk === "+" || lk === "-" || lk === "*" || lk === "/") {
        //comprueba que no termine en un signo matematico
        let str = input.slice(0, input.length - 1);
        let done = Operacion(str);
        setInput("");
        setOutput(done);
      } else {
        let done = Operacion(input);
        setInput("");
        setOutput(done);
      }
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
        <a href="https://emiliort.com" target="_blank"  rel="noopener noreferrer" className="me">By EmilioRT</a>
      </div>
    </main>
  );
}

export default App;
