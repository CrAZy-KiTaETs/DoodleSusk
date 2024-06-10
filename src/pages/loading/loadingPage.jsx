import "./style.scss";
import fingers from "../../assets/images/fingers.png";
import rocket from "../../assets/images/rocket.png";
import susk from "../../assets/images/susk.png";
import rocketAni from "../../assets/gifs/rocket-ani.gif";
import { useState } from "react";
import cn from "classnames"

export function LoadingPage({userIsReady}) {
  const [user, setUser] = useState(false)
  setTimeout(() => {
    setUser(true)
    setTimeout(() => {
      userIsReady()
    }, 4000);
  }, 5000);

  return (
    <div className="loading-page">
      <div className={cn("background",{ userReady: user})}>

      </div>
      <div className={cn("preloader-container",{ userReady: user})} >
        <h1>Идет загрузка </h1>
      <span className="loader"></span>
      </div>
      <div className="img-wrapper">
        <img src={rocketAni} alt="rocketAni" className={cn("rocketAni",{ userReady: user})}  />
        <img src={susk} alt="fingers" className="susk" />
        <img src={fingers} alt="fingers" className="fingers" />
        <img src={rocket} alt="rocket" className={cn("rocket",{ userReady: user})} />
      </div>
    </div>
  );
}
