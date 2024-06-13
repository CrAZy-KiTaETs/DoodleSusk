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
    let init = tg.initDataUnsafe.user;
    let params = tg.initDataUnsafe.start_param;
    if (init) {
      console.log(tg, init, "это тг");
      add(init);
    } else {
      console.log("Подключения нет");
    }
    // find()
  }, []);

  const add = async (tg) => {
    try {
      let user = await find();
      if (!user) {
        let newUser = {
          id: 714289599,
          username: 'crazy',
          ref: "https://t.me/ElonSusk_bot?start=73b6b064-ce77-4273-ba59-617fe85646a3",
          wallet: "",
          balance: 0,
          invited: "false",
          is_sub: "false",
          ref_count: 0,
          twitter: "",
          inf: "false",
          inf_sub: "true",
          inf_link: 1111,
        };
        let res = await axios.post(
          "http://localhost:4000/users/add/",
          newUser,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        return console.log(res, "Пользователь создан");
      }
      console.log("Пользователь уже существует");

    } catch (error) {
      console.log("ошибка при создании пользователя", error);
    }
  };

  const get = async () => {
    let res = await axios.get("http://localhost:4000/users/");
    console.log(res.data, "uusers");
  };

  const find = async () => {
    let res = await axios.get("http://localhost:4000/users/findById/714289599");
    console.log(res.data, "find");
    return res.data;
  };

  const findRef = async () => {
    let res = await axios.get("http://localhost:4000/users/findByRef/73b6b064-ce77-4273-ba59-617fe85646a3");
    console.log(res.data, "find");
    return res.data;
  };
  return (
    <div className="app-container">
      <div className="btn_wrapper">
        <button onClick={() => add()}>ADD</button>
        <button onClick={() => get()}>get</button>
        <button onClick={() => find()}>findId</button>
        <button onClick={() => findRef()}>findRef</button>
      </div>
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
