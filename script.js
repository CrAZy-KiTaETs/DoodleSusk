let board;
let boardWidth = 360;
let boardHeight = 576;
let context;

// doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth / 2 - doodlerWidth / 2;
let doodlerY = (boardHeight * 7) / 8 - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

// physics
let velocityX = 0;
let velocityY = 0;
let jumpHeight = -8;
let gravity = 0.3;

// platforms
let platformArr = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;

let doodler = {
  img: null,
  x: doodlerX,
  y: doodlerY,
  width: doodlerWidth,
  height: doodlerHeight,
};

document.addEventListener("DOMContentLoaded", () => {
  // запуск гироскопа
  function handleOrientation(event) {
    document.getElementById("alpha").textContent = event.alpha
      ? event.alpha.toFixed(2)
      : "N/A";
    document.getElementById("beta").textContent = event.beta
      ? event.beta.toFixed(2)
      : "N/A";
    document.getElementById("gamma").textContent = event.gamma
      ? event.gamma.toFixed(2)
      : "N/A";
  }

  function init() {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          } else {
            alert("Permission to access device orientation was denied.");
          }
        })
        .catch((error) => {
          console.error(
            "Error requesting permission for device orientation:",
            error
          );
          alert("Error requesting permission for device orientation.");
        });
    } else if (window.DeviceOrientationEvent) {
      // For browsers that do not require permission
      window.addEventListener("deviceorientation", handleOrientation);
    } else {
      alert("Device Orientation API not supported.");
    }
  }
  init();

  board = document.querySelector(".board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  // Load images
  doodlerRightImg = new Image();
  doodlerRightImg.onload = function () {
    doodler.img = doodlerRightImg;
    context.drawImage(
      doodler.img,
      doodler.x,
      doodler.y,
      doodlerWidth,
      doodlerHeight
    );
  };
  doodlerRightImg.src = "./images/doodler-right.png";

  doodlerRightImg.onerror = function () {
    console.error("Error loading doodler-right.png");
  };

  doodlerLeftImg = new Image();
  doodlerLeftImg.src = "./images/doodler-left.png";

  doodlerLeftImg.onerror = function () {
    console.error("Error loading doodler-left.png");
  };

  platformImg = new Image();
  platformImg.src = "./images/platform.png";
  platformImg.onerror = function () {
    console.error("Error loading platform.png");
  };

  velocityY = jumpHeight;
  placePlatforms();

  requestAnimationFrame(update);

  document.addEventListener("keydown", moveDoodler);
  document.addEventListener("keyup", stopDoodler);
});

const update = () => {
  if (!gameOver()) {
    requestAnimationFrame(gameOver);
  } else {
    requestAnimationFrame(update);
  }

  context.clearRect(0, 0, board.width, board.height);

  // Update doodler position
  doodler.x += velocityX;
  if (doodler.x > boardWidth) {
    doodler.x = 0 - doodlerWidth;
  } else if (doodler.x + doodlerWidth < 0) {
    doodler.x = boardWidth;
  }

  velocityY += gravity;
  doodler.y += velocityY;

  if (doodler.img) {
    context.drawImage(
      doodler.img,
      doodler.x,
      doodler.y,
      doodlerWidth,
      doodlerHeight
    );
  }

  // Update platforms
  for (let i = 0; i < platformArr.length; i++) {
    let platform = platformArr[i];
    if (velocityY < 0 && doodler.y < boardHeight / 2) {
      platform.y -= jumpHeight;
    }
    if (detectCollision(doodler, platform)) {
      velocityY = jumpHeight;
    }
    if (platform.img) {
      context.drawImage(
        platform.img,
        platform.x,
        platform.y,
        platform.width,
        platform.height
      );
    }
  }

  // Remove platforms that are out of view and add new ones
  while (platformArr.length > 0 && platformArr[0].y >= boardHeight) {
    platformArr.shift();
    newPlatforms();
  }
};

const moveDoodler = (e) => {
  if (e.code == "ArrowRight" || e.code == "KeyD") {
    velocityX = 4;
    doodler.img = doodlerRightImg;
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    velocityX = -4;
    doodler.img = doodlerLeftImg;
  }
};

const stopDoodler = (e) => {
  velocityX = 0;
};

const placePlatforms = () => {
  platformArr = [];
  // Start platform
  let platform = {
    img: platformImg,
    x: boardWidth / 2,
    y: boardHeight - 50,
    width: platformWidth,
    height: platformHeight,
  };
  platformArr.push(platform);

  for (let i = 0; i < 6; i++) {
    let randomX = Math.floor((Math.random() * boardWidth * 3) / 4);
    let newPlatform = {
      img: platformImg,
      x: randomX,
      y: boardHeight - 75 * i - 150,
      width: platformWidth,
      height: platformHeight,
    };
    platformArr.push(newPlatform);
  }
};

const newPlatforms = () => {
  let randomX = Math.floor((Math.random() * boardWidth * 3) / 4);
  let newPlatform = {
    img: platformImg,
    x: randomX,
    y: -platformHeight,
    width: platformWidth,
    height: platformHeight,
  };
  platformArr.push(newPlatform);
};

const detectCollision = (a, b) => {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
};

const gameOver = () => {
  if (doodler.y > boardHeight) {
    console.log("game over");
    return false;
  } else {
    return true;
  }
};
