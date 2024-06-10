import "./style.scss";
import icon from "../../assets/images/coin.png";

const Magazine = () => {
  return (
    <section className="magazine">
      <ul>
        {[1,2,3,4].map((x, key) => (
        <li key={x} style={{animationDelay: (key * 0.1) + "s"}}>
          <img src={icon} alt="" />
          <p>Item N{x}</p>
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

export default Magazine;
