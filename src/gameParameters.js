export const GRID_SIZE = 51;
export const SNAKE_SPEED = 25; // Slowed down significantly for better gameplay
export const GROWTH_PARAMETER = 1;

const POINT = Math.floor(GRID_SIZE / 2) + 1;
export const STARTING_POSITION = { x: POINT, y: POINT };

// High Score Animation Parameters
export const HIGH_SCORE_ANIMATION = {
  ENABLED: true,
  DURATION: 3000, // Animation duration in milliseconds
  FLOAT_DISTANCE: 80, // How far the text floats up in pixels
  FADE_START_DELAY: 500, // When to start fading out (ms after animation starts)
  FONT_SIZE: '2.5vmin', // Size of the high score text
  COLOR: '#FFD700', // Gold color for high score text
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.8)', // Text shadow for better visibility
  SHADOW_BLUR: '4px'
};
