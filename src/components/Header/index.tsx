import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { SingleValue } from "react-select";

import { getUsersOptions } from "../../helpers/selectOptions";
import State from "../../interfaces/state.interface";
import { filterImages } from "../../redux/slices/filterSlice";
import { setIsOpened } from "../../redux/slices/menuSlice";
import { signOut } from "../../redux/slices/userSlice";
import { Button, Card, CustomSelect, ThemeSwitch } from "../UI";
import { BurgerButton } from "../UI/BurgerButton";
import { OptionParams } from "../UI/CustomSelect/props";
import { HeaderProps } from "./props";
import styles from "./styles.module.scss";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const { isOpened } = useSelector((state: State) => state.burgerMenu);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    isOpened && dispatch(setIsOpened(false));
    dispatch(signOut());
  };

  const handleChangeSelect = (newValue: SingleValue<string | OptionParams>) => {
    dispatch(filterImages((newValue as OptionParams).value));
  };

  const handleMenuOpen = () => {
    dispatch(setIsOpened(true));
  };

  const handleMenuClose = () => {
    dispatch(setIsOpened(false));
  };

  const selectOptions = getUsersOptions();

  const HeaderActions = (
    <>
      <CustomSelect options={selectOptions} onChange={handleChangeSelect} />
      <ThemeSwitch />
      <Button appearance="primary" onClick={handleSignOut}>
        SignOut
      </Button>
    </>
  );

  return (
    <header className={cn(className, styles.header)} {...props}>
      <div>
        <h3>Mini-paint</h3>
      </div>
      <div className={styles.header__actions}>{HeaderActions}</div>
      <BurgerButton
        className={styles.header__burgerButton}
        icon="menu"
        onClick={handleMenuOpen}
      />
      <Card
        className={cn(styles.header__menu, {
          [styles.header__menu_opened]: isOpened,
          [styles.header__menu_closed]: !isOpened,
        })}
      >
        <div className={styles.header__menu_content}>{HeaderActions}</div>
        <BurgerButton
          className={styles.header__menu_closeButton}
          icon="close"
          onClick={handleMenuClose}
        />
      </Card>
    </header>
  );
};
