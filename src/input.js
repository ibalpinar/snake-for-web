let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

window.addEventListener('keydown', e => {
  switch(e.key){
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1};
      break;
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1};
      break;
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0};
      break;
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0};
      break;
    case ' ':
    case 'Space':
      // Handle space key for pause/resume
      import('./core.js').then(module => {
        if (module.gameStarted && !module.gameOver) {
          if (module.gamePaused) {
            module.resumeGame();
          } else {
            module.pauseGame();
          }
        }
      });
      e.preventDefault(); // Prevent page scrolling
      break;
  }
});

export function getInputDirection(){
  lastInputDirection = inputDirection;
  return inputDirection;
}