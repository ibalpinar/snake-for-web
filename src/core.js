import { update as updateSnake, draw as drawSnake, getSnakeHead, isTailIntersect, score } from './snake.js'
import { update as updateHunt, draw as drawHunt }  from './hunt.js'
import { outsideOfPlayground } from './playground.js';
import { getInputDirection } from './input.js';
import { SNAKE_SPEED } from './gameParameters.js';

const board = document.getElementById('playground');
const playground = document.getElementById('playground');
let lastRenderTime = 0;
let gameOver = false;
let gameStarted = false;
let gamePaused = false;

function main(currentTime){
  if(gameOver){
    // Save the score before showing popup
    if (window.saveScore) {
      window.saveScore(score);
    }
    
    // Show previous scores popup instead of alert
    if (window.showPreviousScoresPopup) {
      window.showPreviousScoresPopup();
    }
    return;
  }

  // If game is paused, still request next frame but don't update
  if(gamePaused) {
    window.requestAnimationFrame(main);
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if(secondsSinceLastRender < 1 / SNAKE_SPEED)
    return;

  lastRenderTime = currentTime;
  update();
}

window.requestAnimationFrame(main);

function update(){
  // Mark game as started when snake starts moving
  if (!gameStarted) {
    const inputDirection = getInputDirection();
    if (inputDirection.x !== 0 || inputDirection.y !== 0) {
      gameStarted = true;
    }
  }
  
  // Only update snake and hunt if game has started
  if (gameStarted) {
    updateSnake();
    updateHunt();
    checkGameStatus();
  }
  
  // Always draw the current state (whether started or not)
  draw();
}

function draw(){
  playground.innerHTML = '';
  drawSnake(playground);
  drawHunt(playground);
}

function checkGameStatus(){
  // Only check for game over conditions if the game has actually started
  if (gameStarted) {
    gameOver = ( outsideOfPlayground(getSnakeHead()) || isTailIntersect() );
  }
}

// Pause and resume functions
function pauseGame() {
  gamePaused = true;
  showPauseOverlay();
}

function resumeGame() {
  gamePaused = false;
  hidePauseOverlay();
}

// Pause overlay functions
function showPauseOverlay() {
  const pauseOverlay = document.getElementById('pause-overlay');
  if (pauseOverlay) {
    pauseOverlay.style.display = 'flex';
  }
}

function hidePauseOverlay() {
  const pauseOverlay = document.getElementById('pause-overlay');
  if (pauseOverlay) {
    pauseOverlay.style.display = 'none';
  }
}

// Export gameOver state and game control functions for other modules to check
export { gameOver, gameStarted, gamePaused, pauseGame, resumeGame };
