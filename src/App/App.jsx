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
import { updateStateUser, staticAdd } from "../store/slicer";
import { getUsers, findUser, udpateUser } from "../Api/api";
import { Nav } from "../components/Nav";

export function App() {
  const [user, setUser] = useState(false);
  const [newser, setNewuser] = useState("");
  const [activeBtn, setActiveBtn] = useState("Home");
  const [isNavHide, setIsNavHide] = useState(false);

  const dispatch = useDispatch();

  const changeActiveBtn = (state) => {
    setActiveBtn(state);
  };

  const hideNav = (state) => {
    setIsNavHide(state);
  };

  const userIsReady = () => {
    setUser(true);
  };

  const initUser = async () => {
    const tg = window.Telegram?.WebApp;
    let tgInit = tg.initDataUnsafe.user;
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
      dispatch(updateStateUser(userFromBD));
      setTimeout(() => {
        hideNav(false);
      }, 2000);

      console.log("добавленный пользователь в стейт");
    } else {
      console.log("Подключения нет");
    }
  };

  const initialState = {
    id: 0,
    username: "",
    ref: "",
    wallet: "",
    balance: 0,
    invited: "",
    is_sub: "",
    ref_count: 0,
    twitter: "",
    inf: "",
    inf_sub: "",
    inf_link: "",
  };

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(staticAdd());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="app-container">
      <div className="btn_wrapper">
        {/* <button onClick={() => add()}>ADD</button>
        <button onClick={() => get()}>get</button>
        <button onClick={() => find()}>findId</button>
        <button onClick={() => findRef()}>findRef</button> */}
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
          <Nav isNavHide={isNavHide} changeActiveBtn={changeActiveBtn} />
        </>
      )}
    </div>
  );
}
// style={{width: aciveBackground.width, height: aciveBackground.height, left: aciveBackground.left}}

// const add = async (tg) => {
//   try {
//     let user = await find();
//     if (!user) {
//       let newUser = {
//         id: 714289599,
//         username: "crazy",
//         ref: "https://t.me/ElonSusk_bot?start=73b6b064-ce77-4273-ba59-617fe85646a3",
//         wallet: "",
//         balance: 0,
//         invited: "false",
//         is_sub: "false",
//         ref_count: 0,
//         twitter: "",
//         inf: "false",
//         inf_sub: "true",
//         inf_link: 1111,
//       };
//       let res = await axios.post(
//         "http://localhost:4000/users/add/",
//         newUser,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       return console.log(res, "Пользователь создан");
//     }
//     console.log("Пользователь уже существует");
//   } catch (error) {
//     console.log("ошибка при создании пользователя", error);
//   }
// };
