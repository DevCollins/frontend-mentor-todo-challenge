import { useSelector } from "react-redux";
import Layout from "./components/Layout";

import desktopImageDark from "./assets/bg-desktop-dark.jpg";
import desktopImageLight from "./assets/bg-desktop-light.jpg";
import { useState, useEffect } from "react";
function App() {
  const colors = useSelector((state) => state.theme);
  const [themeColors, setThemeColors] = useState({ ...colors });
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", JSON.stringify(colors));
    }
    setThemeColors(JSON.parse(localStorage.getItem("theme")));
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
      style={{
        backgroundColor: `${themeColors.veryDarkBlue}`,
        minHeight: `${window.innerHeight}`,
        resize: "none",
      }}
    >
      <div
        style={{
          height: "35vh",
          backgroundImage: `url("${
            themeColors.theme === "dark" ? desktopImageDark : desktopImageLight
          }")`,
          backgroundPositon: "right",
          position: "relative",
        }}
      ></div>
      <Layout clicked={checkTheme} />
    </div>
  );
}

export default App;
