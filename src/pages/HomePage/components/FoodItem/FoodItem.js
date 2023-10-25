import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';

import styles from './FoodItem.module.scss';
import Button from '../../../../components/Button';

const cx = classNames.bind(styles);

function FoodItem({ id, image, name, time, stars, reviews }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-wrapper')}>
                <img className={cx('image')} src={image} alt="Food" />
                <Button className={cx('favourite-btn')} title="Add to favourite">
                    <FontAwesomeIcon icon={faHeart} />
                </Button>
            </div>
            <p className={cx('name')}>{name} </p>
            <div className={cx('rating')}>
                <div className={cx('stars')}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </div>
                <div className={cx('reviews')}>{'(' + reviews + ' Reviews)'}</div>
            </div>
            <div className={cx('footer')}>
                <span className={cx('time')}>{time + ' mins'}</span>
                <Link className={cx('view-btn')} to={`/recipes/${123}`}>
                    View Recipe
                </Link>
            </div>
        </div>
    );
}

export default FoodItem;
