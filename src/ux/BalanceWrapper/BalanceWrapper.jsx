import React from "react";
import cn from "classnames";
import "./style.scss";
import { useSelector } from "react-redux";

export default function BalanceWrapper({top, playing}) {
  const balance = useSelector((state) => state.balance);
  const arrBalance = balance.toString().split('').map(Number);

  
  return (
    <div className={cn("balance-wrapper", "animate__animated ", {animate__fadeOutDownBig: playing})} style={{top: top}}>
      <p className="text">BALANCE</p>
      <span className="coins-wrapper">
        {arrBalance.map((x, key) => (
          <p key={key} className="coins">
            <span>{x}</span>
          </p>
        ))}
      </span>
    </div>
  );
}
