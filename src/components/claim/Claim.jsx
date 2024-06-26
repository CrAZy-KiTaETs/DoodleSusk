import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { udpateBalance, udpateUser } from "../../Api/api";
import cn from "classnames";
import { incrementByAmount } from "../../store/slicer";

export default function Claim() {
  const [claimMoney, setClaimMoney] = useState(0);
  const [show, setShow] = useState(true);

  const currentDay = dayjs();
  const userLastSession = useSelector((state) => state.last_session);
  const userNewSession = useSelector((state) => state.new_session);
  const userId = useSelector((state) => state.id);
  const user = useSelector((state) => state);
  const userBalance = useSelector((state) => state.balance);

  const dispatch = useDispatch()

  //   const userLastSession = "2024-06-17 10:49:25";

  //   const userNewSession = "2024-06-17 13:49:25";

  const calculateTimeDifferenceInSeconds = (start, end) => {
    if (userLastSession && userNewSession) {
      const startTime = dayjs(start, "YYYY-MM-DD HH:mm");
      const endTime = dayjs(end, "YYYY-MM-DD HH:mm");

      // Разница в секундах между двумя датами
      const differenceInSeconds = endTime.diff(startTime, "second");
      const differenceInHours = differenceInSeconds / 3600;

      return Math.floor(differenceInHours * 1000);
    }
  };

  useEffect(() => {
    // const differenceInSeconds = calculateTimeDifferenceInSeconds(
    //   userLastSession,
    //   userNewSession
    // );
    // const differenceInSeconds = currentDay.diff(startTime, "second");

    // Переводим разницу во времени в часы
    // const differenceInHours = differenceInSeconds / 3600;

    // Количество очков (1000 очков в час)
    const points = calculateTimeDifferenceInSeconds(
      userLastSession,
      currentDay
    );
    console.log(typeof points, points, 'это поинты в клейме')
    console.log(points, "aaaaaa");
    if (points >= 3000) {
      setClaimMoney(3000);
    } else {
      setClaimMoney(points);
    }
  }, []);

  const arrMoney = claimMoney.toString().split("");

  const claim = () => {
    let newUser = {...user};
    newUser.new_session = currentDay.add(3, 'hour').format("YYYY-MM-DD HH:mm:ss")
    newUser.balance += claimMoney 
    udpateUser(newUser)
    dispatch(incrementByAmount(claimMoney))
    // udpateBalance(newUser);
    setShow(false);
    console.log(show, "saasd");
  };

  return (
    <div
      className={cn("claim-component", "animate__animated", {
        animate__slideInUp: show,
        animate__slideOutDown: !show,
      })}
    >
      <div className="container">
        <button onClick={claim}>
          <p>claim</p>
          <div className="wrapper">
            {arrMoney.map((x, key) => (
              <span className="coin" key={key}>
                {x}
              </span>
            ))}
          </div>
        </button>
      </div>
    </div>
    //   <div className="back">asda</div>
  );
}
