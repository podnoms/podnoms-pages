import React from "react";
import { useTheme } from "next-themes";

const ThemeChanger = () => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div>
      The current theme is: {theme}
      <button className="btn" onClick={() => setTheme("lofi")}>
        Light Mode
      </button>
      <button className="btn" onClick={() => setTheme("valentine")}>
        Dark Mode
      </button>
    </div>
  );
};

export default ThemeChanger;
