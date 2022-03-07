const continer = document.querySelector('.continer');
const xClass = 'x';
const circleClass = 'circle';

let turn;

for(let i=1; i<=9; i++){
  let cell = document.createElement('div');
  cell.classList.add('cell');
  continer.appendChild(cell);
};

let cells = document.querySelectorAll('.cell');
const winningCombination = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8 ]
];

const winnContiner = document.querySelector('.winner');
const message = document.querySelector('[winnerMessageText]');
const again = document.querySelector('.again');

start();

again.addEventListener('click', start);

function start(){
  turn = false;
  setHoverClass();
  cells.forEach(function(cell) {
    restarting(cell);
    cell.addEventListener('click', currentCell, { once: true });
  });
};

function currentCell(e){
  const cell = e.target;
  const selectClass = turn ? circleClass :  xClass;
  setClass(cell, selectClass);  
  if(winner(selectClass)){
    end(true);
  } else if(draw()){
    end(false);
  }else{
    changeClass();
    setHoverClass();
  }; 
};

function setClass(cell, oneclass){
  cell.classList.add(oneclass);
};

function changeClass(){
  turn = !turn;
};

function setHoverClass(){
 continer.classList.remove(xClass);
 continer.classList.remove(circleClass);
 if(turn){
   continer.classList.add(circleClass);
 }else{
  continer.classList.add(xClass);
 };
};

function winner(curretClass){
  return winningCombination.some(convination =>{
    return convination.every(i =>{
      return cells[i].classList.contains(curretClass);
    });
  });
};

function draw(){
  return [...cells].every(cell =>{
    return cell.classList.contains(xClass) || cell.classList.contains(circleClass);
  });
};

function end(show){
  if(show){
    message.innerText = `${turn ? 0 : "X"} Wins!`;
  } else{
    message.innerText = 'Draw!';
  };
  winnContiner.classList.add('show');
};

function restarting(cell){
  winnContiner.classList.remove('show');
  cell.classList.remove(xClass);
  cell.classList.remove(circleClass);
  cell.removeEventListener('click', currentCell);
};