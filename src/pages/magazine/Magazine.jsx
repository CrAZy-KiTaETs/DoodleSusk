import "./style.scss";
import icon from "../../assets/images/coin.png";
import { useDispatch, useSelector } from "react-redux";
import { decrementByAmount } from "../../store/slicer";
import { useState } from "react";

const Magazine = () => {
  const selecor = useSelector((state) => state);
  const dispatch = useDispatch();

  const buyItem = (price) => {
    const userMoney = selecor.balance;
    if (userMoney - price < 0) {
      return false
    }
    dispatch(decrementByAmount(price))
  };

  const [items, setItems] = useState([
    { name: "xyinya-1", img: icon, price: 1000 },
    { name: "xyinya-2", img: icon, price: 100 },
    { name: "xyinya-3", img: icon, price: 500 },
    { name: "xyinya-4", img: icon, price: 9999 },
  ]);

  return (
    <section className="magazine">
      <ul>
        {items.map((x, key) => (
          <li key={key} onClick={() => buyItem(x.price)} style={{ animationDelay: key * 0.1 + "s" }}>
            <img src={x.img} alt="" />
            <p>Item N{x.name}</p>
            <button
              disabled={selecor.balance - x.price < 0}
            >
              <img src={icon} alt="" />
              {x.price}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Magazine;
