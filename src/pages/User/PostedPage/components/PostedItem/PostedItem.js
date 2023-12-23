import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye, faEyeSlash, faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './PostedItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function PostedItem({
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
    onHide,
}) {
    function handleDelete(e) {
        e.preventDefault();
        onDelete(recipeid);
    }

    function handleHide(e) {
        e.preventDefault();
        onHide(recipeid);
    }

    return (
        <Link
            className={cx('wrapper')}
            to={`/recipes/${recipeid}`}
            style={{ backgroundImage: `url("${recipeavatar}")` }}
        >
            <div className={cx('inner-wrapper')}>
                <div className={cx('head')}>
                    <div className={cx('control')}>
                        <Tippy delay={[0, 50]} content="Sửa" placement="auto">
                            <Link to={`/recipes/${recipeid}/edit`} className={cx('edit-btn')}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Link>
                        </Tippy>
                        <Tippy delay={[0, 50]} content="Xóa" placement="auto">
                            <button onClick={handleDelete} className={cx('delete-btn')}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </Tippy>
                    </div>
                    <Tippy delay={[0, 50]} content="Ẩn" placement="auto">
                        <button onClick={handleHide} className={cx('hidden-btn')}>
                            <FontAwesomeIcon icon={faEye} className={cx('hidden-icon')} />
                        </button>
                    </Tippy>
                </div>
                <div className={cx('recipe-info')}>
                    <h2 className={cx('name')}>{name}</h2>
                    <p>
                        <strong>Loại: </strong>Đồ ăn nhanh
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default PostedItem;
