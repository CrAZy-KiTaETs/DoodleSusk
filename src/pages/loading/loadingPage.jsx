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
  const [newser, setNewuser] = useState("");
  const dispatch = useDispatch();

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
      console.log(userFromBD, 'найденый пользователь в бд')
      dispatch(updateStateUser(userFromBD));
      if (userFromBD) {
        setTimeout(() => {
          hideNav(false);
        }, 2000);
        setTimeout(() => {
          setUser(true);
          setTimeout(() => {
            userIsReady();
          }, 4000);
        }, 5000);
      }

      console.log("добавленный пользователь в стейт");
    } else {
      console.log("Подключения нет");
    }
  };

  useEffect(() => {
    initUser();
    // setTimeout(() => {
    //   hideNav(false);
    // }, 2000);
    // setTimeout(() => {
    //   setUser(true);
    //   setTimeout(() => {
    //     userIsReady();
    //   }, 4000);
    // }, 5000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
        // userIsReady();

      setUser(true)
    }, 2000);
    setTimeout(() => {
      userIsReady();
  }, 3000);
  }, [])

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
