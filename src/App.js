import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import { useRef } from "react";

import desktopImageDark from "./assets/bg-desktop-dark.jpg";
import desktopImageLight from "./assets/bg-desktop-light.jpg";
import { useState, useEffect } from "react";
function App() {
  const app = useRef();
  const colors = useSelector((state) => state.theme);
  const [themeColors, setThemeColors] = useState({ ...colors });
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", JSON.stringify(colors));
    }
    setThemeColors(JSON.parse(localStorage.getItem("theme")));
    console.log(JSON.parse(localStorage.getItem("todos")));
  }, [colors]);

  const checkTheme = () => {
    const localColors = JSON.parse(localStorage.getItem("theme"));
    if (themeColors !== localColors) {
      setThemeColors(localColors);
    }
  };
  return (
    <div
      className="App"
      ref={app}
      style={{
        backgroundColor: `${themeColors.veryDarkBlue}`,
        height: `100%`,
        width: "100%",
        resize: "none",
        position: "fixed",
        top: "0",
        left: "0",
      }}
    >
      <div
        style={{
          height: `${window.innerWidth <= 375 ? "30%" : "40%"}`,
          width: "100%",
          backgroundImage: `url("${
            themeColors.theme === "dark" ? desktopImageDark : desktopImageLight
          }")`,
          backgroundPositon: "right",
          position: "fixed",
          top: "0",
          left: "0",
        }}
      ></div>
      <Layout clicked={checkTheme} />
    </div>
  );
}

export default App;
