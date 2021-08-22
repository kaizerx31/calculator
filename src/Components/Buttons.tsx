import React from 'react';
import { useState } from 'react';
import { IButtonprops} from "../Interface/interface";
import "./Buttons.css";

const Buttons = ({_changeResult} : IButtonprops ) => {

    const numbers   = ["1","2","3","4","5","6","7","8","9","0"];
    const operators = ["*","+","-","/"];
    const buttonValues = [...numbers,...operators,".","="];
    const [isOperator,setIsOperator] = useState(false);
    const [isEqualpressed,setIsEqualpressed] = useState(false);

    const [newNumber,SetNewNumber] = useState("0");
    const [currentNumber,SetCurrentNumber] = useState("0");
    const [operator,SetOperator] = useState("+");

const _handleNumber =  (digit : string) =>{
    if(isEqualpressed === true) {
      SetCurrentNumber("0");
      SetOperator("+");
    }
    setIsEqualpressed(false);
    setIsOperator(false);
    if ( newNumber !== "0" ) {
        let temp=newNumber.concat(digit);
        SetNewNumber(temp);
        _changeResult(temp);
    }
    else if(digit !== "0"){
        SetNewNumber(digit);
        _changeResult(digit);
    }
}
 const _evaluate = () => {
     let temp = eval(`${currentNumber} ${operator} ${newNumber}`);
     setIsOperator(true);
     SetCurrentNumber(temp);
     SetNewNumber("0");
     _changeResult(temp);
 }
     
 const _handleOperator = (operator : string) => {
         //will handle =* cases later
         setIsEqualpressed(false);
        const lastIndex = newNumber.length-1;
        if(newNumber[lastIndex] === ".") {
         SetNewNumber(newNumber.slice(0,lastIndex)); 
        }
        if(isOperator === false && isEqualpressed === false)
          _evaluate();
        SetOperator(operator);
 }


 const _handleEqualSign = ()=> {
    if(isOperator === false && newNumber[newNumber.length - 1] ) {
        let  temp = eval(`${currentNumber} ${operator} ${newNumber}`);
        _changeResult(temp);
        SetCurrentNumber(temp);
        setIsEqualpressed(true);
        SetNewNumber("0");
        setIsOperator(false);
    }
 }
 const _handleClear = ()=> {
    setIsOperator(false);
    setIsEqualpressed(false);
    SetNewNumber("0");
    SetCurrentNumber("0");
    SetOperator("+");
    _changeResult("0");
 }

 const _handleDot = ()=> {
     if(!newNumber.includes(".") && isEqualpressed === false){
        setIsOperator(false);
        setIsEqualpressed(false);
        SetNewNumber(newNumber.concat("."));
     }
 }

 const _handleClick = (selectedButton:string) => {

         if(numbers.includes(selectedButton)) 
            _handleNumber(selectedButton);

         if(operators.includes(selectedButton)) 
            _handleOperator(selectedButton);

         if(selectedButton === "=") 
            _handleEqualSign();

         if(selectedButton === ".")
            _handleDot();

         if(selectedButton === "clear")
            _handleClear();
  }

    return (
        <div className = "btns">
             {
                buttonValues.map( (value,index) =>
                <button key ={`${value}-${index}-renderButtons`} 
                        onClick = { () =>  _handleClick(value) }
                >{value}
                </button>    
                )
                }
            <button className ="clear-btn"
             onClick={() => _handleClick("clear")}
            >CLEAR
            </button>

        </div>
    )
}
export default Buttons;


