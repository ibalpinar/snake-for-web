import { onSnake, expandSnake } from './snake.js'
import { getRandomGridPosition } from './playground.js'
import { REWARD_FOOD, BOMB } from './gameParameters.js'
import { triggerGameOver } from './core.js'

let food = null;
let rewardFood = null;
let rewardFoodTimer = null;
let rewardFoodCountdownInterval = null;
let rewardFoodStartTime = null;
let regularFoodCount = 0; // Counter for regular foods eaten
let rewardFoodEatenCount = 0; // Counter for reward foods eaten

// Bomb variables
let bomb = null;
let bombTimer = null;
let bombCountdownInterval = null;
let bombStartTime = null;

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
    rewardFoodEatenCount++;
    removeRewardFood();
    
    // Check if we should spawn bomb (her iki ödül arasında)
    if (BOMB.ENABLED && rewardFoodEatenCount % BOMB.FREQUENCY === 0) {
      spawnBomb();
    }
  }
  
  // Check bomb collision - GAME OVER!
  if (bomb && onSnake(bomb)) {
    triggerGameOver();
    return;
  }
}

export function draw(gameBoard) {
  console.log('Hunt draw called, food position:', food); // Debug log
  
  // Initialize food position if not set
  if (!food) {
    food = getRandomFoodPosition();
    console.log('Initialized food position:', food); // Debug log
  }
  
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
  
  // Draw bomb if it exists
  if (bomb) {
    const bombElement = document.createElement('div');
    bombElement.style.gridRowStart = bomb.y;
    bombElement.style.gridColumnStart = bomb.x;
    bombElement.classList.add('hunt', 'bomb');
    gameBoard.appendChild(bombElement);
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
  if (rewardFoodCountdownInterval) {
    clearInterval(rewardFoodCountdownInterval);
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
  rewardFoodStartTime = Date.now();
  
  // Show countdown timer
  showCountdownTimer();
  
  // Start countdown interval (update every 100ms for smooth countdown)
  rewardFoodCountdownInterval = setInterval(() => {
    updateCountdownDisplay();
  }, 100);
  
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
  if (rewardFoodCountdownInterval) {
    clearInterval(rewardFoodCountdownInterval);
    rewardFoodCountdownInterval = null;
  }
  rewardFood = null;
  rewardFoodStartTime = null;
  hideCountdownTimer();
}

// Export function to reset reward food system when game restarts
export function resetRewardSystem() {
  removeRewardFood();
  removeBomb();
  regularFoodCount = 0;
  rewardFoodEatenCount = 0;
}

// Countdown timer functions
function showCountdownTimer() {
  const countdownElement = document.getElementById('reward-countdown');
  if (countdownElement) {
    countdownElement.style.display = 'flex';
  }
}

function hideCountdownTimer() {
  const countdownElement = document.getElementById('reward-countdown');
  if (countdownElement) {
    countdownElement.style.display = 'none';
  }
}

function updateCountdownDisplay() {
  if (!rewardFood || !rewardFoodStartTime) return;
  
  const elapsed = Date.now() - rewardFoodStartTime;
  const remaining = REWARD_FOOD.DURATION - elapsed;
  
  if (remaining <= 0) {
    hideCountdownTimer();
    return;
  }
  
  // Convert to seconds and round up
  const secondsRemaining = Math.ceil(remaining / 1000);
  
  const timerElement = document.getElementById('countdown-timer');
  if (timerElement) {
    timerElement.textContent = secondsRemaining;
  }
  
  // Add urgency styling when less than 3 seconds remain
  const countdownElement = document.getElementById('reward-countdown');
  if (countdownElement) {
    if (secondsRemaining <= 3) {
      countdownElement.style.backgroundColor = '#ff4444';
      countdownElement.style.borderColor = '#cc0000';
      countdownElement.style.animation = 'countdownUrgent 0.5s ease-in-out infinite alternate';
    } else {
      countdownElement.style.backgroundColor = '#FFD700';
      countdownElement.style.borderColor = '#FFA500';
      countdownElement.style.animation = 'countdownPulse 1s ease-in-out infinite alternate';
    }
  }
}

// Bomb functions
function spawnBomb() {
  // Clear any existing bomb timer
  if (bombTimer) {
    clearTimeout(bombTimer);
  }
  if (bombCountdownInterval) {
    clearInterval(bombCountdownInterval);
  }
  
  // Create bomb at a position that doesn't conflict with regular food, reward food or snake
  let newBombPosition;
  do {
    newBombPosition = getRandomGridPosition();
  } while (
    onSnake(newBombPosition) || 
    (newBombPosition.x === food.x && newBombPosition.y === food.y) ||
    (rewardFood && newBombPosition.x === rewardFood.x && newBombPosition.y === rewardFood.y)
  );
  
  bomb = newBombPosition;
  bombStartTime = Date.now();
  
  // Show bomb countdown timer
  showBombCountdownTimer();
  
  // Start countdown interval (update every 100ms for smooth countdown)
  bombCountdownInterval = setInterval(() => {
    updateBombCountdownDisplay();
  }, 100);
  
  // Set timer to remove bomb after specified duration (same as reward food)
  bombTimer = setTimeout(() => {
    removeBomb();
  }, BOMB.DURATION);
  
  console.log(`Bomb spawned! Will disappear in ${BOMB.DURATION/1000} seconds.`);
}

function removeBomb() {
  if (bombTimer) {
    clearTimeout(bombTimer);
    bombTimer = null;
  }
  if (bombCountdownInterval) {
    clearInterval(bombCountdownInterval);
    bombCountdownInterval = null;
  }
  bomb = null;
  bombStartTime = null;
  hideBombCountdownTimer();
}

// Bomb countdown timer functions
function showBombCountdownTimer() {
  const countdownElement = document.getElementById('bomb-countdown');
  if (countdownElement) {
    countdownElement.style.display = 'flex';
  }
}

function hideBombCountdownTimer() {
  const countdownElement = document.getElementById('bomb-countdown');
  if (countdownElement) {
    countdownElement.style.display = 'none';
  }
}

function updateBombCountdownDisplay() {
  if (!bomb || !bombStartTime) return;
  
  const elapsed = Date.now() - bombStartTime;
  const remaining = BOMB.DURATION - elapsed;
  
  if (remaining <= 0) {
    hideBombCountdownTimer();
    return;
  }
  
  // Convert to seconds and round up
  const secondsRemaining = Math.ceil(remaining / 1000);
  
  const timerElement = document.getElementById('bomb-countdown-timer');
  if (timerElement) {
    timerElement.textContent = secondsRemaining;
  }
  
  // Add urgency styling for bomb (always urgent)
  const countdownElement = document.getElementById('bomb-countdown');
  if (countdownElement) {
    if (secondsRemaining <= 3) {
      countdownElement.style.backgroundColor = '#cc0000';
      countdownElement.style.borderColor = '#990000';
      countdownElement.style.animation = 'bombUrgent 0.3s ease-in-out infinite alternate';
    } else {
      countdownElement.style.backgroundColor = '#ff4444';
      countdownElement.style.borderColor = '#cc0000';
      countdownElement.style.animation = 'bombPulse 0.5s ease-in-out infinite alternate';
    }
  }
}