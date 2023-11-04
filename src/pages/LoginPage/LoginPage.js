import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './LoginPage.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Login() {
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
                            <form className={cx('form')}>
                                <h1 className={cx('title')}>Đăng Nhập</h1>
                                <div className={cx('form-group')}>
                                    <div className={cx('control-wrapper')}>
                                        <input
                                            className={cx('form-control')}
                                            type="text"
                                            placeholder="Username"
                                            required
                                        />
                                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    </div>
                                    <span className={cx('error')}></span>
                                </div>
                                <div className={cx('form-group')}>
                                    <div className={cx('control-wrapper')}>
                                        <input
                                            className={cx('form-control')}
                                            type="password"
                                            placeholder="Mật khẩu"
                                            required
                                        />
                                        <FontAwesomeIcon className={cx('icon')} icon={faKey} />
                                    </div>
                                    <span className={cx('error')}></span>
                                </div>

                                <Button type="submit" green center w100 rounded large>
                                    Đăng ký
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
