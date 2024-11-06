const rabbit = document.getElementById("rabbit");
const obstacle = document.getElementById("obstacle");
let score = 0;
let jumping = false;

// Start the game and move the obstacle
document.addEventListener("keydown", function(event) {
  if (event.code === "Space" && !jumping) {
    jump();
  }
});

function jump() {
  jumping = true;
  let jumpHeight = 0;
  let jumpInterval = setInterval(function() {
    if (jumpHeight >= 150) {
      clearInterval(jumpInterval);
      let fallInterval = setInterval(function() {
        if (jumpHeight <= 0) {
          clearInterval(fallInterval);
          jumping = false;
        } else {
          jumpHeight -= 5;
          rabbit.style.bottom = jumpHeight + "px";
        }
      }, 20);
    } else {
      jumpHeight += 5;
      rabbit.style.bottom = jumpHeight + "px";
    }
  }, 20);
}

// Move the obstacle from right to left
let moveObstacle = setInterval(function() {
  let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
  
  // Reset obstacle position once it goes out of frame
  if (obstacleLeft <= 0) {
    obstacleLeft = 600;
    score++; // Increase score each time the obstacle is successfully jumped over
    document.getElementById("score").innerText = "Score: " + score;
  }

  obstacle.style.left = obstacleLeft - 5 + "px";

  // Check for collision
  let rabbitTop = parseInt(window.getComputedStyle(rabbit).getPropertyValue("bottom"));
  
  if (obstacleLeft < 90 && obstacleLeft > 50 && rabbitTop < 50) {
    alert("Game Over! Your score: " + score);
    clearInterval(moveObstacle);
    location.reload(); // Restart the game
  }
}, 20);
