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
        this.initkeyboard();

    }

    copyToClipBoard(){

        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();

    }

    pasteFromClipBoard(){

        document.addEventListener('paste', e=>{

            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text);

        });

    }




initialize() {
    
    this.setLastNumberToDisplay();
    this.pasteFromClipBoard();
}

initkeyboard(){

    document.addEventListener('keyup', e=>{



        switch (e.key) {

            case 'Escape':
                this.clearAll();
                break;
            case 'Backspace':
                this.clearEmtry();
                break;
            case '.':
            case ',':
                 this.addDot();
                break;
            case '+':
            case '-':
            case '*':
            case '%':
            case '/':
                this.addOperation(e.key);
                break;
            case 'Enter':
            case '=':
                this.calc();
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
                this.addOperation(parseInt(e.key));
                break;

            case 'c':
                if(e.ctrlKey) this.copyToClipBoard();
                break;

            
        }
    });

}

addEventListenerAll(element, events, fn){

    events.split(' ').forEach(event  => {


        element.addEventListener(event, fn, false);

    });
}

clearAll(){

this._operation = [];
this._lastOperation = '';
this._lastNumber = '';
this.setLastNumberToDisplay();
this.setArrayNumberToDisplay("");

}

clearEmtry(){

    this._operation.pop();
    this.setLastNumberToDisplay();
    this.setArrayNumberToDisplay("");
}

getLastOperation(){
    
    return this._operation[this._operation.length -1];
}

setLastOperation(value){

    this._operation[this._operation.length -1] = value;
    
}

deleteCarac(){
    let rem = this.getResult();
    console.log(rem.pop());
    this.setLastNumberToDisplay();
    this.setArrayNumberToDisplay("");

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

    let result = this.getResult();


    this.setArrayNumberToDisplay('sqr ' + this._operation.toString());

    let A = Math.sqrt(result);

    this._operation = [A];

    this.setLastNumberToDisplay();

    
}

pow(){

    let result = this.getResult();


    this.setArrayNumberToDisplay('sqr ' + this._operation.toString());

    result **= 2;

    this._operation = [result];

    this.setLastNumberToDisplay();
    
}

fraction(){
    
    
    let result = this.getResult();


    this.setArrayNumberToDisplay('1/ ' + this._operation.toString());

    result = 1 / result;

    this._operation = [result];

    this.setLastNumberToDisplay();

}

getResult(){

    try{

        return eval(this._operation.join(""));

        }catch(e){

            setTimeout(()=>{

                this.setLastNumberToDisplay();
            }, 1);

        }
    }

calc(){

    let last = '';

    this._lastOperator = this.getLastItem();

    if(this._operation.length < 3){

        let firstItem = this._operation[0];
        this._operation = [firstItem, this._lastOperator, this._lastNumber];

    }

    if(this._operation.length > 3){
        last = this._operation.pop();

        this._lastNumber = this.getResult();

    }else if(this._operation.length == 3){

        this._lastNumber = this.getLastItem(false);
    }

    let result = this.getResult();

    if (last == '%') {

        result /= 100;

        this._operation = [result];

    } else {

        this._operation = [result];

        if (last) this._operation.push(last);

    }

    this.setLastNumberToDisplay();

}

getLastItem(isOperation = true){

    let lastItem;

    for(let i =  this._operation.length-1; i >= 0; i--){

        if (this.isOperation(this._operation[i]) == isOperation) {
            lastItem = this._operation[i];
            break;

        }

        if (!lastItem){

            lastItem = (isOperation) ? this._lastOperator : this._lastNumber;
        }
    }

        return lastItem;
}

setLastNumberToDisplay(){

    let lastNumber = this.getLastItem(false);
    
    if(!lastNumber) lastNumber = 0;
    this.displayCalc = lastNumber;
    
}

setArrayNumberToDisplay(value){

    let i = [];
    i.push(value);

    this.displaySecondCalc = i;

}

addOperation(value){

    if(isNaN(this.getLastOperation())){

        if(this.isOperation(value)){

            this.setLastOperation(value);

        }else {

            this.pushOperation(value);
            this.setLastNumberToDisplay();
            
        }

    }else{

        if(this.isOperation(value)){

            this.pushOperation(value);
            

            
        }else{

            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseFloat(newValue));
        
            this.setLastNumberToDisplay();
            
        }
        
    }
}

addDot(){

    let lastOperation = this.getLastOperation();

    if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

    if(this.isOperation(lastOperation) || !lastOperation) {
        this.pushOperation('0.');

    } else {
        this.setLastOperation(lastOperation.toString() + '.');
    }
    
    this.setLastNumberToDisplay();
}

addNegative(){

    let lastOperation = this.getLastOperation();

    if(this.isOperation(lastOperation) || !lastOperation) {
        this.pushOperation('-');

    } else {
        this.setLastOperation('-' + lastOperation.toString());
    }
    
    this.setLastNumberToDisplay();
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
             this.addDot();
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
            this.calc();
            break; 
        case '%':
            this.addOperation('%');
            break;
        case '←':
            this.deleteCarac();
            break;
        case '±':
            this.addNegative();
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

    if(value.toString().length > 11) {

        this.setError();
        return false;

    }


    this._displayCalcEl.innerHTML = value;

    }

get displaySecondCalc(){
    return this._displaySecondCalcEl.innerHTML;

    }
set displaySecondCalc(value){

    this._displaySecondCalcEl.innerHTML = value;

    }
    
}