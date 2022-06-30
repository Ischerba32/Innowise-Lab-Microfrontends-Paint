import { AnyAction } from "redux";
import { all, put, takeEvery } from "redux-saga/effects";

import { handleSaveImage } from "../../../config/firebase";
import { saveImageFailed, saveImageSuccess } from "../../slices/imagesSlice";

function* saveImageWorker(data: AnyAction) {
  const { payload } = data;
  try {
    yield handleSaveImage(payload);
    yield put(saveImageSuccess());
  } catch (error) {
    yield put(saveImageFailed(error as Error));
  }
}

function* saveImageWatcher() {
  yield takeEvery("images/saveImage", saveImageWorker);
}

export default function* imagesSaga() {
  yield all([saveImageWatcher()]);
}
