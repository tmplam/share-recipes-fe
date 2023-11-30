import classNames from 'classnames/bind';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import styles from './LoginPage.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import useAuth from '~/hooks/useAuth';
import { login } from '~/services/authService';

const cx = classNames.bind(styles);

function Login() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const to = location.state?.from?.pathname || '/';

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');

    const [success, setSuccess] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    async function handleSubmitForm(e) {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            setSuccess(true);

            const authInfo = await login(username, pwd);

            setAuth(authInfo);
            localStorage.setItem('authInfo', JSON.stringify(authInfo));

            navigate(to, { replace: true });
        } catch (err) {
            setSuccess(false);
            if (!err?.response) {
                setErrMsg('Lỗi! Máy chủ không có phản hổi!');
            } else {
                setErrMsg(err.response.data.message);
            }
        }
        setIsSubmitting(false);
    }

    return (
        <Container className={`${cx('container')}`}>
            <div className={`${cx('wrapper')}`}>
                <Row className="g-0 px-0 h-100 w-100">
                    <Col lg={6} className="d-none d-lg-block h-100">
                        <div className={cx('image-wrapper')}>
                            <img className={cx('image')} src={images.loginImg} alt="food" />
                            <p className={cx('slogan')}>
                                Món ngon dành cho bạn, cho những người bạn yêu thương ❤️
                            </p>
                        </div>
                    </Col>
                    <Col lg={6} className="h-100">
                        <div className={cx('form-wrapper')}>
                            <form className={cx('form')} onSubmit={handleSubmitForm}>
                                <h1 className={cx('title')}>Đăng Nhập</h1>
                                <div className={cx('form-group')}>
                                    <div className={cx('control-wrapper')}>
                                        <input
                                            ref={userRef}
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className={cx('form-control')}
                                            type="text"
                                            placeholder="Username"
                                            required
                                        />
                                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    </div>
                                </div>

                                <div className={cx('form-group')}>
                                    <div className={cx('control-wrapper')}>
                                        <input
                                            value={pwd}
                                            onChange={(e) => setPwd(e.target.value)}
                                            className={cx('form-control')}
                                            type="password"
                                            placeholder="Mật khẩu"
                                            required
                                        />
                                        <FontAwesomeIcon className={cx('icon')} icon={faKey} />
                                    </div>
                                </div>

                                <p className={cx('error', { hide: success })}>
                                    <FontAwesomeIcon icon={faInfoCircle} /> {errMsg}.
                                </p>

                                <Button
                                    disabled={isSubmitting}
                                    type="submit"
                                    green
                                    center
                                    w100
                                    rounded
                                    large
                                    rightIcon={
                                        isSubmitting ? (
                                            <Spinner animation="border" variant="light" />
                                        ) : (
                                            false
                                        )
                                    }
                                >
                                    Đăng nhập
                                </Button>
                            </form>

                            <div className={cx('signup')}>
                                <p className={cx('signup-title')}>Bạn chưa có tài khoản ?</p>
                                <Link to="/signup" className={cx('signup-link')}>
                                    Đăng ký
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default Login;
