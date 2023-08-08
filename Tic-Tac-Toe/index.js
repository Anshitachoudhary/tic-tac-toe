const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create a function to initialize a game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // ui pr boxs empty krne ke liye
    boxes.forEach((box,index)=>{
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";

    box.classList = `box box${index+1}`;
    });
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
} 
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    // ui update
    gameInfo.innerText = `current player -${currentPlayer}`;
}
//jb box fill ho jayenge
function checkGameOver(){
let answer = "";
winningPosition.forEach((position)=>{
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
    &&(gameGrid[position[0]] === gameGrid[position[1]]) && gameGrid[position[1]] === gameGrid[position[2]]){
 
    // check if winner is X
    if(gameGrid[position[0]] === "X"){
 answer = "X";
}
 else{
    answer = "0";
 }  
//  disable pointer Events  
boxes.forEach((box)=>{
    box.style.pointerEvents = "none";
})

// now we know X/0 is a winner   ....bg color
boxes[position[0]].classList.add("win");
boxes[position[1]].classList.add("win");
boxes[position[2]].classList.add("win");
    }
});
// it means we have winner
if(answer !== ""){
    gameInfo.innerText = `winner Player - ${answer}`;
    newGamebtn.classList.add("active");
    return;
}

// we know ,no winner found lets check whether there is tie
let fillCount = 0;
gameGrid.forEach((box) => {
    if(box !== "")
    fillCount++;
});
if(fillCount === 9){
    gameInfo.innerText = "game Tied !";
    newGamebtn.classList.add("active");
}
}

 function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap kro turn ko
        swapTurn();
        // check koi jeet to nhi rha 
        checkGameOver();
    }
 }

 boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
 });
 newGamebtn.addEventListener("click",initGame);