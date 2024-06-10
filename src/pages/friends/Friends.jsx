import "./style.scss";
import avatar from "../../assets/images/susk.png";

const Friends = () => {
  return (
    <section className="friends">
      <div className="ref">
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
      </div>
    </section>
  );
};

export default Friends;
