import "./style.scss";
import icon from "../../assets/images/coin.png"
import { useDispatch } from "react-redux";
import { useState } from "react";
import { incrementByAmount } from "../../store/slicer";

const Earn = () => {
  const dispatch = useDispatch()

  const getReward = (reward) => {
    dispatch(incrementByAmount(reward))
  };

  const [items, setItems] = useState([
    { name: "xyinya-1", img: icon, reward: 1000 },
    { name: "xyinya-2", img: icon, reward: 100 },
    { name: "xyinya-3", img: icon, reward: 500 },
    { name: "xyinya-4", img: icon, reward: 9999 },
  ]);
  return (
    <section className="earn">
      <div className="about">
        <h2>Выполняй ежедневные задания и получай классные плюшки</h2>
      </div>
      <ul>
        {items.map((x, key) => (
          <li key={key} onClick={() => getReward(x.reward)} style={{ animationDelay: key * 0.1 + "s" }}>
            <img src={x.img} alt="" />
            <p>{x.name}</p>
            <button>
              <img src={icon} alt="" />
              {x.reward}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Earn;
