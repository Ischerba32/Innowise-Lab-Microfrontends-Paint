import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import menu from "./burgerMenu.svg";
import close from "./close.svg";

export const icons = {
  close,
  menu,
};

type IconName = keyof typeof icons;

export interface ButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconName;
}
