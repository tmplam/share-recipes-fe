import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';

import styles from './FoodItem.module.scss';
import Button from '../../../../components/Button';

const cx = classNames.bind(styles);

function FoodItem({
    recipeid,
    name,
    recipeavatar,
    estimatedtime,
    average_rating,
    datesubmit,
    description,
    reviews,
}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-wrapper')}>
                <img className={cx('image')} src={recipeavatar} alt="Food" />
                <Button className={cx('favourite-btn')} title="Add to favourite">
                    <FontAwesomeIcon icon={faHeart} />
                </Button>
            </div>

            <div className={cx('info')}>
                <p className={cx('name')}>{name}</p>
                {/* <p className={cx('name')}>{description}</p> */}
            </div>
            <div className={cx('rating')}>
                <div className={cx('stars')}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </div>
                <div className={cx('reviews')}>{'(' + reviews + ' Đánh giá)'}</div>
            </div>

            <div className={cx('footer')}>
                <span className={cx('time')}>{estimatedtime + ' phút'}</span>
                <Link className={cx('view-btn')} to={`/recipes/${recipeid}`}>
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
}

export default FoodItem;
