const inputSlider = document.querySelector("[data-lengthslider]");

const lengthDisplay = document.querySelector("[data-passlen]");

const passwordDisplay = document.querySelector("[data-displaypass]");

const copybtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copymsg]");

const upperCaseCheck = document.querySelector("#uppercase");

const lowerCaseCheck = document.querySelector("#lowercase");

const numbersCheck = document.querySelector("#numbers");

const symbolsCheck = document.querySelector("#symbols");

const dataIndicator = document.querySelector("[data-signal]");

const generateBtn = document.querySelector(".generate-btn");

const allCheckBoxes = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;

let checkCount = 0;

//set circle to gray

function handleSlider(){
   // inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

handleSlider();

function setIndicator(color){
    dataIndicator.style.backgroundColor = color;
}

function getRandomInteger(min, max){
    return Math.floor(Math.random()*(max-min)) + min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97, 123));
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65, 91));
}

function generateSymbol(){
    const randNum = getRandomInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function passwordStrength(){
    let isUpper = false;
    let isLower = false;
    let isSymbol = false;
    let isNum = false;

    if(upperCaseCheck.checked) isUpper = true;
    if(lowerCaseCheck.checked) isLower = true;
    if(symbolsCheck.checked) isSymbol = true;
    if(numbersCheck.checked) isNum = true;

    if(isUpper && isLower && (isNum || isSymbol) && passwordLength>=8)
        setIndicator("#0f0");
    else if((isLower || isUpper) && (isNum || isSymbol) && passwordLength >=6)
        setIndicator("#ff0");
    else
    setIndicator("#f00");
}

async function copyToClipBoard(){
    try{
        console.log("Pasting value");
        await navigator.clipboard.writeText(passwordDisplay.value);
        console.log("done");
        copyMsg.innerText = "Copied";
        console.log("check copied or not ?");
    }
    catch(e){
        console.log("in error block");
         copyMsg.innerText = "Failed";
    }
    
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000); 
}

inputSlider.addEventListener("input", (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copybtn.addEventListener("click", () => {
    if(passwordDisplay.value)
        {
            copyToClipBoard();
        }
});


function handleCheckBox(e){
    checkCount = 0;
    allCheckBoxes.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });


    if(passwordLength < checkCount)
     {   passwordLength = checkCount; handleSlider();}

    
}

allCheckBoxes.forEach((cbox) => {
    cbox.addEventListener("change", handleCheckBox);
})


// Fisher Yates method for shuffling password

function shufflePassword(sp){
    for(let i=sp.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = sp[i];
        sp[i] = sp[j];
        sp[j] = temp;
    }

    let str = "";
    sp.forEach((el) => str+=el);
    return str;
}




generateBtn.addEventListener("click", () => {
    if(checkCount ==0) return;

    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";
    // if(upperCaseCheck.checked){
    //     password+=generateUpperCase();
    // }
    // if(lowerCaseCheck.checked){
    //     password+=generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symbolsCheckCheck.checked){
    //     password+=generateSymbol();
    // }

    let funArr = [];
    if(upperCaseCheck.checked){
        funArr.push(generateUpperCase);
    }

    if(lowerCaseCheck.checked){
        funArr.push(generateLowerCase);
    }

    if(numbersCheck.checked){
        funArr.push(generateRandomNumber);
    }

    if(symbolsCheck.checked){
        funArr.push(generateSymbol);
    }

    for(let i=0; i<funArr.length;i++){
        password+=funArr[i]();
    }

    for(let i=0;i<passwordLength - funArr.length;i++){
        let randInt = getRandomInteger(0, funArr.length);
        password+=(funArr[randInt]());
    }

    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;

    passwordStrength();

})


