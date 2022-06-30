import cn from "classnames";

import { ICardProps } from "./props";
import styles from "./styles.module.scss";

export const Card = ({
  children,
  color = "white",
  className,
  ...props
}: ICardProps): JSX.Element => {
  return (
    <div
      className={cn(styles.card, className, {
        [styles.card_blue]: color == "blue",
      })}
      {...props}
    >
      {children}
    </div>
  );
};
