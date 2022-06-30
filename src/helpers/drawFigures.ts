import { MouseEvent } from "react";

export const drawPen = (
  context: CanvasRenderingContext2D,
  event: MouseEvent<HTMLCanvasElement>
) => {
  context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
  context.stroke();
};

export const drawRectangle = (
  context: CanvasRenderingContext2D,
  mouseDownX: number,
  mouseDownY: number,
  width: number,
  height: number
) => {
  context.strokeRect(mouseDownX, mouseDownY, width, height);
  context.stroke();
};

export const drawCircle = (
  context: CanvasRenderingContext2D,
  event: MouseEvent<HTMLCanvasElement>,
  mouseDownX: number,
  mouseDownY: number
) => {
  context.beginPath();
  context.arc(
    mouseDownX,
    mouseDownY,
    Math.sqrt(
      (event.nativeEvent.offsetX - mouseDownX) ** 2 +
        (event.nativeEvent.offsetY - mouseDownY) ** 2
    ),
    0,
    Math.PI * 2,
    false
  );
  context.stroke();
};

export const drawLine = (
  context: CanvasRenderingContext2D,
  event: MouseEvent<HTMLCanvasElement>,
  mouseDownX: number,
  mouseDownY: number
) => {
  context.beginPath();
  context.moveTo(mouseDownX, mouseDownY);
  context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
  context.stroke();
};

export const drawStar = (
  context: CanvasRenderingContext2D,
  event: MouseEvent<HTMLCanvasElement>,
  mouseDownX: number,
  mouseDownY: number
) => {
  context.save();
  context.beginPath();
  context.translate(mouseDownX, mouseDownY);
  context.moveTo(
    0,
    0 -
      Math.sqrt(
        (event.nativeEvent.offsetX - mouseDownX) ** 2 +
          (event.nativeEvent.offsetY - mouseDownY) ** 2
      )
  );
  for (let i = 0; i < 5; i++) {
    context.rotate(Math.PI / 5);
    context.lineTo(
      0,
      0 -
        Math.sqrt(
          (event.nativeEvent.offsetX - mouseDownX) ** 2 +
            (event.nativeEvent.offsetY - mouseDownY) ** 2
        ) *
          2
      // inset
    );
    context.rotate(Math.PI / 5);
    context.lineTo(
      0,
      0 -
        Math.sqrt(
          (event.nativeEvent.offsetX - mouseDownX) ** 2 +
            (event.nativeEvent.offsetY - mouseDownY) ** 2
        )
    );
  }
  context.closePath();
  context.stroke();
  context.restore();
};

export const drawPolygon = (
  context: CanvasRenderingContext2D,
  event: MouseEvent<HTMLCanvasElement>,
  mouseDownX: number,
  mouseDownY: number
) => {
  const radius = Math.sqrt(
    (event.nativeEvent.offsetX - mouseDownX) ** 2 +
      (event.nativeEvent.offsetY - mouseDownY) ** 2
  );
  const a = (Math.PI * 2) / 6;

  context.save();
  context.beginPath();
  context.translate(mouseDownX, mouseDownY);
  context.moveTo(radius, 0);

  for (let i = 1; i < 6; i++) {
    context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
  }

  context.closePath();
  context.stroke();
  context.restore();
};
