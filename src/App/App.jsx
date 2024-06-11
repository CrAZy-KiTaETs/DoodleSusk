import { useEffect, useState } from "react";
import { LoadingPage } from "../pages/loading/loadingPage";
import "./style.scss";
import { Home } from "../pages/home/home";
import cn from "classnames";
import Earn from "../pages/earn/Earn";
import Friends from "../pages/friends/Friends";
import Game from "../pages/game/Game";
import Magazine from "../pages/magazine/Magazine";
import axios from "axios";

export function App() {
  const [user, setUser] = useState(false);
  const [activeBtn, setActiveBtn] = useState("Home");
  const [isNavHide, setIsNavHide] = useState(false);

  const hideNav = (state) => {
    setIsNavHide(state);
  };

  const [aciveBackground, setActiveBackround] = useState({
    width: "calc(100% / 4 - 3rem)",
    height: "calc(100%)",
    left: "50%",
    transform: "translateX(-50%)",
    id: 1,
  });
  const navBtns = ["Shop", "Daily", "Home", "Friends", "Game"];

  const userIsReady = () => {
    setUser(true);
  };

  const connetctToDB = async () => {
    let res = await axios.get("http://localhost:4000/users/test-db");
    console.log(res);
  };

  const changeActivebtn = (e, btn, id) => {
    setActiveBtn(btn);
    let opt = {
      width: e.target.clientWidth,
      height: e.target.clientHeight,
      left: `calc((1rem * ${id}) + ((${id} + 1) * ${e.target.clientWidth}px) - ${e.target.clientWidth}px)`,
      id: id + 1,
      transform: "none",
    };
    setActiveBackround(opt);
    console.log(aciveBackground);
  };

  // useEffect((e) => {
  //   console.log(isNavHide, 'aaaaaaaaaaaa')
  // }, [isNavHide]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      let init = tg.initData;
      //       let tg = (window as any).Telegram?.WebApp.expand();
      // const urlParams = new URLSearchParams((window as any).Telegram?.WebApp.initData);
      // const user = urlParams.get('user');
      console.log(tg, init, "это тг");
    } else {
      console.log("Подключения нет");
    }
  }, []);
  return (
    <div className="app-container">
      {!user ? (
        <>
          <LoadingPage userIsReady={userIsReady} />
        </>
      ) : (
        <>
          {activeBtn === "Home" && <Home />}
          {activeBtn === "Daily" && <Earn />}
          {activeBtn === "Friends" && <Friends />}
          {activeBtn === "Game" && <Game hideNav={hideNav} />}
          {activeBtn === "Shop" && <Magazine />}

          <nav className={cn("nav", { hide: isNavHide })}>
            <ul className="nav__list">
              {navBtns.map((btn, key) => (
                <li key={key}>
                  <button
                    className={cn("nav__btn", { active: activeBtn === btn })}
                    onClick={(e) => changeActivebtn(e, btn, key)}
                  >
                    {btn}
                  </button>
                </li>
              ))}
              <li
                className="activeBtnBackround"
                style={{
                  width: aciveBackground.width,
                  height: aciveBackground.height,
                  left: aciveBackground.left,
                  transform: aciveBackground.transform,
                }}
              ></li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
// style={{width: aciveBackground.width, height: aciveBackground.height, left: aciveBackground.left}}
