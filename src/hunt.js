import { onSnake, growSnake } from './snake.js'
import { randomGridPosition } from './playground.js';
import { GROWTH_PARAMETER } from './gameParameters.js';

let huntPosition = getRandomHuntPosition();

export function update(){
  if(onSnake(huntPosition)){
    growSnake(GROWTH_PARAMETER);
    huntPosition = getRandomHuntPosition();
  }
}

export function draw(playground){
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