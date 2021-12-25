let hunt = { x: 0, y: 0 };
export function update(){
}

export function draw(playground){
  console.log('Draw Hunt');

  const huntElement = document.createElement('div');
  snakeElement.style.gridRowStart = hunt.y;
  snakeElement.style.gridColumnStart = hunt.x;
  snakeElement.classList.add('snake');
  playground.appendChild(snakeElement);

}