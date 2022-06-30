import { AnyAction } from "redux";
import { all, put, takeEvery } from "redux-saga/effects";

import {
  handleSignIn,
  handleSignOut,
  handleSignUp,
  saveUserToDB,
} from "../../../config/firebase";
import {
  authError,
  signInSuccess,
  signOutSuccess,
  signUpSuccess,
} from "../../slices/userSlice";

function* signInWorker(data: AnyAction) {
  const { payload } = data;

  try {
    const { user } = yield handleSignIn(payload);
    if (user.uid && user?.email) {
      yield put(signInSuccess({ uid: user.uid, email: user?.email }));
    }
  } catch (error) {
    yield put(authError(error as Error));
  }
}

function* signUpWorker(data: AnyAction) {
  const { payload } = data;

  try {
    const { user } = yield handleSignUp(payload);
    if (user.uid && user?.email) {
      yield saveUserToDB(user.uid, user.email);
      yield put(signUpSuccess({ uid: user.uid, email: user?.email }));
    }
  } catch (error) {
    yield put(authError(error as Error));
  }
}

function* signOutWorker() {
  try {
    yield handleSignOut();
    yield put(signOutSuccess());
  } catch (error) {
    put(authError(error as Error));
  }
}

function* signInWatcher() {
  yield takeEvery("user/signIn", signInWorker);
}

function* signUpWatcher() {
  yield takeEvery("user/signUp", signUpWorker);
}

function* signOutWatcher() {
  yield takeEvery("user/signOut", signOutWorker);
}

export default function* userSaga() {
  yield all([signOutWatcher(), signInWatcher(), signUpWatcher()]);
}
