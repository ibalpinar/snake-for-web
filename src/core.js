import { update as updateSnake, draw as drawSnake, getSnakeHead, isTailIntersect, score } from './snake.js'
import { update as updateHunt, draw as drawHunt }  from './hunt.js'
import { outsideOfPlayground } from './playground.js';
import { SNAKE_SPEED } from './gameParameters.js';

const board = document.getElementById('playground');
let lastRenderTime = 0;
let gameOver = false;

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

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if(secondsSinceLastRender < 1 / SNAKE_SPEED)
    return;

  lastRenderTime = currentTime;
  update();
  draw();
}

window.requestAnimationFrame(main);

function update(){
  updateSnake();
  updateHunt();
  checkGameStatus();
}

function draw(){
  playground.innerHTML = '';
  drawSnake(playground);
  drawHunt(playground);
}

function checkGameStatus(){
  gameOver = ( outsideOfPlayground(getSnakeHead()) || isTailIntersect() );
}
