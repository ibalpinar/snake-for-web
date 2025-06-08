import { onSnake, expandSnake } from './snake.js'
import { getRandomGridPosition } from './playground.js'
import { REWARD_FOOD } from './gameParameters.js'

let food = getRandomFoodPosition();
let rewardFood = null;
let rewardFoodTimer = null;
let regularFoodCount = 0; // Counter for regular foods eaten
const EXPANSION_RATE = 1; // Ne kadar segmentle büyüteceği

export function update() {
  // Check regular food collision
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE); // growSnake yerine expandSnake kullan
    regularFoodCount++;
    food = getRandomFoodPosition();
    
    // Check if we should spawn reward food
    if (REWARD_FOOD.ENABLED && regularFoodCount % REWARD_FOOD.FREQUENCY === 0) {
      spawnRewardFood();
    }
  }
  
  // Check reward food collision
  if (rewardFood && onSnake(rewardFood)) {
    // Give bonus points for reward food
    expandSnake(EXPANSION_RATE * REWARD_FOOD.SCORE_MULTIPLIER);
    removeRewardFood();
  }
}

export function draw(gameBoard) {
  // Draw regular food
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('hunt');
  gameBoard.appendChild(foodElement);
  
  // Draw reward food if it exists
  if (rewardFood) {
    const rewardFoodElement = document.createElement('div');
    rewardFoodElement.style.gridRowStart = rewardFood.y;
    rewardFoodElement.style.gridColumnStart = rewardFood.x;
    rewardFoodElement.classList.add('hunt', 'reward-food');
    gameBoard.appendChild(rewardFoodElement);
  }
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = getRandomGridPosition();
  }
  return newFoodPosition;
}

function spawnRewardFood() {
  // Clear any existing reward food timer
  if (rewardFoodTimer) {
    clearTimeout(rewardFoodTimer);
  }
  
  // Create reward food at a position that doesn't conflict with regular food or snake
  let newRewardPosition;
  do {
    newRewardPosition = getRandomGridPosition();
  } while (
    onSnake(newRewardPosition) || 
    (newRewardPosition.x === food.x && newRewardPosition.y === food.y)
  );
  
  rewardFood = newRewardPosition;
  
  // Set timer to remove reward food after specified duration
  rewardFoodTimer = setTimeout(() => {
    removeRewardFood();
  }, REWARD_FOOD.DURATION);
  
  console.log(`Reward food spawned! Will disappear in ${REWARD_FOOD.DURATION/1000} seconds.`);
}

function removeRewardFood() {
  if (rewardFoodTimer) {
    clearTimeout(rewardFoodTimer);
    rewardFoodTimer = null;
  }
  rewardFood = null;
}

// Export function to reset reward food system when game restarts
export function resetRewardSystem() {
  removeRewardFood();
  regularFoodCount = 0;
}