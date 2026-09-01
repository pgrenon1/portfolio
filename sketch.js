// Add Particle class for explosion effects
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(2, 5));
    this.alpha = 255;
    this.size = random(2, 4);
    this.color = color;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.y += 0.1; // Add gravity
    this.alpha -= 10; // Fade out
    this.color = color(red(this.color), green(this.color), blue(this.color), this.alpha);
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// Add particles array to store explosion particles
const particles = [];

let score = 0;
let targetScore = 10000;
let streetlight;
let lightX; // Position of the light source
let lightY; // Store light Y position globally
let coneTopWidth;    // Width at the top of the trapezoid
let coneBottomWidth; // Width at the bottom of the trapezoid

function preload() {
  streetlight = loadImage('streetlight.png');
}

class Drop {
  constructor() {
    this.reset();
    this.brightness = 10; // Default brightness
  }

  reset() {
    this.x = random(width);
    this.y = random(-200, -100);
    this.speed = random(4, 10);
    this.randomColor = color(random(255), random(255), random(255));
  }

  isInLightCone() {
    let coneHeight = height - lightY;
    
    // Calculate the boundaries of the trapezoid at this Y position
    let progress = (this.y - lightY) / coneHeight;
    let currentWidth = lerp(coneTopWidth, coneBottomWidth, progress);
    let leftBound = lightX - (currentWidth / 2);
    let rightBound = lightX + (currentWidth / 2);
    
    return (this.y > lightY && 
            this.x > leftBound && 
            this.x < rightBound);
  }

  fall() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    let umbrellaRadius = 200;

    if (d < umbrellaRadius) {
      // Create explosion particles
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(this.x, this.y, this.getColor()));
      }
      // Increment score when drop is killed
      score++;
      // Update score display in parent window
      try {
        window.parent.document.getElementById('score').textContent = '_score: ' + score;
      } catch(e) {
        // Silently fail if we can't access parent (e.g., when testing locally)
        console.log('Could not update score in parent window');
      }
      this.reset();
    }

    this.y += this.speed;

    if (this.y > height) {
      this.reset();
    }
  }

  show() {
    let dynamicLength = map(this.speed, 0, 10, 5, 30);
    
    stroke(this.getColor());
    
    line(this.x, this.y, this.x, this.y + dynamicLength);
  }

  getColor() {
    if (this.isInLightCone()) {
      if(score > targetScore) {
        // For random colors, fade them out based on distance to top of streetlight
        let progress = (this.y - lightY) / (height - lightY);
        let fadeAmount = map(progress, 0, 1, 1, 0);
        // Use all color channels and add alpha
        return color(
          red(this.randomColor),
          green(this.randomColor),
          blue(this.randomColor),
          255 * fadeAmount  // Convert fadeAmount to alpha
        );
      } else {
        // For white light, keep full brightness but fade alpha
        let progress = (this.y - lightY) / (height - lightY);
        let alpha = map(progress, 0, 1, 255, 50);
        return color(255, 255, 255, alpha);  // White with fading alpha
      }
    } else {
      return color(40);  // Dark gray, fully opaque
    }
  }
}

const drops = [];
const numberOfDrops = 200;

function calculatePositions() {
  // Resize the streetlight image to maintain proportion
  let targetHeight = height * 0.8;
  let aspectRatio = streetlight.width / streetlight.height;
  streetlight.resize(targetHeight * aspectRatio, targetHeight);
  
  // Calculate streetlight position
  let streetlightX = width - streetlight.width - 50;
  let streetlightY = height - streetlight.height;
  
  // Set light source positions
  lightX = streetlightX + (streetlight.width * 0.15);
  lightY = streetlightY + (streetlight.height * 0.02);
  
  // Calculate cone widths based on streetlight width
  coneTopWidth = streetlight.width * 0.3;     // 10% of streetlight width
  coneBottomWidth = streetlight.width * 0.8;  // 80% of streetlight width
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numberOfDrops; i++) {
    drops[i] = new Drop();
  }
  calculatePositions();
}

function drawLightCone() {
  let coneHeight = height - lightY;
  
  // Draw trapezoid with gradient
  noStroke();
  for (let i = 0; i < coneHeight; i++) {
    let progress = i / coneHeight;
    let currentY = lightY + i;
    let currentWidth = lerp(coneTopWidth, coneBottomWidth, progress);
    
    let alpha = map(progress, 0, 1, 15, 0);
    fill(255, alpha);
    rect(lightX - (currentWidth / 2), currentY, currentWidth, 1);
  }
}

function draw() {
  background(0);
  
  // Draw streetlight
  tint(22, 22, 22);
  image(streetlight, width - streetlight.width - 50, height - streetlight.height);
  noTint();
  
  // Draw the light cone
  
  drawLightCone();
  
  // Update and show particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }

  // Update and show rain drops
  for (let drop of drops) {
    drop.fall();
    drop.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculatePositions();
  
  // Reset all drops to prevent them from getting stuck
  for (let drop of drops) {
    drop.reset();
  }
} 