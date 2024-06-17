import "./style.scss";
import avatar from "../../assets/images/susk.png";
import coin from "../../assets/images/coin.png";
import { useSelector } from "react-redux";
import { udpateBalance } from "../../Api/api";
import { updateStateUser } from "../../store/slicer";

const Friends = () => {
  const arr = [
    { name: "loxEbaniy", balance: "321" },
    { name: "loxEbaniy", balance: "321" },
    { name: "loxEbaniy", balance: "321" },
    { name: "loxEbaniy", balance: "321" },
    { name: "loxEbaniy", balance: "321" },
  ];

  const coinsToClaim = [1,2,3,4,5,6];
  const userRef = "dsadasdsad"
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(userRef);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  const userId = useSelector(state=> state.id)

  const claim = async() => {
    // const updatedUser = {
    //   id: userId,
    //   balance: 0
    // }
    // udpateBalance(updatedUser)
  }

  return (
    <section className="friends">
      <div className="friends__list">
        <p>Приглашенные друзья</p>
        <ul>
          {arr.map((x, key) => (
            <li
              key={key}
              className="friend"
              style={{ animationDelay: key * 0.1 + "s" }}
            >
              <img src={avatar} alt="" />
              <p className="friend__name">{x.name}</p>
              <div className="wrapper">
                <p className="friend__balance">
                  {x.balance.split("").map((x) => (
                    <span className="coin">{x}</span>
                  ))}
                </p>
                <p className="susk">$SUSK</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button className="claim" onClick={claim}>
        <img src={coin} alt="" />
        claim coins:
        <div className="coins-wrapper">
        {coinsToClaim.map((x, key) => (
          <span className="coin" key={x}>
            {x}
          </span>
        ))}

        </div>
      </button>
      <div className="ref">
        <p className="ref__text">invite friends and get more $SUSK</p>
        <button className="ref__btn" onClick={copy}>copy ref link</button>
      </div>
      {/* <div className="ref">
        <button className="ref__btn">Скопировать реферальную ссылку</button>
        <p>
          За каждого приглашенного получи 1000$SUSK! <br />A так же по 0.5%SUSK
          за каждую заработаную монету в игре
        </p>
      </div>
      <div className="friends__list">
        <p>Приглашенные друзья</p>
        <ul>
          {[1, 2, 3, 4,5,6,7,8,9, 10,11,12,13,14].map((x, key) => (
            <li key={x} style={{ animationDelay: key * 0.1 + "s" }}>
              <img src={avatar} alt="" />
              <p>friend N{x}</p>
            </li>
          ))}
        </ul>
      </div> */}
    </section>
  );
};

export default Friends;
