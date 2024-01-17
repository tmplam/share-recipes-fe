import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye, faEyeSlash, faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from '~/utils/api';
import useAuth from '~/hooks/useAuth';
import { toast } from 'react-toastify';

import styles from './PostedItem.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
    status,
    onDelete,
}) {
    const { auth } = useAuth();

    const [recipeStatus, setRecipeStatus] = useState(status);

    function handleDelete(e) {
        e.preventDefault();
        onDelete(recipeid);
    }

    function handleHide(e) {
        e.preventDefault();

        axios
            .put(
                `recipes/${recipeid}/status`,
                {
                    status: 'Hidden',
                },
                {
                    headers: {
                        Authorization: auth?.token !== 'EXPIRED' ? auth?.token : null,
                    },
                },
            )
            .then((response) => {
                // const data = response.data;
                // toast.success(data.message);
                toast.success('Ẩn công thức thành công!');
                setRecipeStatus('Hidden');
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }

    function handleUnhide(e) {
        e.preventDefault();
        axios
            .put(
                `/recipes/${recipeid}/status`,
                {
                    status: 'Approved',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                    },
                },
            )
            .then((response) => {
                // const data = response.data;
                // toast.success(data.message);
                toast.success('Bỏ ẩn công thức thành công!');
                setRecipeStatus('Approved');
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }

    return (
        <div className={cx('outer-wrapper')}>
            <Link
                className={cx('wrapper')}
                to={`/recipes/${recipeid}`}
                style={{ backgroundImage: `url("${recipeavatar}")` }}
            >
                <div className={cx('inner-wrapper')}>
                    <div className={cx('recipe-info')}>
                        <h2 className={cx('name')}>{name}</h2>
                        <p>
                            <strong>Loại: </strong>
                            {category}
                        </p>
                    </div>
                </div>
            </Link>

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
                {recipeStatus === 'Approved' ? (
                    <Tippy delay={[0, 50]} content="Ẩn" placement="auto">
                        <button onClick={handleHide} className={cx('hidden-btn')}>
                            <FontAwesomeIcon icon={faEye} className={cx('hidden-icon')} />
                        </button>
                    </Tippy>
                ) : recipeStatus === 'Hidden' ? (
                    <Tippy delay={[0, 50]} content="Bỏ ẩn" placement="auto">
                        <button onClick={handleUnhide} className={cx('hidden-btn')}>
                            <FontAwesomeIcon icon={faEyeSlash} className={cx('hidden-icon')} />
                        </button>
                    </Tippy>
                ) : (
                    <span className={cx('status', { rejected: status === 'Rejected' })}>
                        {status}
                    </span>
                )}
            </div>
        </div>
    );
}

export default PostedItem;
