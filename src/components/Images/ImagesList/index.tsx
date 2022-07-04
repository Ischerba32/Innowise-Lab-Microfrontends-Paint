import { onValue, ref } from 'firebase/database';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { database } from '../../../config/firebase';
import Image from '../../../interfaces/image.interface';
import State from '../../../interfaces/state.interface';
import { selectImagesByFilter } from '../../../redux/selectors';
import {
	getImages,
	getImagesSuccess,
	setImages,
} from '../../../redux/slices/imagesSlice';
import { setIsOpened } from '../../../redux/slices/menuSlice';
import { Button, Loader } from '../../UI';
import ImageItem from '../ImageItem';
import styles from './styles.module.scss';

const ImagesList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { uid } = useSelector((state: State) => state.user);
	const { isLoading } = useSelector((state: State) => state.images);
	const images = useSelector(selectImagesByFilter);
	const { isOpened } = useSelector((state: State) => state.burgerMenu);

	useEffect(() => {
		dispatch(getImages());
		if (uid) {
			return onValue(ref(database, `images`), (snapshot) => {
				if (snapshot.val()) {
					dispatch(setImages(Object.values(snapshot.val())));
				}
				dispatch(getImagesSuccess());
			});
		}
	}, [uid, dispatch]);

	const handleClickCreateButton = () => {
		isOpened && dispatch(setIsOpened(false));
		navigate('/mini-paint/draw');
	};

	return (
		<div className={styles.images}>
			{isLoading && <Loader speed={2} />}
			<div className={styles.images__container}>
				{!images.length && (
					<div className={styles.images__container_notFound}>
						<h1>No images</h1>
					</div>
				)}
				{images &&
					images.map((image: Image) => (
						<ImageItem image={image} key={image.imageId} />
					))}
			</div>
			<div className={styles.images__create}>
				<Button appearance='primary' onClick={handleClickCreateButton}>
					+ Create
				</Button>
			</div>
		</div>
	);
};

export default memo(ImagesList);
