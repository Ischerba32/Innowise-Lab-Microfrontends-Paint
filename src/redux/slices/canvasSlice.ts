import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import CanvasState from "../../interfaces/canvas.interface";
import { Tools } from "../../interfaces/hooks/useDraw.interface";

const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    tool: Tools.PEN,
    lineWidth: 10,
    lineColor: "black",
    lineOpacity: 1,
    canvasWidth: 0,
    canvasHeight: 0,
    mouseDownX: 0,
    mouseDownY: 0,
    context: null,
    subContext: null,
  },
  reducers: {
    setTool: (state: CanvasState, action: PayloadAction<Tools>) => {
      state.tool = action.payload;
    },

    setLineColor: (state: CanvasState, action: PayloadAction<string>) => {
      state.lineColor = action.payload;
    },

    setLineWidth: (state: CanvasState, action: PayloadAction<number>) => {
      state.lineWidth = action.payload;
    },

    setLineOpacity: (state: CanvasState, action: PayloadAction<number>) => {
      state.lineOpacity = action.payload;
    },

    resetCanvas: (state: CanvasState) => {
      state.tool = Tools.PEN;
      state.lineWidth = 10;
      state.lineColor = "black";
      state.lineOpacity = 1;
    },

    setCanvasWidth: (state: CanvasState, action: PayloadAction<number>) => {
      state.canvasWidth = action.payload;
    },

    setCanvasHeight: (state: CanvasState, action: PayloadAction<number>) => {
      state.canvasHeight = action.payload;
    },

    setMouseDownX: (state: CanvasState, action: PayloadAction<number>) => {
      state.mouseDownX = action.payload;
    },

    setMouseDownY: (state: CanvasState, action: PayloadAction<number>) => {
      state.mouseDownY = action.payload;
    },

    setContext: (
      state: CanvasState,
      action: PayloadAction<CanvasRenderingContext2D | null>
    ) => {
      state.context = action.payload;
    },

    setSubContext: (
      state: CanvasState,
      action: PayloadAction<CanvasRenderingContext2D | null>
    ) => {
      state.subContext = action.payload;
    },
  },
});

export const {
  setTool,
  setLineColor,
  setLineOpacity,
  setLineWidth,
  resetCanvas,
  setCanvasWidth,
  setCanvasHeight,
  setMouseDownX,
  setMouseDownY,
  setContext,
  setSubContext,
} = canvasSlice.actions;

export default canvasSlice.reducer;
