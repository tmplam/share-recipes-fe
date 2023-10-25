import classNames from 'classnames/bind';

import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

function CommentItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src={data.avatar} alt="avatar" />
            <div className={cx('info')}>
                <p className={cx('username')}>{data.username}</p>
                <p className={cx('content')}>{data.content}</p>
            </div>
        </div>
    );
}

export default CommentItem;
