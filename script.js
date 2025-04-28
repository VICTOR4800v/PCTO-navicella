  // Elementi base del gioco
  var spaceship = document.getElementById('spaceship');
  var platform = document.getElementById('platform');
  var message = document.getElementById('message');
  var restartBtn = document.getElementById('restart-btn');
  
  // Variabili di gioco
  var spaceshipX = window.innerWidth / 2;
  var spaceshipY = 50;
  var velocity = 0.1; // Velocità iniziale più bassa
  var acceleration = 0.01; // Accelerazione più lenta
  var speed = 8;  // Velocità laterale
  var isGameOver = false;
  var keys = {};
  
  // Posizione iniziale dell'astronave
  spaceship.style.left = spaceshipX + 'px';
  spaceship.style.top = spaceshipY + 'px';
  
  // Controlli tastiera
  window.onkeydown = function(e) {
      keys[e.key] = true;
  };
  
  window.onkeyup = function(e) {
      keys[e.key] = false;
  };
  
  // Riavvio del gioco
  restartBtn.onclick = function() {
      resetGame();
  };
  
  // Loop principale del gioco
  function gameLoop() {
      if (isGameOver) return;
      
      // Aggiorna la velocità per l'effetto gravità
      velocity += acceleration;
      spaceshipY += velocity;
      
      // Controlla i movimenti laterali
      if ((keys['ArrowLeft'] || keys['a'] || keys['A']) && spaceshipX > 40) {
          spaceshipX -= speed;
      }
      
      if ((keys['ArrowRight'] || keys['d'] || keys['D']) && spaceshipX < window.innerWidth - 40) {
          spaceshipX += speed;
      }
      
      // Aggiorna la posizione dell'astronave
      spaceship.style.left = spaceshipX + 'px';
      spaceship.style.top = spaceshipY + 'px';
      
      // Controlla la collisione con la piattaforma
      var platformRect = platform.getBoundingClientRect();
      var spaceshipRect = spaceship.getBoundingClientRect();
      
      if (spaceshipRect.bottom >= platformRect.top && 
          spaceshipRect.bottom <= platformRect.bottom &&
          spaceshipRect.left + spaceshipRect.width / 2 >= platformRect.left && 
          spaceshipRect.right - spaceshipRect.width / 2 <= platformRect.right && 
          velocity > 0) {
          // Atterraggio riuscito!
          isGameOver = true;
          message.style.display = 'block';
      } else if (spaceshipY > window.innerHeight) {
          // L'astronave è uscita dallo schermo
          resetGame();
      }
      
      // Continua il loop
      if (!isGameOver) {
          requestAnimationFrame(gameLoop);
      }
  }
  
  // Funzione per riavviare il gioco
  function resetGame() {
      spaceshipX = window.innerWidth / 2;
      spaceshipY = 50;
      velocity = 0.1; // Velocità iniziale più bassa
      isGameOver = false;
      message.style.display = 'none';
      spaceship.style.left = spaceshipX + 'px';
      spaceship.style.top = spaceshipY + 'px';
      gameLoop();
  }
  
  // Gestione ridimensionamento finestra
  window.onresize = function() {
      if (!isGameOver) {
          platform.style.left = (window.innerWidth / 2 - 60) + 'px';
          if (spaceshipX > window.innerWidth - 40) {
              spaceshipX = window.innerWidth - 40;
          }
      }
  };
  
  // Avvia il gioco
  resetGame();