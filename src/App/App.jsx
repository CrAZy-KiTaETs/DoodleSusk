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
  const [activeBtn, setActiveBtn] = useState("Home");
  const [isNavHide, setIsNavHide] = useState(false);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

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
    // const tg = window.Telegram?.WebApp;
    // let tgInit = tg.initDataUnsafe.user;
    let tgInit = {
      id: 714289599,
      username: "",
      ref: "",
      wallet: "sdfsdf",
      balance: 0,
      invited: "",
      is_sub: "",
      ref_count: 0,
      twitter: "",
      inf: "",
      inf_sub: "",
      inf_link: "",
    };
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
      console.log(userFromBD, "найденый пользователь в бд");
      dispatch(updateStateUser(userFromBD));
      if (userFromBD) {
        userIsReady();
      }
      dispatch(staticAdd());
      console.log("добавленный пользователь в стейт");
    } else {
      console.log("Подключения нет");
    }
  };

  useEffect(() => {
    initUser();
  }, []);

  // useEffect(() => {
  //   console.log('seee', selector.balance)
  // }, [selector])

  useEffect(() => {
    if (user) {
      const intervalId = setInterval(() => {
        dispatch(staticAdd());
        // console.log('selel', selector)
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [user]);

  const [time, setTime] = useState(true);

  function pls() {
    if (time) {
      udpateUser(selector) &&
        console.log(
          "Данные статично отправились в бд с переодичностью в минуту",
          selector
        );
      setTime(!time);
    }
    setTimeout(() => {
      setTime(!time);
    }, 60000);
  }

  // useEffect(() => {
  //   if (user) {
  //     const intervalId = setInterval(() => {
  //       console.log(
  //         "Данные статично отправились в бд с переодичностью в минуту",
  //         selector
  //       );
  //       // if (udpateUser(selector)) {
  //       // }
  //     }, 10000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [user, selector]);

  // useEffect(() => {
  //   if (user) {
  //     const intervalId = setInterval(() => {
  //       udpateUser(selector) &&
  //         console.log(
  //           "Данные статично отправились в бд с переодичностью в минуту",
  //           selector
  //         );
  //     }, 10000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, []);

  return (
    <div className="app-container" onClick={() => pls()}>
      <div className="btn_wrapper">
        {/* <button onClick={() => add()}>ADD</button>
        <button onClick={() => get()}>get</button>
        <button onClick={() => find()}>findId</button>
        <button onClick={() => findRef()}>findRef</button> */}
      </div>
      {!user ? (
        <>
          <LoadingPage userIsReady={userIsReady} hideNav={hideNav} />
        </>
      ) : (
        <>
          {activeBtn === "Home" && <Home hideNav={hideNav} />}
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
