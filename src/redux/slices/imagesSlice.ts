import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Image, {
  ImageState,
  SaveImageParams,
} from "../../interfaces/image.interface";

const imagesSlice = createSlice({
  name: "images",
  initialState: {
    isLoading: false,
    images: [],
    error: "",
  },
  reducers: {
    getImages: (state: ImageState) => {
      state.isLoading = true;
    },

    getImagesSuccess: (state: ImageState) => {
      state.isLoading = false;
    },

    setImages: (state: ImageState, action: PayloadAction<Image[]>) => {
      state.images = action.payload;
    },

    saveImage: (state: ImageState, action: PayloadAction<SaveImageParams>) => {
      state.isLoading = true;
    },

    saveImageSuccess: (state: ImageState) => {
      state.isLoading = false;
      state.error = "";
    },

    saveImageFailed: (state: ImageState, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },

    clearError: (state: ImageState) => {
      state.error = "";
    },
  },
});

export const {
  getImages,
  getImagesSuccess,
  saveImage,
  saveImageSuccess,
  setImages,
  saveImageFailed,
  clearError,
} = imagesSlice.actions;

export default imagesSlice.reducer;
