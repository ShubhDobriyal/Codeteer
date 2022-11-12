import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import SiteRoutes from "./config/routes";

import ThemeContext from "./store/theme-context";

const App = () => {
  const themeCtx = useContext(ThemeContext);

  const onThemeToggle = () => {
    themeCtx.themeToggle();
  };

  let themeToggler = themeCtx.isDark ? (
    <SunIcon className="h-7 w-7 text-yellow-500 " />
  ) : (
    <MoonIcon className="h-7 w-7 text-gray-200 " />
  );

  return (
    <div className={`${themeCtx.isDark ? "dark" : ""} h-full`}>
      <div className="bg-white dark:bg-slate-800 h-full">
        <SiteRoutes />
        <button
          onClick={onThemeToggle}
          className=" fixed bottom-4 right-4 border-slate-700 bg-slate-600 rounded-full flex items-center justify-center p-3 border"
        >
          {themeToggler}
        </button>
      </div>
    </div>
  );
};

export default App;
