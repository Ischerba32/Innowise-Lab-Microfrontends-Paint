export default interface UseThemeResult {
  theme: string;
  dispatchTheme: (theme: string) => {
    payload: string;
    type: string;
  };
}
