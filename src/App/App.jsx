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
import { useDispatch, useSelector } from "react-redux";
import { updateStateUser } from "../store/slicer";

export function App() {
  const [user, setUser] = useState(false);
  const [newser, setNewuser] = useState("");
  const [activeBtn, setActiveBtn] = useState("Home");
  const [isNavHide, setIsNavHide] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const URL = "http://localhost:4000/users";

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

  const add = async (tg) => {
    try {
      let user = await find();
      if (!user) {
        let newUser = {
          id: 714289599,
          username: "crazy",
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

  const findUser = async (id) => {
    let res = await axios.get(`${URL}/findById/${id}`);
    console.log(res.data, "Найденый юзер в БД");
    return res.data;
  };

  const findRef = async () => {
    let res = await axios.get(
      "http://localhost:4000/users/findByRef/73b6b064-ce77-4273-ba59-617fe85646a3"
    );
    console.log(res.data, "find");
    return res.data;
  };

  const udpateUser = async (user) => {
    let res = await axios.put(`${URL}/findById/${user.id}`, user, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res.data, "Найденый юзер в БД");
    return res.data;
  };

  const aaaNewU = {
    id: "test",
    username: "test",
    ref: "test",
    wallet: "test",
    balance: "test",
    invited: "test",
    is_sub: "test",
    ref_count: "test",
    twitter: "test",
    inf: "test",
    inf_sub: "test",
    inf_link: "test",
  };

  const initUser = async () => {
    const tg = window.Telegram?.WebApp;
    let tgInit = tg.initDataUnsafe.user;
    let params = tg.initDataUnsafe.start_param;
    params ? console.log(params, "paraaaaaams") : console.log("ПАРАМЕТРОВ НЕТ");
    if (tgInit) {
      console.log(tgInit, "Данные пользователя с TG");
      let userFromBD = await findUser(tgInit.id);
      if (!userFromBD.username) {
        userFromBD.username = tgInit.username
          ? tgInit.username
          : tgInit.first_name;
        console.log(userFromBD, "полсе добавления ника");
        udpateUser(userFromBD);
      }
      setNewuser(userFromBD);
      dispatch(updateStateUser(aaaNewU));

      console.log("добавленный пользователь в стейт");
    } else {
      console.log("Подключения нет");
    }
  };

  useEffect(() => {
    initUser();
  }, []);

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
