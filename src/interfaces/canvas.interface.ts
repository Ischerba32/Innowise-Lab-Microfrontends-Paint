import { Tools } from "./hooks/useDraw.interface";

export default interface CanvasState {
  tool: Tools;
  lineColor: string;
  lineWidth: number;
  lineOpacity: number;
  canvasWidth: number;
  canvasHeight: number;
  mouseDownX: number;
  mouseDownY: number;
  context: CanvasRenderingContext2D | null;
  subContext: CanvasRenderingContext2D | null;
}
