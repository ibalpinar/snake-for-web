import { getInputDirection } from './input.js';
import { GRID_SIZE, GROWTH_PARAMETER, STARTING_POSITION, HIGH_SCORE_ANIMATION } from './gameParameters.js';

export let score = 0;
let snakeBody = [
  { x: 26, y: 26 },    // Head
  { x: 25, y: 26 },    // Body segment 1
  { x: 24, y: 26 }     // Body segment 2 (tail)
];
let newSegments = 0;
let lastDirection = { x: 0, y: 0 };
let previousPositions = []; // Pozisyon geçmişini saklayalım

// Yılanın hızı için faktör
const SMOOTHNESS_FACTOR = 0.005;

export function update() {
  addSegments();
  
  // Önceki pozisyonları saklayalım (interpolasyon için)
  previousPositions = snakeBody.map(segment => ({...segment}));
  
  const inputDirection = getInputDirection();
  
  // Yön değiştiyse son yönü kaydedelim
  if (inputDirection.x !== 0 || inputDirection.y !== 0) {
    lastDirection = inputDirection;
  }
  
  // Yılanın gövdesini güncelle (kuyruktan başa doğru)
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  
  // Yılanın başını güncelle
  snakeBody[0].x += lastDirection.x;
  snakeBody[0].y += lastDirection.y;
}

export function draw(gameBoard, interpolationFactor = SMOOTHNESS_FACTOR) {
  // Önce mevcut tüm yılan segmentlerini temizleyelim
  const currentSnakeElements = document.querySelectorAll('.snake');
  currentSnakeElements.forEach(element => element.remove());
  
  snakeBody.forEach((segment, index) => {
    const snakeElement = document.createElement('div');
    snakeElement.classList.add('snake');
    
    // Eğer geçmiş pozisyonlar ve interpolasyon faktörü varsa smooth hareket uygula
    if (previousPositions.length > 0 && index < previousPositions.length && interpolationFactor > 0) {
      const prevPos = previousPositions[index];
      
      // Eğer başlık segmenti ise doğrudan hareket ettir
      if (index === 0) {
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
      } 
      // Diğer segmentler için smooth geçiş yap
      else {
        // Bir sonraki pozisyona doğru interpolasyon
        const nextSegment = snakeBody[index-1];
        const direction = {
          x: Math.sign(nextSegment.x - segment.x),
          y: Math.sign(nextSegment.y - segment.y)
        };
        
        // Segment pozisyonu hesapla
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        
        // Segmentler arasında doğal bir takip hareketi için
        snakeElement.style.transform = `translate(${direction.x * interpolationFactor * 100}%, ${direction.y * interpolationFactor * 100}%)`;
      }
    } else {
      // Interpolasyon yok, normal grid pozisyonu
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.style.gridRowStart = segment.y;
    }
    
    // Baş segment için özel sınıf ekle (isteğe bağlı)
    if (index === 0) {
      snakeElement.classList.add('snake-head');
    }
    
    // Animasyon sınıfı (CSS'de transition eklenecek)
    snakeElement.classList.add('animated');
    
    gameBoard.appendChild(snakeElement);
  });
  
  // Skor güncellensin
  const scoreElement = document.getElementById('score');
  if (scoreElement) {
    scoreElement.textContent = score;
  }
}

export function expandSnake(amount) {
  const previousScore = score;
  newSegments += amount;
  
  // Calculate points based on amount (reward food gives more points)
  const pointsPerSegment = 10;
  const pointsToAdd = amount * pointsPerSegment;
  score += pointsToAdd;
  
  // Check if we've broken the high score
  checkAndTriggerHighScore(previousScore, score);
}

// Function to get current high score from localStorage
function getCurrentHighScore() {
  let scores;
  try {
    scores = JSON.parse(localStorage.getItem('snakeScores') || '[]');
  } catch (e) {
    scores = [];
  }
  if (scores.length === 0) return 0;
  
  return Math.max(...scores.map(scoreEntry => scoreEntry.score));
}

// Function to check and trigger high score animation
function checkAndTriggerHighScore(previousScore, newScore) {
  if (!HIGH_SCORE_ANIMATION.ENABLED) return;
  
  const currentHighScore = getCurrentHighScore();
  
  // Check if we've surpassed the high score
  if (previousScore <= currentHighScore && newScore > currentHighScore) {
    triggerHighScoreAnimation();
  }
}

// Function to trigger the high score animation
function triggerHighScoreAnimation() {
  console.log('High score achieved! Triggering animation...');
  const gameHeader = document.querySelector('.game-header');
  
  if (!gameHeader) return;
  
  // Create animation element
  const animationElement = document.createElement('div');
  animationElement.className = 'high-score-animation';
  animationElement.textContent = '🏆 NEW HIGH SCORE! 🏆';
  
  // Set CSS custom properties for animation
  animationElement.style.setProperty('--animation-duration', `${HIGH_SCORE_ANIMATION.DURATION}ms`);
  animationElement.style.setProperty('--float-distance', `-${HIGH_SCORE_ANIMATION.FLOAT_DISTANCE}px`);
  
  // Style the element
  animationElement.style.fontSize = HIGH_SCORE_ANIMATION.FONT_SIZE;
  animationElement.style.color = HIGH_SCORE_ANIMATION.COLOR;
  animationElement.style.textShadow = `${HIGH_SCORE_ANIMATION.SHADOW_BLUR} ${HIGH_SCORE_ANIMATION.SHADOW_COLOR}`;
  
  // Position it slightly to the left in the header
  animationElement.style.position = 'absolute';
  animationElement.style.left = '30%';
  animationElement.style.top = '50%';
  animationElement.style.transform = 'translate(-50%, -50%)';
  animationElement.style.zIndex = '1001';
  
  // Add to header (make sure header has relative positioning)
  gameHeader.style.position = 'relative';
  gameHeader.appendChild(animationElement);
  
  // Remove after animation completes
  setTimeout(() => {
    if (animationElement.parentNode) {
      animationElement.parentNode.removeChild(animationElement);
    }
  }, HIGH_SCORE_ANIMATION.DURATION);
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function isTailIntersect() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    // Yeni segment eklerken son segmentin pozisyonunu kullanırız
    const lastSegment = snakeBody[snakeBody.length - 1];
    snakeBody.push({ ...lastSegment });
  }
  newSegments = 0;
}

// Function to reset the snake to initial state
export function resetSnake() {
  score = 0;
  snakeBody = [
    { x: 26, y: 26 },    // Head
    { x: 25, y: 26 },    // Body segment 1
    { x: 24, y: 26 }     // Body segment 2 (tail)
  ];
  newSegments = 0;
  lastDirection = { x: 0, y: 0 };
  previousPositions = [];
}