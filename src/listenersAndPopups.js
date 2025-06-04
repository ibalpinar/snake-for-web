  // Simple popup functionality
  document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('previous-score-popup');
    const confirmationPopup = document.getElementById('exit-confirmation-popup');
    const previousScoreButton = document.getElementById('previous-score');
    const closeButton = document.querySelector('.close-popup');
    const restartHeaderButton = document.getElementById('restart-game-header');
    const backButton = document.querySelector('.back-button');
    const confirmExitButton = document.getElementById('confirm-exit');
    const cancelExitButton = document.getElementById('cancel-exit');
    
    // Store the action to be performed after confirmation
    let pendingAction = null;
    
    // Function to check if game is currently active (started, moving, and not over)
    function isGameActive() {
      return new Promise((resolve) => {
        import('./core.js').then(module => {
          // Game is active only if it's started, not over, and not already paused
          // This means the snake is actually moving
          resolve(module.gameStarted && !module.gameOver && !module.gamePaused);
        }).catch(() => {
          // If import fails, assume game is not active
          resolve(false);
        });
      });
    }
    
    // Function to show confirmation popup
    function showConfirmationPopup(action) {
      pendingAction = action;
      // Pause the game when showing confirmation
      import('./core.js').then(module => {
        if (module.gameStarted && !module.gameOver) {
          module.pauseGame();
        }
      });
      confirmationPopup.style.display = 'block';
    }
    
    // Function to hide confirmation popup
    function hideConfirmationPopup() {
      confirmationPopup.style.display = 'none';
      pendingAction = null;
      // Don't automatically resume the game - it should stay paused
      // The game will only resume if the user cancels and wants to continue playing
    }
    
    // Open popup when clicking on Previous Score button
    previousScoreButton.addEventListener('click', function(e) {
      e.preventDefault();
      isGameActive().then(gameActive => {
        if (gameActive) {
          showConfirmationPopup(() => {
            displayPreviousScores();
            popup.style.display = 'block';
          });
        } else {
          displayPreviousScores();
          popup.style.display = 'block';
        }
      });
    });
    
    // Header restart button functionality
    restartHeaderButton.addEventListener('click', function(e) {
      e.preventDefault();
      isGameActive().then(gameActive => {
        if (gameActive) {
          showConfirmationPopup(() => {
            location.reload();
          });
        } else {
          location.reload();
        }
      });
    });
    
    // Back button functionality
    backButton.addEventListener('click', function(e) {
      e.preventDefault();
      isGameActive().then(gameActive => {
        if (gameActive) {
          showConfirmationPopup(() => {
            window.location.href = 'http://balpinar.com';
          });
        } else {
          window.location.href = 'http://balpinar.com';
        }
      });
    });
    
    // Confirmation popup handlers
    confirmExitButton.addEventListener('click', function() {
      // Don't resume game when confirming exit
      confirmationPopup.style.display = 'none';
      if (pendingAction) {
        pendingAction();
      }
      pendingAction = null;
    });
    
    cancelExitButton.addEventListener('click', function() {
      hideConfirmationPopup();
      // Don't resume the game when canceling - keep it paused
      // User must press SPACE to resume the game
    });
    
    // Close confirmation popup when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === confirmationPopup) {
        hideConfirmationPopup();
        // Don't resume the game when clicking outside - keep it paused
        // User must press SPACE to resume the game
      }
    });
    
    // Close popup when clicking on X
    closeButton.addEventListener('click', function() {
      popup.style.display = 'none';
    });
    
    // Close confirmation popup when clicking on X
    const closeConfirmation = document.querySelector('.close-confirmation');
    if (closeConfirmation) {
      closeConfirmation.addEventListener('click', function() {
        hideConfirmationPopup();
        // Don't resume the game when closing (X button) - keep it paused
        // User must press SPACE to resume the game
      });
    }
    
    // Close popup when clicking outside the content
    window.addEventListener('click', function(e) {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
    
    // Function to display previous scores
    function displayPreviousScores() {
      const scoreTable = document.querySelector('#score-table tbody');
      const noScores = document.getElementById('no-scores');
      
      // Get scores from local storage
      const scores = JSON.parse(localStorage.getItem('snakeScores')) || [];
      
      // Clear existing content
      scoreTable.innerHTML = '';
      
      if (scores.length === 0) {
        // Show no scores message
        scoreTable.style.display = 'none';
        noScores.style.display = 'block';
        return;
      }
      
      // Show table and hide no scores message
      scoreTable.style.display = 'table-row-group';
      noScores.style.display = 'none';
      
      // Sort scores by date (newest first)
      scores.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Limit to maximum 15 rows
      const limitedScores = scores.slice(0, 15);
      
      // Add rows for each score
      limitedScores.forEach((item, index) => {
        const row = document.createElement('tr');
        
        // Format the date nicely
        const date = new Date(item.date);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
        
        // Make the first row (current/latest score) bold and highlighted
        const scoreStyle = index === 0 ? 'font-weight: bold; color: #2c3e50; font-size: 16px;' : '';
        const dateStyle = index === 0 ? 'font-weight: bold; color: #2c3e50; font-size: 16px;' : '';
        const rowStyle = index === 0 ? 'background-color: #e8f5e8;' : '';
        
        row.style.cssText = rowStyle;
        row.innerHTML = `
          <td style="${dateStyle}">${formattedDate}</td>
          <td style="${scoreStyle}">${item.score}</td>
        `;
        
        scoreTable.appendChild(row);
      });
    }
    
    // Function to auto-show previous scores popup
    window.showPreviousScoresPopup = function() {
      displayPreviousScores();
      popup.style.display = 'block';
    };
    
    // Add clear scores button functionality
    const clearScoresButton = document.getElementById('clear-scores');
    clearScoresButton.addEventListener('click', function() {
      // Show confirmation dialog
      if (confirm('Are you sure you want to clear all scores? This action cannot be undone.')) {
        // Clear from local storage
        localStorage.removeItem('snakeScores');
        
        // Refresh the display to show no scores
        displayPreviousScores();
      }
    });
    
    // Add restart button functionality
    const restartButton = document.getElementById('restart-game');
    restartButton.addEventListener('click', function() {
      popup.style.display = 'none';
      location.reload(); // Reload the page to restart the game
    });
  });
