import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './FavouriteItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function FavouriteItem({
    recipeid,
    name,
    recipeavatar,
    estimatedtime,
    average_rating,
    datesubmit,
    description,
    reviews,
    category,
    onDelete,
}) {
    function handleDelete(e) {
        e.preventDefault();
        onDelete(recipeid);
    }
    return (
        <Link
            className={cx('wrapper')}
            to={`/recipes/${recipeid}`}
            style={{ backgroundImage: `url("${recipeavatar}")` }}
        >
            <div className={cx('inner-wrapper')}>
                <div className={cx('head')}>
                    <Tippy delay={[0, 50]} content="Xóa" placement="auto">
                        <button onClick={handleDelete} className={cx('delete-btn')}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </Tippy>
                </div>
                <div className={cx('recipe-info')}>
                    <h2 className={cx('name')}>{name}</h2>
                    <p>
                        <strong>Loại: </strong>
                        {category}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default FavouriteItem;
