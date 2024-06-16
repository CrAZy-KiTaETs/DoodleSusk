import "./style.scss";
import icon from "../../assets/images/coin.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { incrementByAmount } from "../../store/slicer";
import { udpateBalance } from "../../Api/api";
import DotsPreloader from "../../ux/DotsPreloader";
import BalanceWrapper from "../../ux/BalanceWrapper/BalanceWrapper";

const Earn = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.id);
  const userBalance = useSelector((state) => state.balance);
  const [waiting, setWaiting] = useState(false);
  const arrBalance = userBalance.toString().split('')

  const getReward = async (reward) => {
    if (!waiting) {
      let money = userBalance + reward;
      setWaiting(true);
      dispatch(incrementByAmount(reward));
      let updatedUser = {
        id: userId,
        balance: money,
      };
      (await udpateBalance(updatedUser)) && setWaiting(false);
    }
  };

  const items = [
    { name: "Join our teltegram", img: icon, reward: 1000 },
    { name: "connect TON Wallet", img: icon, reward: 100 },
    { name: "xyinya-3", img: icon, reward: 500 },
    { name: "xyinya-4", img: icon, reward: 9999 },
  ];

  return (
    <section className="earn">
      <div className="tasks">
        <h3>task avialable</h3>
        <ul>
          {items.map((x, key) => (
            <li
              key={key}
              onClick={() => getReward(x.reward)}
              style={{ animationDelay: key * 0.1 + "s" }}
            >
              <button>
                <p className="title">{x.name}</p>
                <div className="wrapper">
                  <img src={x.img} alt="" />
                  {waiting ? <DotsPreloader /> : x.reward}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="claimAll">
          CLAIM ALL: {arrBalance.map((x, key) => <span key={key}>{x}</span>)}
      </button>
      <BalanceWrapper top="55%"/>
      <ul>
        {/* {items.map((x, key) => (
          <li
            key={key}
            onClick={() => getReward(x.reward)}
            style={{ animationDelay: key * 0.1 + "s" }}
          >
            <img src={x.img} alt="" />
            <p>{x.name}</p>
            <button>
              <img src={icon} alt="" />
              {waiting ? <DotsPreloader /> : x.reward}
            </button>
          </li>
        ))} */}
      </ul>
    </section>
  );
};

export default Earn;
