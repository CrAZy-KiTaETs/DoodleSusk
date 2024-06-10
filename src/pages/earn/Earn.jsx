import "./style.scss";
import icon from "../../assets/images/coin.png"

const Earn = () => {
  return (
    <section className="earn">
      <div className="about">
        <h2>Выполняй ежедневные задания и получай классные плюшки</h2>
      </div>
      <ul>
        {[1, 2, 3, 4].map((x, key) => (
          <li key={x} style={{ animationDelay: key * 0.1 + "s" }}>
            <img src={icon} alt="" />
            <p>reward N{x}</p>
            <button>
              <img src={icon} alt="" />
              1000
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Earn;
