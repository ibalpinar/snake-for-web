const GRID_SIZE = 21;

export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1
  }
}


export function outsideOfPlayground(snakeHeadPosition){
  return(
    snakeHeadPosition.x < 1 ||
    snakeHeadPosition.x > GRID_SIZE ||
    snakeHeadPosition.y < 1 ||
    snakeHeadPosition.y > GRID_SIZE
  )
}