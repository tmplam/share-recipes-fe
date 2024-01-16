import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

import styles from './FoodItem.module.scss';

const cx = classNames.bind(styles);

function FoodItem({
    recipeid,
    index,
    name,
    recipeavatar,
    estimatedtime,
    averagerating,
    datesubmit,
    description,
    reviews,
    isfavourite,
    onAddToFavourite,
}) {
    function handleAddToFavourite(e) {
        alert(averagerating);
        e.preventDefault();
        onAddToFavourite(recipeid, index, isfavourite);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-wrapper')}>
                <img className={cx('image')} src={recipeavatar} alt="Food" />
                <Tippy delay={[0, 50]} content="Yêu thích" placement="auto">
                    <button
                        onClick={handleAddToFavourite}
                        className={cx('favourite-btn', { active: isfavourite })}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                </Tippy>
            </div>

            <div className={cx('info')}>
                <p className={cx('name')}>{name}</p>
                {/* <p className={cx('name')}>{description}</p> */}
            </div>
            <div className={cx('rating')}>
                <div className={cx('stars')}>
                    <Rating isRequired readOnly style={{ maxWidth: 100 }} value={averagerating} />
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
