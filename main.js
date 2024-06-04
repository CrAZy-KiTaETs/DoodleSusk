// function showFPS() {
// context.fillStyle = "Black";
// context.font = "normal 16pt Arial";
// context.fillText(fps + " fps", 10, 26);
// }

// function gameLoop(TIME) {
//   setTimeout(() => {
//     // Clear screen
// context.clearRect(0, 0, width, height);

// if (show_fps) showFPS();

// fps = 1 / ((performance.now() - LAST_FRAME_TIME) / 1000);
// LAST_FRAME_TIME = TIME /* remember the time of the rendered frame */

// if (game_running) requestAnimationFrame(gameLoop);
//   }, 24);

// }

// gameLoop();

import { Player } from "./player.js";
import { Background } from "./background.js";
import { InputHandler } from "./input.js";
import { Platform } from "./platform.js";
import { Enemy } from "./enemy.js";

window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas1");
  const container = canvas.parentElement;
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 850;

  class Game {
    constructor(width, height, bestScore) {
      this.firstGame = true;
      this.width = width;
      this.height = height;
      this.vy = 0;
      this.gameOver = false;
      this.gameStart = false;
      this.platforms = [];
      this.enemies = [];
      this.level = 0;
      this.score = 0;
      this.bestScore = bestScore;
      this.enemyChance = 0;
      this.enemyMaxChance = 50;
      this.object_vx = 3;
      this.object_max_vx = 6;
      this.platform_gap = 85;
      this.platform_max_gap = 175;
      this.blue_white_platform_chance = 0;
      this.blue_white_platform_max_chance = 85;
      this.add_platforms(0, this.height - 15);
      this.add_broken_platforms(0, this.height - 15);
      this.add_platforms(-this.height, -15);
      this.add_broken_platforms(-this.height, -15);
      this.background = new Background(this);
      this.player = new Player(this);
      this.inputHandler = new InputHandler(this);
    }

    update() {
      // console.log('aa')
      this.background.update();

      this.platforms.forEach((platform) => {
        platform.update();
      });

      this.player.update(this.inputHandler);

      this.enemies.forEach((enemy) => {
        enemy.update();
      });

      this.platforms = this.platforms.filter(
        (platform) => !platform.markedForDeletion
      );
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    }

    draw(context) {
      this.background.draw(context);

      if (!this.gameStart) {
        context.font = "bold 25px Helvetica";
        context.fillStyle = "black";
        context.textAlign = "center";
        // if (this.firstGame) {
        //   context.fillText(`Старт `, this.width * 0.5, this.height * 0.5);
        // } else {
        //   context.fillText(`Рестарт`, this.width * 0.5, this.height * 0.5);
        // }
      } else {
        this.platforms.forEach((platform) => {
          platform.draw(context);
        });

        this.player.draw(context);

        this.enemies.forEach((enemy) => {
          enemy.draw(context);
        });

        context.fillStyle = "black";
        context.font = "20px Arial";
        context.textAlign = "start";
        context.fillText(`Score: ${this.score}`, 20, 40);

        if (this.gameOver) {
          //   context.font = "bold 25px Helvetica";
          //   context.fillStyle = "red";
          //   context.textAlign = "center";
          //   context.fillText(`GAME OVER`, this.width * 0.5, this.height * 0.5);
          helloWindow.style.display = "block";
          itemsContainer.style.display = "block";
          menu.style.display = "block";
          board.style.zIndex = "0";

          if (this.score > this.bestScore) {
            this.bestScore = this.score;
          }
          bestScoreText.textContent = this.bestScore;
          console.log(this, "gameover");
        }
      }
    }

    add_enemy() {
      this.enemies.push(new Enemy(this));
    }

    add_platforms(lowerY, upperY) {
      do {
        let type = "green";
        if (Math.random() < this.blue_white_platform_chance / 100) {
          type = Math.random() < 0.5 ? "blue" : "white";
        }

        this.platforms.unshift(new Platform(this, lowerY, upperY, type));
      } while (this.platforms[0].y >= lowerY);
    }

    add_broken_platforms(lowerY, upperY) {
      let num = Math.floor(Math.random() * (5 - 0 + 1)) + 0;

      for (let i = 0; i < num; i++) {
        this.platforms.push(new Platform(this, lowerY, upperY, "brown"));
      }
    }

    change_difficulty() {
      this.level++;
      if (this.platform_max_gap > this.platform_gap) {
        this.platform_gap += 5;
      }
      if (
        this.blue_white_platform_max_chance > this.blue_white_platform_chance
      ) {
        this.blue_white_platform_chance += 1;
      }
      if (this.level % 8 == 0 && this.object_max_vx > this.object_vx) {
        this.object_vx++;
      }
      if (this.level % 5 == 0 && this.enemyMaxChance > this.enemyChance) {
        this.enemyChance += 5;
      }
    }
  }

  let game;

  game = new Game(canvas.width, canvas.height, 0);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (game.gameStart) game.update();
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
  }

  animate();

  let start = document.querySelector(".start");
  let helloWindow = document.querySelector(".hello-window");
  let itemsContainer = document.querySelector(".items-container");
  let menu = document.querySelector(".menu");
  let bestScoreText = document.querySelector(".bestScore");
  let board = document.getElementById("canvas1");

  start.addEventListener("click", () => {
    const blackScreen = document.querySelector(".black-screen");
    console.log(bestScoreText.textContent, "asdsa");

    blackScreen.style.display = "block";
    blackScreen.style.animationName = "hideWindow";
    setTimeout(() => {
      itemsContainer.style.display = "none";
      menu.style.display = "none";
    }, 200);
    console.log(game, game.bestScore);

    const newGame = new Game(
      canvas.width,
      canvas.height,
      bestScoreText.textContent
    );
    newGame.firstGame = false;
    newGame.gameStart = true;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (newGame.gameStart) newGame.update();
        newGame.draw(ctx);
        if (!newGame.gameOver) {
          requestAnimationFrame(animate);
        }
        
      // lastRender = now;
    }
    setTimeout(() => {
      blackScreen.style.animationName = "none";
        animate();
      board.style.zIndex = "5";
    }, 500);
  });
});
