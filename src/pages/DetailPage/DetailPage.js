import classNames from 'classnames/bind';
import { faHeart, faPlateWheat, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { Container } from 'react-bootstrap';

import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import CommentItem from './components/CommentItem';
import styles from './DetailPage.module.scss';
import axios from '~/utils/api';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function DetailPage() {
    const { auth } = useAuth();
    let { recipeId } = useParams();
    const [recipe, setRecipe] = useState({});
    const [comments, setComments] = useState([]);

    const [avatar, setAvatar] = useState('');
    const [averagerating, setAverageRating] = useState(0);

    useEffect(() => {
        axios
            .get(`/user/profile`, {
                headers: {
                    Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                },
            })
            .then((response) => {
                const profile = response.data.data;
                setAvatar(profile.avatar);
            })
            .catch((err) => {
                // console.error(err);
            });
    }, [auth?.token]);

    useEffect(() => {
        axios
            .get(`recipes/${recipeId}`, {
                headers: {
                    Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                },
            })
            .then((response) => {
                let avg = Number.parseFloat(response.data.data.averagerating);
                if (Number.isNaN(avg)) avg = 0;
                else avg = avg.toFixed(1);

                setAverageRating(avg);
                setRecipe({ ...response?.data.data, averagerating: avg });
            })
            .catch((err) => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios
            .get(`/comments/${recipeId}?sort_by=oldest`)
            .then((response) => {
                const info = response.data;
                setComments(info.data);
            })
            .catch((err) => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleAddToFavourite(e) {
        axios
            .post(
                `user/favourites`,
                {
                    recipe: recipeId,
                },
                {
                    headers: {
                        Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                    },
                },
            )
            .then((response) => {
                const data = response.data;
                toast.success(data.message);
                setRecipe((prev) => ({ ...prev, isfavourite: true }));
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }

    function handleDeleteFavourite() {
        axios
            .delete(`user/favourites/${recipe.recipeid}`, {
                headers: {
                    Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                },
            })
            .then((response) => {
                const data = response.data;
                toast.success(data.message);
                setRecipe((prev) => ({ ...prev, isfavourite: false }));
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }

    const ratingChanged = (newRating) => {
        setAverageRating(newRating);
    };

    const [comment, setComment] = useState('');
    function handleComment(e) {
        e.preventDefault();

        axios
            .post(
                `/comments/add/${recipeId}`,
                { content: comment },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                    },
                },
            )
            .then((response) => {
                // Reload all comments
                axios
                    .get(`/comments/${recipeId}?sort_by=oldest`)
                    .then((response) => {
                        const info = response.data;
                        setComments(info.data);
                    })
                    .catch((err) => {});
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });

        setComment('');
    }

    function handleReply(recipeId, commentId, replyContent) {
        axios
            .post(
                `/comments/add/${recipeId}`,
                { content: replyContent, replyTo: commentId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                    },
                },
            )
            .then((response) => {
                // Reload all comments
                axios
                    .get(`/comments/${recipeId}?sort_by=oldest`)
                    .then((response) => {
                        const info = response.data;
                        setComments(info.data);
                    })
                    .catch((err) => {});
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }

    function handleDeleteComment(commentId) {
        axios
            .delete(`/comments/${commentId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                },
            })
            .then((response) => {
                // Reload all comments
                axios
                    .get(`/comments/${recipeId}?sort_by=oldest`)
                    .then((response) => {
                        const info = response.data;
                        setComments(info.data);
                    })
                    .catch((err) => {});
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }

    return (
        <Container>
            <div className={cx('wrapper')}>
                <div className={cx('recipe-info')}>
                    <h1 className={cx('name')}>{recipe.name}</h1>
                    <div className={cx('detail')}>
                        <div className={cx('desc')}>
                            <img
                                className={`${cx('food-img')} img-thumbnail`}
                                src={recipe.recipeavatar}
                                alt="food"
                            />
                            <div className={cx('desc-detail')}>
                                <div>
                                    <h2 className={cx('title')}>
                                        <FontAwesomeIcon icon={faNewspaper} /> Mô tả:
                                    </h2>
                                    <div dangerouslySetInnerHTML={{ __html: recipe.description }} />
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p>
                                        <strong style={{ fontWeight: 600, fontSize: 2.2 + 'rem' }}>
                                            Loại:{' '}
                                        </strong>{' '}
                                        {recipe.category}
                                    </p>
                                    <p>
                                        <strong style={{ fontWeight: 600, fontSize: 1.8 + 'rem' }}>
                                            Thời gian:{' '}
                                        </strong>{' '}
                                        {recipe.estimatedtime} phút
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('ingre-wrapper')}>
                            <h2 className={cx('title')}>
                                <FontAwesomeIcon icon={faPlateWheat} /> Nguyên liệu:
                            </h2>
                            <div dangerouslySetInnerHTML={{ __html: recipe.ingredients }} />
                        </div>
                        <div className={cx('guid-wrapper')}>
                            <h2 className={cx('title')}>
                                <FontAwesomeIcon icon={faUtensils} /> Hướng dẫn:
                            </h2>
                            <div dangerouslySetInnerHTML={{ __html: recipe.instruction }} />
                        </div>
                    </div>
                </div>

                <div className={cx('action')}>
                    <div className={cx('save')}>
                        <p>Thêm vào danh sách yêu thích</p>
                        {recipe.isfavourite ? (
                            <Tippy
                                delay={[0, 50]}
                                content="Xóa khỏi danh sách yêu thích"
                                placement="auto"
                            >
                                <button
                                    className={cx('favourite-btn', 'active')}
                                    onClick={handleDeleteFavourite}
                                >
                                    <FontAwesomeIcon icon={faHeart} />
                                </button>
                            </Tippy>
                        ) : (
                            <Tippy
                                delay={[0, 50]}
                                content="Thêm vào danh sách yêu thích"
                                placement="auto"
                            >
                                <button
                                    className={cx('favourite-btn')}
                                    onClick={handleAddToFavourite}
                                >
                                    <FontAwesomeIcon icon={faHeart} />
                                </button>
                            </Tippy>
                        )}
                    </div>
                    <div className={cx('rating')}>
                        <p>Đánh giá ({recipe.averagerating || 'Chưa có đánh giá nào'})</p>
                        <div className={cx('stars')}>
                            <Rating
                                isRequired
                                readOnly
                                style={{ maxWidth: 220 }}
                                value={averagerating}
                                onChange={ratingChanged}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('comment-wrapper')}>
                    <h1>Bình luận</h1>
                    <div className={'comment-list'}>
                        {comments.map((comment, index) => (
                            <CommentItem
                                onDelete={handleDeleteComment}
                                onReply={handleReply}
                                data={comment}
                                key={index}
                            />
                        ))}
                        <form onSubmit={handleComment} className={cx('input-group')}>
                            <img className={cx('avatar')} src={avatar} alt="avatar" />
                            <input
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                spellCheck="false"
                                className={cx('cmt-input')}
                                placeholder="Nhập bình luận ..."
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default DetailPage;
