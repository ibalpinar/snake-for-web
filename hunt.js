import { onSnake, growSnake, GROWTH_PARAMETER } from './snake.js'
import { randomGridPosition } from './playground.js';

let huntPosition = getRandomHuntPosition();

export function update(){
  // console.log('Update Hunt');
  if(onSnake(huntPosition)){
    growSnake(GROWTH_PARAMETER);
    huntPosition = getRandomHuntPosition();
  }
}

export function draw(playground){
  // console.log('Draw Hunt');

  const huntElement = document.createElement('div');
  huntElement.style.gridRowStart = huntPosition.y;
  huntElement.style.gridColumnStart = huntPosition.x;
  huntElement.classList.add('hunt');
  playground.appendChild(huntElement);
}

function getRandomHuntPosition(){
  let newHuntPosition;

  while(newHuntPosition == null || onSnake(newHuntPosition)){
    newHuntPosition = randomGridPosition();
  }

  return newHuntPosition;
}