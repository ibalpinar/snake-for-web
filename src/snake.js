import { getInputDirection } from './input.js'

export let score = 0;
let snakeBody = [
  { x: 26, y: 26 }
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
  newSegments += amount;
  score += 10;  // Her genişlemede skoru 10 artır
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