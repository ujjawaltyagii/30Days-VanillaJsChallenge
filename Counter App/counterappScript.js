// var val = document.querySelector("#counter");

// const increment = ()=>{
//     let num = parseInt(val.innerText);
//     num = num + 1;
//     val.innerText = num;
// };

// const decrement = ()=>{
//     let num = parseInt(val.innerText);
//     num = num - 1;
//     val.innerText = num;
// };

var increment = document.querySelector("#inc");
var decrement = document.querySelector("#dec");
var count = document.querySelector("#counter");

increment.addEventListener("click", incfxn);
decrement.addEventListener("click", decfxn);

function incfxn(){
    let val = parseInt(count.innerText);
    val = val + 1;
    count.innerText = val;
}

function decfxn(){
    let val = parseInt(count.innerText);
    val = val - 1;
    count.innerText = val;
}