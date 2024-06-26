import "./style.scss";
import icon from "../../assets/images/coin.png";
import { useDispatch, useSelector } from "react-redux";
import { decrementByAmount } from "../../store/slicer";
import { useState } from "react";
import { udpateBalance } from "../../Api/api";
import DotsPreloader from "../../ux/DotsPreloader";

const Magazine = () => {
  const userId = useSelector((state) => state.id);
  const userBalance = useSelector((state) => state.balance);
  const dispatch = useDispatch();
  const [waiting, setWaiting] = useState(false);

  const arrBalance = userBalance.toString().split("");

  const buyItem = async (price) => {
    if (!waiting) {
      const userMoney = userBalance - price;
      setWaiting(true);
      dispatch(decrementByAmount(price));
      const updatedUser = {
        id: userId,
        balance: userMoney,
      };
      (await udpateBalance(updatedUser)) && setWaiting(false);
    }
  };

  const items = [
    { name: "xyinya-1", img: icon, price: 1000 },
    { name: "xyinya-2", img: icon, price: 100 },
    { name: "xyinya-3", img: icon, price: 500 },
    { name: "xyinya-4", img: icon, price: 9999 },
    { name: "xyinya-4", img: icon, price: 9999 },
    { name: "xyinya-4", img: icon, price: 9999 },
    { name: "xyinya-4", img: icon, price: 9999 },
  ];

  return (
    <section className="magazine">
      <div className="boosters-wrapper">
        <h3>BOOSTERS</h3>
        <ul>
          {items.map((x, key) => (
            <li
              key={key}
              onClick={() => buyItem(x.price)}
              style={{ animationDelay: key * 0.1 + "s" }}
            >
              <button disabled={userBalance - x.price < 0 || waiting}>
                <img src={x.img} alt="" />
                <p className="item-text">Item N{x.name}</p>
                <div className="priceWrapper">
                  <img src={icon} alt="" />
                  <p>{waiting ? <DotsPreloader /> : x.price}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="discription">
        <p>
          RICH YOUR NEW RECORD AND MAYBE U CAN FIND MORE <br />
          COOL BOOSTERS AND WHOEVER KNOW WHAT ELSE?{" "}
        </p>
      </div>
      <div className="balance">
        <div className="img-wrapper">
          <img src={icon} alt="" />
          <p>BALANCE:</p>
          {arrBalance.map((x, key) => (
            <p className="coins" key={key}>
              {x}
            </p>
          ))}
        </div>
      </div>
      <ul className="inventory">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <li className="item" key={i}>
            {i}
          </li>
        ))}
      </ul>
      <div className="working">
      in progress...
      </div>

    </section>
  );
};

export default Magazine;
