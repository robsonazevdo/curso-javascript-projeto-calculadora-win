class CalcController {

    constructor(){

        //this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';
        this._displayCalcEl = document.querySelector("#display");
        this._displaySecondCalcEl = document.querySelector("#display2");
        this._operation = [];
        this._firstOperation = [];
        this.initialize();
        this.initButtonsEvents();
        //this.initkeyboard();

    }



initialize() {
    
    this.setLastNumberToDisplay();

}

addEventListenerAll(element, events, fn){

    events.split(' ').forEach(event  => {


        element.addEventListener(event, fn, false);

    });
}

clearAll(){

this._operation = [];
this.setLastNumberToDisplay();
}

clearEmtry(){

    this._operation.pop();
    this.setLastNumberToDisplay();
}

getLastOperation(){
    
    return this._operation[this._operation.length -1];
    
}

setLastOperation(value){

    this._operation[this._operation.length -1] = value;
}

deleteCarac(){


}

setError(){
    this.displayCalc = "Error";
}

isOperation(value){
    return (['+', '-', '*', '/', '%'].indexOf(value)> -1) 

}

pushOperation(value){
    this._operation.push(value);

    if(this._operation.length > 3){

        this.calc();
        
    }
    
}

sqrt(){

    let result = eval(this._operation.join(""));

    this.setArrayNumberToDisplay('sqr ' + this._operation.toString());

    let A = Math.sqrt(result);

    this._operation = [A];

    this.setLastNumberToDisplay();

    
}

pow(){

    let result = eval(this._operation.join(""));

    this.setArrayNumberToDisplay('sqr ' + this._operation.toString());

    result **= 2;

    this._operation = [result];

    this.setLastNumberToDisplay();
    
}

fraction(){

    let result = eval(this._operation.join(""));

    this.setArrayNumberToDisplay('1/ ' + this._operation.toString());

    result = 1 / result;

    this._operation = [result];

    this.setLastNumberToDisplay();

}

calc(){

    let last = this._operation.pop();
    let result = eval(this._operation.join(""));
    console.log(this._operation);
    if(last == '%'){
        result /= 100;

        this._operation = [result];
    
    }else {

        this._operation = [result, last];
    }
    
    this.setLastNumberToDisplay();
    
}

setLastNumberToDisplay(){

    let lastNumber ;
    
    for(let i = this._operation.length-1; i >= 0; i--){

        if(!this.isOperation(this._operation[i])){
            lastNumber = this._operation[i];
            break;
            
        }
        
    }
    if(!lastNumber) lastNumber = 0;
    this.displayCalc = lastNumber;
   
}

setArrayNumberToDisplay(value){

    this.displaySecondCalc = value;

}

addOperation(value){

    if(isNaN(this.getLastOperation())){


        if(this.isOperation(value)){

            this.setLastOperation(value);

        }else if(isNaN(value)){


        }else {

            this.pushOperation(value);

            this.setLastNumberToDisplay();
            
        }

    }else{

        if(this.isOperation(value)){

            this.pushOperation(value);
            

            
        }else{

            let newValue = this.getLastOperation().toString() + value.toString()
            this.setLastOperation(parseInt(newValue));

            this.setLastNumberToDisplay();

        }
        
    }
}

execBtn(value){


    switch (value) {

        case 'C':
            this.clearAll();
            break;
        case 'CE':
            this.clearEmtry();
            break;
        case ',':
             this.addDot(',');
            break;
        case '+':
            this.addOperation('+');
            break;
        case '*':
            this.addOperation('*');
            break;
        case '/':
            this.addOperation('/');
            break;
        case '-':
            this.addOperation('-');
            break;
        case '=':
            this.addOperation('=');
            this.calc();
            break; 
        case '%':
            this.addOperation('%');
            break;
        case '←':
            this.deleteCarac();
            break;
        case '±':
            this.addOperation('±');
            break;
        case '√':
            this.sqrt();
            break;
        case 'x²':
            this.pow();
            break;
        case '¹/x':
            this.fraction();
            break;

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            this.addOperation(parseInt(value));
            break;

        default:
            this.setError();
            break;
    }
}

initButtonsEvents() {

    let buttons = document.querySelectorAll(".row > button");
    
    buttons.forEach((btn, index)=>{

        this.addEventListenerAll(btn,"click drag", e => {

            let but = btn.className.replace(/btn btn-number col-sm btn-/g, "");
            let textBtn = but.replace(/btn btn-others col-sm btn-/g, "");

            this.execBtn(textBtn);
    
        });

        this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

            btn.style.cursor = "pointer";
        });

    });

} 
    



get displayCalc(){
    return this._displayCalcEl.innerHTML;

    }
set displayCalc(value){

    this._displayCalcEl.innerHTML = value;

    }

get displaySecondCalc(){
    return this._displaySecondCalcEl.innerHTML;

    }
set displaySecondCalc(value){

    this._displaySecondCalcEl.innerHTML = value;

    }
    
}