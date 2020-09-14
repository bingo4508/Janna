import React, { useState } from "react";
import "./App.css";
import kiss1 from "./kiss1.m4a";
import kiss2 from "./kiss2.m4a";
import kiss3 from "./kiss3.m4a";
import kiss4 from "./kiss4.m4a";
import kiss5 from "./kiss5.m4a";
import kiss6 from "./kiss6.m4a";
import kiss7 from "./kiss7.m4a";
import kiss8 from "./kiss8.m4a";

const audios = [kiss1, kiss2, kiss3, kiss4, kiss5, kiss6, kiss7, kiss8];

function App() {
  const [isActive, setActive] = useState(false);
  const handleHeartClick = () => {
    const pick = Math.floor((Math.random() * 100) % audios.length);
    new Audio(audios[pick]).play();
    setActive(true);

    setTimeout(() => {
      setActive(false);
    }, 1000);
  };
  const classNames = ["heart", isActive ? "heart-active" : ""];
  return (
    <div className="App">
      <header className="App-header">
        <div className={classNames.join(" ")} onClick={handleHeartClick}></div>
        <div className="made-for">Made for my love Janna</div>
      </header>
    </div>
  );
}

export default App;
