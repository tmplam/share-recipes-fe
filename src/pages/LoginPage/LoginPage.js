import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect, useContext } from 'react';
import axios from '~/utils/api';

import styles from './LoginPage.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import AuthContext from '~/contexts/AuthProvider';

const cx = classNames.bind(styles);

function Login() {
    const { setAuth } = useContext(AuthContext);
    const [success, setSuccess] = useState(true);

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');

    const [errMsg, setErrMsg] = useState('');

    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    async function handleSubmitForm(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                '/api/login',
                { email: 'eve.holt@reqres.in', password: 'cityslicka' },
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );

            // LOGIN THÀNH THỤ
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            setAuth({ username, pwd, roles, accessToken });

            console.log({ username, pwd, roles, accessToken });
            setSuccess(true);
        } catch (err) {
            setSuccess(false);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
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

                                <Button type="submit" green center w100 rounded large>
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
