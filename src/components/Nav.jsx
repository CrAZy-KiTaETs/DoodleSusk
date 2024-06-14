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
import { getUsers, findUser, udpateUser } from "../Api/api";

export function Nav({isNavHide, changeActiveBtn}) {
  const [activeBtn, setActiveBtn] = useState("Home");

    const [aciveBackground, setActiveBackround] = useState({
        width: "calc(100% / 4 - 3rem)",
        height: "calc(100%)",
        left: "50%",
        transform: "translateX(-50%)",
        id: 1,
      });

  const navBtns = ["Shop", "Daily", "Home", "Friends", "Game"];

  const changeActivebtn = (e, btn, id) => {
    changeActiveBtn(btn)
    setActiveBtn(btn)
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
  useEffect(() => {
    console.log(isNavHide,'wtf') 
  }, [])

  return (
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
  );
}
