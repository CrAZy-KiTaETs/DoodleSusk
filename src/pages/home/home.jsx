import { useEffect } from "react";
import "./style.scss";
import cn from "classnames";
import rocket from "../../assets/images/rocket.png";
import coin from "../../assets/images/coin.png";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../store/slicer";

export function Home() {

  // const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    console.log(state,) 
  }, [])

  

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     dispatch(increment())
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <section className="home">
      <div className={cn("background", {})}></div>
      <div className="home__coins-wrapper">
        <img
          src={coin}
          alt="coin"
          onClick={() => (console.log(state))}
        />
        {/* <p> {state.counter} $SUSK</p> */}
      </div>
      <img src={rocket} className="home__rocket" alt="rocket" />
    </section>
  );
}
