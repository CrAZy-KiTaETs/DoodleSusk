import "./style.scss";
import cn from "classnames";
import rocket from "../../assets/images/rocket.png";
import fingers from "../../assets/images/fingers.png";
import susk from "../../assets/images/susk.png";
import BalanceWrapper from "../../ux/BalanceWrapper/BalanceWrapper";

// GAME
import back from "../../Game/images/background.png";
import backTop from "../../Game/images/crop-bg-top.png";
import enemy from "../../Game/images/enemy.png";
import player from "../../Game/images/player.svg";
import bullet from "../../Game/images/bullet.png";
import green_platform from "../../Game/images/green_platform.png";
import blue_platform from "../../Game/images/blue_platform.png";
import brown_platform from "../../Game/images/brown_platform.png";
import white_platform from "../../Game/images/white_platform.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Game as GameLogic } from "../../Game/main.js";
import { udpateBalance } from "../../Api/api";
import { incrementByAmount } from "../../store/slicer";
import { init } from "../../Game/initGyro.js";

// bg top
import bg1 from "../../assets/images/top-bg-1.png";
import bg2 from "../../assets/images/top-bg-2.png";
import bg3 from "../../assets/images/top-bg-3.png";

export function Home({ hideNav }) {
  const canvasRef = useRef(null);
  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);

  const FPS = 60;
  const interval = 1000 / FPS;
  let lastTime = 0;
  let accumulatedTime = 0;
  let canvas;
  let ctx;
  let newGame;

  const [playing, setPlaying] = useState(false);
  const userId = useSelector((state) => state.id);
  const userBalance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  const getScore = (score) => {
    const userMoney = userBalance + score;
    const updatedUser = {
      id: userId,
      balance: userMoney,
    };
    dispatch(incrementByAmount(score));
    udpateBalance(updatedUser);
  };

  const hideBtn = (set) => {
    setPlaying(set);
  };

  const start = (set) => {
    let gamma = init()
    if (!playing) {
      hideBtn(set);
      setTimeout(() => {
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        canvas.width = windowWidth.current;
        canvas.height = windowHeight.current;

        newGame = new GameLogic(canvas.width, canvas.height, userBalance);

        newGame.gameStart = true;
        function animate(timestamp) {
          if (!lastTime) lastTime = timestamp;
          const deltaTime = timestamp - lastTime;
          lastTime = timestamp;
          accumulatedTime += deltaTime;

          while (accumulatedTime >= interval) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (newGame.gameStart) newGame.update(deltaTime, gamma);
            accumulatedTime -= interval;
          }

          newGame.draw(ctx, hideBtn, getScore);

          if (!newGame.gameOver) {
            requestAnimationFrame(animate);
          }
        }
        requestAnimationFrame(animate);
      }, 3000);
    }
  };

  useEffect(() => {
    if (playing) {
      hideNav(true);
    } else {
      hideNav(false);
    }
  }, [hideNav, playing]);

  return (
    <section className="home">
      {/* <div className={cn("bgWrapper", { gameStart: playing })}>
        <div className={cn("bg2", { gameStart: playing })}></div>
        <img src={bg3} className={cn("bg3", { gameStart: playing })} alt="" />
      </div>
      <BalanceWrapper playing={playing} />
      <button
        className={cn("tapToPlay", {
          gameStart: playing,
        })}
        onClick={() => start(true)}
      >
        Tap to PLAY
      </button>
      <div className={cn("img-wrapper")}>
        <img
          src={susk}
          className={cn("img-wrapper__susk", "animate__animated ", {
            animate__fadeOutDownBig: playing,
          })}
          alt="susk"
        />
        <img
          src={rocket}
          className={cn("img-wrapper__rocket", { gameStart: playing })}
          alt="susk"
        />
        <img
          src={fingers}
          className={cn("img-wrapper__fingers", "animate__animated ", {
            animate__fadeOutDownBig: playing,
          })}
          alt="susk"
        />
      </div> */}
      <div className="canvas-wrapper">
        <canvas id="canvas1" ref={canvasRef}></canvas>
        <img src={back} id="cropBg" alt="" />
        <img src={backTop} id="cropBgTop" alt="" />
        <img src={player} id="player" alt="" />
        <img src={bullet} id="bullet" alt="" />
        <img src={enemy} id="enemy" alt="" />
        <img src={green_platform} id="green_platform" alt="" />
        <img src={blue_platform} id="blue_platform" alt="" />
        <img src={brown_platform} id="brown_platform" alt="" />
        <img src={white_platform} id="white_platform" alt="" />
      </div>
      {!playing && (
        <button className="start" onClick={() => start(true)}>
          START
        </button>
      )}

      {/* <div className={cn("background", {})}></div>
      <div className="home__coins-wrapper">
        <img
          src={coin}
          alt="coin"
        />
        <p> {balance} $SUSK</p>
      </div>
      <img src={rocket} className="home__rocket" alt="rocket" /> */}
    </section>
  );
}
