export default interface CanvasMenuProps {
  lineWidth: number;
  lineOpacity: number;
  handleSaveButton?: () => Promise<void>;
  handleClearButton?: () => void;
}
