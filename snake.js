import { getInputDirection } from './input.js'

export const SNAKE_SPEED = 5;
export const GROWTH_PARAMETER = 1;
const snakeBody = [ {x: 11, y: 11 } ];
let newNodes = 0;

export function update(){
  // console.log('Update Snake');

  addNodes();
  const inputDirection = getInputDirection();

  for(let i = snakeBody.length - 2; i >= 0; i--){
    snakeBody[i + 1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(playground){
  // console.log('Draw Snake');

  snakeBody.forEach(nodePosition => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = nodePosition.y;
    snakeElement.style.gridColumnStart = nodePosition.x;
    snakeElement.classList.add('snake');
    playground.appendChild(snakeElement);
  });
}

export function growSnake(amount){
  newNodes += amount;
}

export function onSnake(huntPosition){
  return snakeBody.some(nodePosition => {
    return equalPosition(nodePosition, huntPosition);
  });
}

function equalPosition(position1, position2){
  return position1.x === position2.x && position1.y === position2.y;
}

function addNodes(){
  for(let i = 0; i < newNodes; i++){
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newNodes = 0;
}