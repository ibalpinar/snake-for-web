    // Function to save score to local storage
    window.saveScore = function(score) {
      // Get existing scores or create empty array
      let scores;
      try {
        scores = JSON.parse(localStorage.getItem('snakeScores') || '[]');
      } catch (e) {
        scores = [];
      }
      
      // Add new score with timestamp
      scores.push({
        score: score,
        date: new Date().toISOString()
      });
      
      // Save back to local storage
      localStorage.setItem('snakeScores', JSON.stringify(scores));
    };
