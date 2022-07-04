import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../config/firebase';
import State from '../../interfaces/state.interface';
import { checkAuthSuccess } from '../../redux/slices/userSlice';
import AuthRouteProps from './props';

const AuthRoute = ({ children }: AuthRouteProps) => {
	const dispatch = useDispatch();
	const { uid } = useSelector((state: State) => state.user);

	const navigate = useNavigate();

	useEffect(() => {
		return onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(checkAuthSuccess({ uid: user.uid, email: user?.email }));
			} else {
				navigate('/signin');
			}
		});
	}, [dispatch, navigate, uid]);

	return <>{children}</>;
};

export default AuthRoute;
