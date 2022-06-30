import { MouseEvent, MutableRefObject } from "react";

export enum Tools {
  PEN = "PEN",
  CIRCLE = "CIRCLE",
  RECTANGLE = "RECTANGLE",
  LINE = "LINE",
  STAR = "STAR",
  POLYGON = "POLYGON",
}

export interface UseDrawParams {
  tool: Tools;
  lineColor: string;
  lineWidth: number;
  lineOpacity: number;
}

export interface UseDrawReturnParams {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  canvasWidth: number;
  canvasHeight: number;
  subCanvasRef: MutableRefObject<HTMLCanvasElement | null>;
  clearCanvas: () => void;
  handleMouseDown: (event: MouseEvent<HTMLCanvasElement>) => void;
  handleMouseMove: (event: MouseEvent<HTMLCanvasElement>) => void;
  handleMouseUp: () => void;
}
