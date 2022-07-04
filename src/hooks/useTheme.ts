import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';

import UseThemeResult from '../interfaces/hooks/useTheme.interface';
import State from '../interfaces/state.interface';
import { setTheme } from '../redux/slices/themeSlice';

export const useTheme = (): UseThemeResult => {
	const { theme } = useSelector((state: State) => state.theme);
	const dispatch = useDispatch();

	const dispatchTheme = useCallback(
		(theme: string) => {
			window.store.setTheme(theme);
			return dispatch(setTheme(theme));
		},
		[theme]
	);

	useEffect(() => {
		// It needs to fix theme switching bug caused by redux store initializing
		const currentTheme =
			theme === window.store.theme ? theme : window.store.theme;
		dispatch(setTheme(currentTheme));

		document.documentElement.setAttribute('data-theme', currentTheme);
		localStorage.setItem('app-theme', theme);

		window.addEventListener('themeChange', () => {
			document.documentElement.setAttribute('data-theme', window.store.theme);
			dispatch(setTheme(window.store.theme));
		});
	}, [theme, dispatch]);

	return { theme, dispatchTheme };
};
