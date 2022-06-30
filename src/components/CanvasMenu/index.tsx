import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { SingleValue } from "react-select";

import { getToolsSelectOptions } from "../../helpers/selectOptions";
import { Tools } from "../../interfaces/hooks/useDraw.interface";
import State from "../../interfaces/state.interface";
import {
  setLineColor,
  setLineOpacity,
  setLineWidth,
  setTool,
} from "../../redux/slices/canvasSlice";
import { setIsOpened } from "../../redux/slices/menuSlice";
import { Button, Card, CustomSelect } from "../UI";
import { BurgerButton } from "../UI/BurgerButton";
import { OptionParams } from "../UI/CustomSelect/props";
import CanvasMenuProps from "./props";
import styles from "./styles.module.scss";

const CanvasMenu = ({
  lineWidth,
  lineOpacity,
  handleSaveButton,
  handleClearButton,
}: CanvasMenuProps) => {
  const dispatch = useDispatch();
  const { isOpened } = useSelector((state: State) => state.burgerMenu);
  const selectOptions = getToolsSelectOptions(Tools);

  const handleChangeSelect = (newValue: SingleValue<string | OptionParams>) => {
    dispatch(setTool((newValue as OptionParams).value as Tools));
  };

  const handleMenuOpen = () => {
    dispatch(setIsOpened(true));
  };

  const handleMenuClose = () => {
    dispatch(setIsOpened(false));
  };

  const CanvasMenuDraw = (
    <>
      <div className={styles.canvasMenu__draw_tools}>
        <CustomSelect options={selectOptions} onChange={handleChangeSelect} />
      </div>
      <div className={styles.canvasMenu__draw_color}>
        <label>Color</label>
        <input
          type="color"
          onChange={(e) => {
            dispatch(setLineColor(e.target.value));
          }}
        />
      </div>
      <div className={styles.canvasMenu__draw_width}>
        <label>Brush Width </label>
        <input
          type="range"
          min="1"
          max="100"
          value={lineWidth}
          onChange={(e) => {
            dispatch(setLineWidth(+e.target.value));
          }}
        />
      </div>
      <div className={styles.canvasMenu__draw_opacity}>
        <label>Brush Opacity</label>
        <input
          type="range"
          min="0"
          max="100"
          value={lineOpacity * 100}
          onChange={(e) => {
            dispatch(setLineOpacity(+e.target.value / 100));
          }}
        />
      </div>
      <div className={styles.canvasMenu__draw_actions}>
        <Button appearance="primary" onClick={handleSaveButton}>
          Save
        </Button>
        <Button appearance="ghost" onClick={handleClearButton}>
          Clear
        </Button>
      </div>
    </>
  );

  return (
    <div className={styles.canvasMenu}>
      <div className={styles.canvasMenu__draw}>{CanvasMenuDraw}</div>
      <BurgerButton
        className={styles.canvasMenu__burgerButton}
        icon="menu"
        onClick={handleMenuOpen}
      />
      <Card
        className={cn(styles.canvasMenu__burgerMenu, {
          [styles.canvasMenu__burgerMenu_opened]: isOpened,
          [styles.canvasMenu__burgerMenu_closed]: !isOpened,
        })}
      >
        <div className={styles.canvasMenu__burgerMenu_content}>
          {CanvasMenuDraw}
        </div>
        <BurgerButton
          className={styles.canvasMenu__burgerMenu_closeButton}
          icon="close"
          onClick={handleMenuClose}
        />
      </Card>
    </div>
  );
};

export default CanvasMenu;
