export class Background {
    constructor(game) {
        this.game = game
        this.width = this.game.width
        this.height = this.game.height
        this.image = document.querySelector('#cropBg')
        this.x = 0
        this.y = 0
        this.lol = 0
    }

    update(){
        // console.log(this.y, this.height, 'THIIIIS')

        if (this.game.score > 100) {
            // console.log(this.game)
            // this.image = document.querySelector("#android")
        }
        if(this.lol > this.height){
            console.log(this.y, this.height, 'THIIIIS')

            this.lol = 0
            this.y += 10
            this.game.add_platforms(-this.height, -15)
            this.game.add_broken_platforms(-this.height, -15)
            this.game.change_difficulty()

            if(Math.random() < this.game.enemyChance/100){
                this.game.add_enemy()
            }
        } 
        else{
            this.lol += this.game.vy
            this.game.score += Math.trunc(this.game.vy * 0.2)
        }
    }



    draw(context) {
        // context.drawImage(document.querySelector('#bg'), this.x, -this.y, this.width, this.height)
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(document.querySelector('#cropBgTop'), this.x, this.y - this.height, this.width, this.height)
        // gifler('./images/crop-bg.gif').play(function(anim) {
        //     context.clearRect(0, 0, canvas.width, canvas.height);
        //     anim.moveCanvas(context);
        // });
    }
}