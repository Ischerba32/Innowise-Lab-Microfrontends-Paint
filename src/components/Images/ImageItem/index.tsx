import { Card } from "../../UI";
import ImageItemProps from "./props";
import styles from "./styles.module.scss";

const ImageItem = ({ image }: ImageItemProps) => {
  return (
    <div className={styles.imageItem}>
      <a href={image.image} target="_blank">
        <Card>
          <img src={image.image} alt={image.imageId} />
          <div className={styles.imageItem__info}>
            <p>{image.userEmail}</p>
          </div>
        </Card>
      </a>
    </div>
  );
};

export default ImageItem;
