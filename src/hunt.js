import { onSnake, expandSnake } from './snake.js'
import { getRandomGridPosition } from './playground.js'

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1; // Ne kadar segmentle büyüteceği

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE); // growSnake yerine expandSnake kullan
    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('hunt');
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = getRandomGridPosition();
  }
  return newFoodPosition;
}