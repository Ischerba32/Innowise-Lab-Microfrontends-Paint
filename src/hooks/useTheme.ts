import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UseThemeResult from "../interfaces/hooks/useTheme.interface";
import State from "../interfaces/state.interface";
import { setTheme } from "../redux/slices/themeSlice";

export const useTheme = (): UseThemeResult => {
  const { theme } = useSelector((state: State) => state.theme);
  const dispatch = useDispatch();

  const dispatchTheme = (theme: string) => {
    return dispatch(setTheme(theme));
  };

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  return { theme, dispatchTheme };
};
