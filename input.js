export class InputHandler {
  constructor(game) {
    this.keys = [];
    this.bulletKeyCount = 0;
    this.game = game;



    window.addEventListener("keydown", (e) => {
      if (
        (e.key == "ArrowLeft" || e.key == "ArrowRight") &&
        !this.keys.includes(e.key)
      ) {
        this.keys.push(e.key);
      }
      // if (e.key == "Enter") {
      //   this.game.gameStart = true;
      // }
    });

    const touch = (e) => {
      // let board = document.getElementById("canvas1");
      let board = document.querySelector('.black-screen')
      if (e.target == board) {
        console.log("тач экрана", e.target);
        // this.game.gameStart = true;
        window.removeEventListener("touchstart", touch);
        window.addEventListener("touchstart", (e) => {
          if (e.target == board && this.game.player.bullets.length < 3) {
            this.bulletKeyCount++;
          }
        });
      }
    };

    window.addEventListener("touchstart", touch);

    window.addEventListener("keyup", (e) => {
      if (
        (e.key == "ArrowLeft" || e.key == "ArrowRight") &&
        this.keys.includes(e.key)
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
      if (e.key == "ArrowUp" && this.game.player.bullets.length < 3) {
        this.bulletKeyCount++;
      }
    });
  }
}
