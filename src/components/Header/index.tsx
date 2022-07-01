import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { SingleValue } from "react-select";
import { Link } from "react-router-dom";

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
    <header className={cn(className, styles.paintHeader)} {...props}>
      <div>
        <Link to="/">
          <h3>Home</h3>
        </Link>
      </div>
      <div className={styles.paintHeader__actions}>{HeaderActions}</div>
      <BurgerButton
        className={styles.paintHeader__burgerButton}
        icon="menu"
        onClick={handleMenuOpen}
      />
      <Card
        className={cn(styles.paintHeader__menu, {
          [styles.paintHeader__menu_opened]: isOpened,
          [styles.paintHeader__menu_closed]: !isOpened,
        })}
      >
        <div className={styles.paintHeader__menu_content}>{HeaderActions}</div>
        <BurgerButton
          className={styles.paintHeader__menu_closeButton}
          icon="close"
          onClick={handleMenuClose}
        />
      </Card>
    </header>
  );
};
