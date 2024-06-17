import { useEffect, useState } from "react";
import "./style.scss";
import cn from "classnames";
import friendsIcon from "../assets/images/friends.png";
import shopIcon from "../assets/images/shop.png";
import rewardIcon from "../assets/images/reward.png";
import homeIcon from "../assets/images/home.png";

export function Nav({ isNavHide, changeActiveBtn }) {
  const [activeBtn, setActiveBtn] = useState("Home");

  // const [aciveBackground, setActiveBackround] = useState({
  //   width: "calc(100% / 4 - 3rem)",
  //   height: "calc(100%)",
  //   left: "50%",
  //   transform: "translateX(-50%)",
  //   id: 1,
  // });

  const navBtns = [
    { name: "Shop", img: shopIcon },
    { name: "Daily", img: rewardIcon },
    { name: "Friends", img: friendsIcon },
    { name: "Home", img: homeIcon },
  ];

  const changeActivebtn = (e, btn, id) => {
    changeActiveBtn(btn);
    setActiveBtn(btn);
    // let opt = {
    //   width: e.target.clientWidth,
    //   height: e.target.clientHeight,
    //   left: `calc((1rem * ${id}) + ((${id} + 1) * ${e.target.clientWidth}px) - ${e.target.clientWidth}px)`,
    //   id: id + 1,
    //   transform: "none",
    // };
    // setActiveBackround(opt);
  };

  return (
    <nav className={cn("nav", { hide: isNavHide })}>
      <ul className="nav__list">
        {navBtns.map((btn, key) => (
          <li key={key}>
            <div className={cn("wrapper", { active: activeBtn === btn.name })}>
              <button
                className={cn("nav__btn")}
                onClick={(e) => changeActivebtn(e, btn.name, key)}
              >
                <img src={btn.img} alt="" />
              </button>
              <p className="text">{btn.name}</p>
            </div>
          </li>
        ))}
        {/* <li
          className="activeBtnBackround"
          style={{
            width: aciveBackground.width,
            height: aciveBackground.height,
            left: aciveBackground.left,
            transform: aciveBackground.transform,
          }}
        ></li> */}
      </ul>
      <div className="background"></div>
    </nav>
  );
}
