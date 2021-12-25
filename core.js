import { update as updateSnake, draw as drawSnake, getSnakeHead, isTailIntersect } from './snake.js'
import { update as updateHunt, draw as drawHunt }  from './hunt.js'
import { outsideOfPlayground } from './playground.js';
import { SNAKE_SPEED } from './gameParameters.js';

const board = document.getElementById('playground');
let lastRenderTime = 0;
let gameOver = false;

function main(currentTime){
  if(gameOver){
    if(confirm('Game Over! Wanna Retry?')){
      window.location = '/';
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if(secondsSinceLastRender < 1 / SNAKE_SPEED)
    return;

  // console.log("Render");
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