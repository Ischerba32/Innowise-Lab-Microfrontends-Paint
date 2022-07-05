import { all, put, takeEvery } from 'redux-saga/effects';

import { handleSignOut } from '../../../config/firebase';
import { authError, signOutSuccess } from '../../slices/userSlice';

function* signOutWorker() {
	try {
		yield handleSignOut();
		yield put(signOutSuccess());
	} catch (error) {
		put(authError(error as Error));
	}
}

function* signOutWatcher() {
	yield takeEvery('user/signOut', signOutWorker);
}

export default function* userSaga() {
	yield all([signOutWatcher()]);
}
