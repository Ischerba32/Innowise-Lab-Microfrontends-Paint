import cn from "classnames";

import { ButtonIconProps, icons } from "./props";
import styles from "./styles.module.scss";

export const BurgerButton = ({
  icon,
  className,
  ...props
}: ButtonIconProps): JSX.Element => {
  return (
    <button className={cn(styles.button, className)} {...props}>
      <img src={icons[icon]} alt="burger" />
    </button>
  );
};
