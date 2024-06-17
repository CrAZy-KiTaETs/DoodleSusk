import "./style.scss";
import icon from "../../assets/images/coin.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { incrementByAmount } from "../../store/slicer";
import { udpateBalance, udpateWallet } from "../../Api/api";
import DotsPreloader from "../../ux/DotsPreloader";
import BalanceWrapper from "../../ux/BalanceWrapper/BalanceWrapper";
import dayjs from "dayjs";

const Earn = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.id);
  const userBalance = useSelector((state) => state.balance);
  const userWallet = useSelector((state) => state.wallet);
  const userSession = useSelector((state) => state.last_session);

  const [walletInput, setWalletInput] = useState(userWallet);
  const [showPopup, setShowPopup] = useState(false);

  const [waiting, setWaiting] = useState(false);
  const [rewardBalance, setRewardBalance] = useState(0);

  const getReward = async (reward) => {
    if (!waiting) {
      let money = Number(userBalance) + reward;
      setWaiting(true);
      dispatch(incrementByAmount(reward));
      let updatedUser = {
        id: userId,
        balance: money,
      };

      (await udpateBalance(updatedUser)) && setWaiting(false);
    }
  };

  const tonHandler = () => {
    !waiting && setShowPopup(true);
    setWalletInput(userWallet);
  };

  const changeTON = async (e) => {
    e.preventDefault();
    if (isValidMessage(walletInput)) {
      setWaiting(true);
      let newWallet = {
        id: userId,
        wallet: walletInput,
      };
      await udpateWallet(newWallet);
      setWaiting(false);
      setShowPopup(false);
      setWalletInput("");
    }
  };

  const closePopup = () => {
    !waiting && setShowPopup(false);
    setWalletInput("");
  };

  const isValidMessage = (message) => {
    return !/^\s*$/.test(message);
  };

  const currentDay = dayjs();

  useEffect(() => {
    if (isValidMessage(userWallet)) {
      setRewardBalance((prev) => (prev += 1000));
    }
    if (userSession) {
      let differenceInSeconds = currentDay.diff(userSession, "second");
      // Переводим разницу во времени в часы
      const differenceInHours = differenceInSeconds / 3600;
      // Количество очков (1000 очков в час)
      const points = Math.floor(differenceInHours * 1000);
      if (points >= 3000) {
        setRewardBalance((prev) => (prev += 3000));
      } else {
        setRewardBalance((prev) => (prev += differenceInSeconds));
      }
      console.log(points);
    }
    // let lastSession = currentDay.format('YYYY-MM-DD HH:mm:ss')
  }, []);

  const missions = [
    { name: "Набрать 1000 очков", img: icon, reward: 500 },
    { name: "Сломать 10 платформ", img: icon, reward: 500 },
    { name: "Выжить 2мин за одну игру", img: icon, reward: 1000 },
    { name: "Выжить в общем 10мин", img: icon, reward: 5000 },
    { name: "Собрать 5монет/Убить 5 противников", img: icon, reward: 1000 },
    { name: "Набрать 5000 очков", img: icon, reward: 2000 },
    { name: "Набрать 10000 очков", img: icon, reward: 5000 },
  ];

  const claim = () => {
    
  }

  return (
    <section className="earn">
      <div className="tasks">
        <h3>task avialable</h3>
        <ul>
          <li onClick={tonHandler} style={{ animationDelay: 0 * 0.1 + "s" }}>
            <button>
              <p className="title">connect TON Wallet</p>
              <div className="wrapper">
                <img src={icon} alt="" />
                {waiting ? <DotsPreloader /> : 1000}
              </div>
            </button>
          </li>
          <a href="https://animate.style/" target="_blanc">
            <li style={{ animationDelay: 0 * 0.1 + "s" }}>
              <button>
                <p className="title">Перейти в наш Тг канал</p>
                <div className="wrapper">
                  <img src={icon} alt="" />
                  {waiting ? <DotsPreloader /> : 1000}
                </div>
              </button>
            </li>
          </a>
          {missions.map((x, key) => (
            <li
              key={key}
              onClick={() => getReward(x.reward)}
              style={{ animationDelay: (key + 1) * 0.1 + "s" }}
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
      <button className="claimAll" onClick={claim}>
        CLAIM ALL:{" "}
        {rewardBalance
          .toString()
          .split("")
          .map((x, key) => (
            <span key={key}>{x}</span>
          ))}
      </button>
      <BalanceWrapper top="55%" />
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
      {showPopup && (
        <div className="popup">
          <form className="popup__form" onSubmit={(e) => changeTON(e)}>
            <input
              type="text"
              onChange={(e) => setWalletInput(e.target.value)}
              value={walletInput}
              placeholder="Your TON link"
              required
              className="popup__text"
            />
            <input type="submit" className="popup__submit" value={"ok"} />
          </form>
          <div className="popup__background" onClick={closePopup}></div>
        </div>
      )}
      <div className="working">in developing</div>
    </section>
  );
};

export default Earn;
