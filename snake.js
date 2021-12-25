import { getInputDirection } from './input.js'

export const SNAKE_SPEED = 1;
const snakeBody = [ {x: 11, y: 11 } ];

export function update(){
  console.log('Update Snake');

  const inputDirection = getInputDirection();

  for(let i = snakeBody.length - 2; i >= 0; i--){
    snakeBody[i + 1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(playground){
  console.log('Draw Snake');

  snakeBody.forEach(node => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = node.y;
    snakeElement.style.gridColumnStart = node.x;
    snakeElement.classList.add('snake');
    playground.appendChild(snakeElement);
  });

}