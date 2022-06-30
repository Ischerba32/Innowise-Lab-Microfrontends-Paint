import CanvasState from "./canvas.interface";
import FilterState from "./filter.interface";
import { ImageState } from "./image.interface";
import MenuState from "./menu.interface";
import ThemeState from "./theme.interface";
import UserState from "./user.interface";

export default interface State {
  user: UserState;
  images: ImageState;
  filter: FilterState;
  canvas: CanvasState;
  theme: ThemeState;
  burgerMenu: MenuState;
}
