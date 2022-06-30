import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import CanvasMenu from "../../components/CanvasMenu";
import { useDraw } from "../../hooks/useDraw";
import { useTheme } from "../../hooks/useTheme";
import State from "../../interfaces/state.interface";
// import { useNavigate } from 'react-router-dom';
import { resetCanvas } from "../../redux/slices/canvasSlice";
import { clearError, saveImage } from "../../redux/slices/imagesSlice";
import { setIsOpened } from "../../redux/slices/menuSlice";
import styles from "./styles.module.scss";

const Canvas = () => {
  const imageId = uuidv4();

  const { uid, email } = useSelector((state: State) => state.user);
  const { tool, lineColor, lineWidth, lineOpacity } = useSelector(
    (state: State) => state.canvas
  );
  const { isLoading, error } = useSelector((state: State) => state.images);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { theme } = useTheme();
  const {
    containerRef,
    canvasRef,
    canvasWidth,
    canvasHeight,
    subCanvasRef,
    clearCanvas,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useDraw({ tool, lineColor, lineWidth, lineOpacity });

  useEffect(() => {
    const handleResetCanvas = () => {
      dispatch(resetCanvas());
      dispatch(setIsOpened(false));
    };
    return () => handleResetCanvas();
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      if (error) {
        toast.error(error);
        dispatch(clearError());
      } else {
        toast.success("Image saved successfully");
      }
    }
  }, [error, dispatch, isLoading]);

  const handleSaveImage = async () => {
    subCanvasRef.current?.toBlob(async (blob: Blob | null) => {
      if (blob) {
        dispatch(saveImage({ blob, imageId, uid, email }));
        // toast.success('Image saved successfully');
        // navigate('/');
      }
    }, "image/webp");
  };

  return (
    <div className={styles.canvas}>
      <CanvasMenu
        lineWidth={lineWidth}
        lineOpacity={lineOpacity}
        handleSaveButton={handleSaveImage}
        handleClearButton={clearCanvas}
      />
      <div ref={containerRef} className={styles.canvas__container}>
        <canvas ref={subCanvasRef} width={canvasWidth} height={canvasHeight} />
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "light" ? "light" : "dark"}
      />
    </div>
  );
};

export default memo(Canvas);
