import { createSelector } from "@reduxjs/toolkit";

import State from "../interfaces/state.interface";

const selectAllImages = (state: State) => state.images.images;
const selectActiveFilter = (state: State) => state.filter.user;

export const selectImagesByFilter = createSelector(
  [selectAllImages, selectActiveFilter],
  (allImages, activeFilter) => {
    if (activeFilter === "all") return allImages;

    return allImages.filter((image) => image.userId === activeFilter);
  }
);
