import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

import styles from './NotFoundPage.module.scss';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <section className={cx('wrapper')}>
            <div className={cx('notfound')}>
                <div className={cx('notfound-bg')}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h1 className={cx('title')}>Oops!</h1>
                <h2 className={cx('message')}>Lỗi 404 : Không tìm thấy trang!</h2>
                <Button className={cx('back-btn')} to="/" center green>
                    Về trang chủ
                </Button>
                <div className={cx('notfound-social')}>
                    <a href="https://www.facebook.com/profile.php?id=100019167581327">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100019167581327">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100019167581327">
                        <FontAwesomeIcon icon={faGooglePlusG} />
                    </a>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
