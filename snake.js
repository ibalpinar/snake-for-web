import { getInputDirection } from './input.js';
import { STARTING_POSITION } from './gameParameters.js';

const snakeBody = [ STARTING_POSITION ];
let newNodes = 0;

export function update(){
  addNodes();
  const inputDirection = getInputDirection();

  for(let i = snakeBody.length - 2; i >= 0; i--){
    snakeBody[i + 1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(playground){
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

export function onSnake(huntPosition, { igrnoreHead = false } = {}){
  return snakeBody.some((nodePosition, index) => {
    if (igrnoreHead && index === 0)
      return false;
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

export function getSnakeHead(){
  return snakeBody[0];
}

export function isTailIntersect(){
  return onSnake(snakeBody[0], { igrnoreHead: true });
}