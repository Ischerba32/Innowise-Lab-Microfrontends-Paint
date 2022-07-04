import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import canvasReducer from './slices/canvasSlice';
import filterReducer from './slices/filterSlice';
import imagesReducer from './slices/imagesSlice';
import menuReducer from './slices/menuSlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		user: userReducer,
		images: imagesReducer,
		filter: filterReducer,
		canvas: canvasReducer,
		theme: themeReducer,
		burgerMenu: menuReducer,
	},
	middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
