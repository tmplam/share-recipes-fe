import classNames from 'classnames/bind';
import { faHeart, faPlateWheat, faStar, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { Container, Modal } from 'react-bootstrap';

import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import CommentItem from './components/CommentItem';
import images from '~/assets/images';
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

    const [reload, setReload] = useState({});

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

                setRecipe({ ...response?.data.data, averagerating: avg });
            })
            .catch((err) => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

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

    const [comment, setComment] = useState('');
    function handleComment(e) {
        e.preventDefault();
        let commentContent = comment.trim().split(/\s+/);
        if (commentContent[0] === '') {
            toast.error('Chưa nhập nội dung bình luận!');
        } else if (commentContent.length > 100) {
            toast.error('Không bình luận quá 100 từ!');
        } else {
            axios
                .post(
                    `/comments/add/${recipeId}`,
                    { content: commentContent.join(' ') },
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
    }

    function handleReply(recipeId, commentId, replyContent) {
        replyContent = replyContent.trim().split(/\s+/);
        if (replyContent[0] === '') {
            toast.error('Chưa nhập nội dung bình luận!');
            return false;
        } else if (replyContent.length > 100) {
            toast.error('Không bình luận quá 100 từ!');
            return false;
        } else {
            axios
                .post(
                    `/comments/add/${recipeId}`,
                    { content: replyContent.join(' '), replyTo: commentId },
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
            return true;
        }
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

    // RATING
    // DELETE modal
    const [ratedInfo, setRatedInfo] = useState({});

    useEffect(() => {
        axios
            .get(`/rating/${recipeId}`, {
                headers: {
                    Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                },
            })
            .then((response) => {
                const info = response.data;
                setRatedInfo(info);
            })
            .catch((err) => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ratingChanged = (newRating) => {
        axios
            .post(
                `/rating/${recipeId}`,
                { rating: newRating },
                {
                    headers: {
                        Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                    },
                },
            )
            .then((response) => {
                toast.success('Đánh giá thành công!');
                setReload({});
                handleClose();
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                handleClose();
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    return (
        <Container>
            <div className={cx('wrapper')}>
                <div className={cx('recipe-info')}>
                    <div className={cx('name-wrapper')}>
                        <h1 className={cx('name')}>{recipe.name}</h1>
                        <p className={cx('author')}>
                            <span>Người đăng:</span> {recipe?.author?.name}
                        </p>
                    </div>
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
                                <div className="d-flex justify-content-between align-items-end">
                                    <div>
                                        <p style={{ marginBottom: '4px' }}>
                                            <strong
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: 2 + 'rem',
                                                }}
                                            >
                                                Loại:{' '}
                                            </strong>{' '}
                                            {recipe.category}
                                        </p>
                                        <p>
                                            <strong
                                                style={{ fontWeight: 600, fontSize: 1.8 + 'rem' }}
                                            >
                                                Thời gian:{' '}
                                            </strong>{' '}
                                            {recipe.estimatedtime} phút
                                        </p>
                                    </div>
                                    <p>
                                        <strong style={{ fontWeight: 600, fontSize: 1.8 + 'rem' }}>
                                            Ngày cập nhật:{' '}
                                        </strong>{' '}
                                        {new Date(recipe.datesubmit).getDate()}/
                                        {new Date(recipe.datesubmit).getMonth() + 1}/
                                        {new Date(recipe.datesubmit).getFullYear()}
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

                {recipe.status === 'Rejected' || recipe.status === 'Pending' ? null : (
                    <>
                        <div className={cx('action-wrapper')}>
                            <div className={cx('save')}>
                                <p>Yêu thích, đánh giá</p>
                                <div className={cx('action')}>
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

                                    <Tippy
                                        delay={[0, 50]}
                                        content="Đánh giá công thức"
                                        placement="auto"
                                    >
                                        <button className={cx('rating-btn')} onClick={handleShow}>
                                            <FontAwesomeIcon icon={faStar} />
                                        </button>
                                    </Tippy>
                                </div>
                            </div>

                            <div className={cx('rating')}>
                                <p>
                                    {recipe.reviews > 0
                                        ? `${recipe.reviews} Lượt đánh giá (${recipe.averagerating} sao)`
                                        : 'Chưa có lượt đánh giá nào'}
                                </p>
                                <div className={cx('stars')}>
                                    <Rating
                                        isRequired
                                        readOnly
                                        style={{ maxWidth: 220 }}
                                        value={recipe.averagerating}
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
                                    <img
                                        className={cx('avatar')}
                                        src={avatar || images.avatar}
                                        alt="avatar"
                                    />
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
                    </>
                )}
            </div>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2 style={{ margin: 0 }}>Đánh giá món ăn này!</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Rating
                        isRequired
                        style={{ maxWidth: 220 }}
                        value={ratedInfo?.rated}
                        onChange={ratingChanged}
                    />
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'flex-start' }}>
                    <span>Người thật, việc thật, rating sao cho thật!</span>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default DetailPage;
