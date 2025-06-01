// Oyun alanının sınırları için grid boyutlarını tanımlayalım
const GRID_SIZE = 51;

// Rastgele grid pozisyonu oluşturmak için fonksiyon
export function getRandomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1
  }
}

// Bir pozisyonun oyun alanı dışında olup olmadığını kontrol eden fonksiyon
export function outsideOfPlayground(position) {
  return (
    position.x < 1 || position.x > GRID_SIZE ||
    position.y < 1 || position.y > GRID_SIZE
  )
}