import "./style.scss";
import back from "./scripts/images/background.png";
import backTop from "./scripts/images/crop-bg-top.png";
import enemy from "./scripts/images/enemy.png";
import player from "./scripts/images/player.svg";
import bullet from "./scripts/images/bullet.png";
import green_platform from "./scripts/images/green_platform.png";
import blue_platform from "./scripts/images/blue_platform.png";
import brown_platform from "./scripts/images/brown_platform.png";
import white_platform from "./scripts/images/white_platform.png";
// Game
import { Game as GameLogic } from "./scripts/main.js";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementByAmount } from "../../store/slicer.js";
import { udpateBalance } from "../../Api/api.js";



const Game = ({ hideNav }) => {
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
    hideBtn(set);

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
        if (newGame.gameStart) newGame.update(deltaTime);
        accumulatedTime -= interval;
      }

      newGame.draw(ctx, hideBtn, getScore);

      if (!newGame.gameOver) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (playing) {
      hideNav(true);
    } else {
      hideNav(false);
    }
  }, [hideNav, playing]);

  return (
    <section className="game">
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
      {/* {!playing && (
        <button className="start" onClick={() => start(true)}>
          START
        </button>
      )} */}
    </section>
  );
};

export default Game;
