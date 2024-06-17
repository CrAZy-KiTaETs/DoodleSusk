import "./style.scss";
import fingers from "../../assets/images/fingers.png";
import rocket from "../../assets/images/rocket.png";
import susk from "../../assets/images/susk.png";
import rocketAni from "../../assets/gifs/rocket-ani.gif";
import { useEffect, useState } from "react";
import cn from "classnames";
import { findUser, udpateUser } from "../../Api/api";
import { useDispatch } from "react-redux";
import { updateStateUser } from "../../store/slicer";
import "animate.css";

export function LoadingPage({ userIsReady, hideNav }) {
  const [user, setUser] = useState(false);
  const dispatch = useDispatch();



  return (
    <section className={cn("loading-page")}>
      <p className={cn("text", "animate__animated", {animate__fadeOutUpBig: user})}>Getting High</p>
      <div className={cn("img-wrapper")}>
        <img src={susk} className={cn("img-wrapper__susk")} alt="susk" />
        <img src={rocket} className={cn("img-wrapper__rocket")} alt="susk" />
        <img src={fingers} className={cn("img-wrapper__fingers")} alt="susk" />
      </div>
    </section>

    // old version
    // <div className={cn("loading-page", "animate__fadeInRightBig")}>
    //   <div className={cn("background", { userReady: user })}></div>
    //   <div className={cn("preloader-container", { userReady: user })}>
    //     <h1>Идет загрузка </h1>
    //     <span className="loader"></span>
    //   </div>
    //   <div className="img-wrapper">
    //     <img
    //       src={rocketAni}
    //       alt="rocketAni"
    //       className={cn("rocketAni", { userReady: user })}
    //     />
    //     <img src={susk} alt="fingers" className="susk" />
    //     <img src={fingers} alt="fingers" className="fingers" />
    //     <img
    //       src={rocket}
    //       alt="rocket"
    //       className={cn("rocket", { userReady: user })}
    //     />
    //   </div>
    // </div>
  );
}
