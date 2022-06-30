import { all } from "redux-saga/effects";

import imagesSaga from "./imagesSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([userSaga(), imagesSaga()]);
}
