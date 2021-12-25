import { SNAKE_SPEED, update as updateSnake, draw as drawSnake } from './snake.js'

let lastRenderTime = 0;
const board = document.getElementById('playground');

function main(currentTime){
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
}

function draw(){
  playground.innerHTML = '';
  drawSnake(playground);
}