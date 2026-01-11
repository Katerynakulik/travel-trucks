import { Icon } from "../Icon/Icon";
import styles from "./ReviewsTab.module.css";

export const ReviewsTab = ({ reviews }: { reviews: any[] }) => {
  return (
    <div className={styles.reviewsList}>
      {reviews?.map((rev, index) => (
        <article key={index} className={styles.reviewCard}>
          <div className={styles.reviewHeader}>
            <div className={styles.avatar}>
              {rev.reviewer_name[0].toUpperCase()}
            </div>
            <div className={styles.reviewerInfo}>
              <p className={styles.reviewerName}>{rev.reviewer_name}</p>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    id={i < rev.reviewer_rating ? "star-yellow" : "star-grey"}
                    width={16}
                    height={16}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className={styles.comment}>{rev.comment}</p>
        </article>
      ))}
    </div>
  );
};
