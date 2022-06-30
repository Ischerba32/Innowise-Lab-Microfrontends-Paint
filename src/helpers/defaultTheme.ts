const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = isDarkTheme ? "dark" : "light";

export default localStorage.getItem("app-theme") || defaultTheme;
