import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import useAuth from '~/hooks/useAuth';
import axios from '~/utils/api';

import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

function CommentItem({ data, onReply, onDelete }) {
    const { auth } = useAuth();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        axios
            .get(`/user/profile`, {
                headers: {
                    Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                },
            })
            .then((response) => {
                const profile = response.data.data;
                setProfile(profile);
            })
            .catch((err) => {
                // console.error(err);
            });
    }, [auth?.token]);

    function formatTimeDifference(pastDate) {
        const timeDifference = new Date() - new Date(pastDate);

        // Chuyển đổi thời gian từ miliseconds sang giây
        const secondsDifference = Math.floor(timeDifference / 1000);

        if (secondsDifference < 60) {
            return `${secondsDifference} giây`;
        } else if (secondsDifference < 3600) {
            const minutesDifference = Math.floor(secondsDifference / 60);
            return `${minutesDifference} phút`;
        } else if (secondsDifference < 86400) {
            const hoursDifference = Math.floor(secondsDifference / 3600);
            return `${hoursDifference} giờ`;
        } else if (secondsDifference < 31536000) {
            const daysDifference = Math.floor(secondsDifference / 86400);
            return `${daysDifference} ngày`;
        } else {
            const yearsDifference = Math.floor(secondsDifference / 31536000);
            return `${yearsDifference} năm`;
        }
    }

    function handleShowReply(e) {
        e.stopPropagation();
        const replyWpapper = e.target
            .closest(`.${cx('wrapper')}`)
            .querySelector(`.${cx('reply-form-group')}`);
        replyWpapper.querySelector(`.${cx('cmt-input')}`).focus();

        replyWpapper.classList.add(cx('show'));

        replyWpapper.querySelector(`.${cx('cmt-input')}`).focus();
    }

    function handleBlurReply(e) {
        const replyWpapper = e.target.closest(`.${cx('reply-form-group')}`);
        replyWpapper.classList.remove(cx('show'));
    }

    const [reply, setReply] = useState('');
    function handleReply(e) {
        e.preventDefault();
        onReply(data.recipeId, data.commentId, reply);
        handleBlurReply(e);
        setReply('');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('main-comment')}>
                <img className={cx('avatar')} src={data.avatar || images.avatar} alt="avatar" />
                <div className={cx('main')}>
                    <div className={cx('info')}>
                        <p className={cx('username')}>{data.userName}</p>
                        <p className={cx('content')}>{data.content}</p>
                    </div>
                    <div className={cx('action')}>
                        <span>{formatTimeDifference(data.dateSubmit)}</span>
                        <span onClick={handleShowReply} className={cx('reply-btn')}>
                            Trả lời
                        </span>
                        {data.userId === profile.userid ? (
                            <span
                                onClick={(e) => onDelete(data.commentId)}
                                className={cx('delete-btn')}
                            >
                                Xóa
                            </span>
                        ) : (
                            false
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('reply-list')}>
                {data.replyComments.map((reply) => (
                    <div key={reply.commentId} className={cx('reply-wrapper')}>
                        <div className={cx('icon-wrapper')}>
                            <FontAwesomeIcon className={cx('reply-icon')} icon={faArrowTurnUp} />
                        </div>
                        <div className={cx('main-comment')}>
                            <img className={cx('avatar')} src={reply.avatar} alt="avatar" />
                            <div className={cx('main')}>
                                <div className={cx('info')}>
                                    <p className={cx('username')}>{reply.userName}</p>
                                    <p className={cx('content')}>{reply.content}</p>
                                </div>
                                <div className={cx('action')}>
                                    <span>{formatTimeDifference(reply.dateSubmit)}</span>
                                    {reply.userId === profile.userid ? (
                                        <span
                                            onClick={(e) => onDelete(reply.commentId)}
                                            className={cx('delete-btn')}
                                        >
                                            Xóa
                                        </span>
                                    ) : (
                                        false
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Reply comment input */}
                <div className={cx('reply-form-group')}>
                    <div className={cx('reply-wrapper')}>
                        <div className={cx('icon-wrapper')}>
                            <FontAwesomeIcon className={cx('reply-icon')} icon={faArrowTurnUp} />
                        </div>
                        <form onSubmit={handleReply} className={cx('main-comment')}>
                            <img
                                className={cx('avatar')}
                                src={profile.avatar || images.avatar}
                                alt="avatar"
                            />
                            <input
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                onBlur={handleBlurReply}
                                spellCheck="false"
                                className={cx('cmt-input')}
                                placeholder="Nhập bình luận ..."
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
