import * as firebase from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import {
	getDownloadURL,
	getStorage,
	ref as refStorage,
	uploadBytes,
} from 'firebase/storage';
import moment from 'moment';

import AuthFormParams from '../interfaces/authForm.interface';
import { SaveImageParams } from '../interfaces/image.interface';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);

export const auth = getAuth(app);
export const database = getDatabase(app);

export const handleSignIn = async ({ email, password }: AuthFormParams) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const handleSignUp = async ({ email, password }: AuthFormParams) => {
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const handleSignOut = async () => {
	return await signOut(auth);
};

const saveImageToDB = async (
	url: string,
	imageId: string,
	uid: string,
	email: string | null
) => {
	const newImageRef = ref(database, `images/${imageId}`);
	await set(newImageRef, {
		imageId,
		userId: uid,
		userEmail: email,
		image: url,
		date: moment().format('YYYY-MM-DD'),
	});
};

export const saveUserToDB = async (uid: string, email: string) => {
	const newUserRef = ref(database, `users/${uid}`);
	await set(newUserRef, {
		uid,
		email,
	});
};

export const handleSaveImage = async ({
	blob,
	imageId,
	uid,
	email,
}: SaveImageParams) => {
	const storageRef = refStorage(storage, `images/${imageId}.webp`);
	const snapshot = await uploadBytes(storageRef, blob);
	if (snapshot) {
		const url = await getDownloadURL(snapshot.ref);
		await saveImageToDB(url, imageId, uid, email);
	}
};
