import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './SignUpPage.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { useState, useRef, useEffect } from 'react';

const cx = classNames.bind(styles);

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{3, 23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8, 24}$/;

function SignUp() {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(username);

        setValidUsername(result);
    }, [username]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);

        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatchPwd(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [username, pwd, matchPwd]);

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
                                <h1 className={cx('title')}>Đăng Ký</h1>
                                <div
                                    className={cx(
                                        'form-group',
                                        { invalid: !validUsername },
                                        { focus: usernameFocus },
                                    )}
                                >
                                    <div className={cx('control-wrapper')}>
                                        <input
                                            ref={userRef}
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value.trim())}
                                            onFocus={(e) => setUsernameFocus(true)}
                                            onBlur={(e) => setUsernameFocus(false)}
                                            className={cx('form-control')}
                                            type="text"
                                            placeholder="Username"
                                        />
                                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    </div>
                                    <p className={cx('error')}>
                                        <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
                                        <br />
                                        Bắt đầu bằng kí tự.
                                        <br />
                                        Cho phép kí tự, kí số, dấu gạch dưới và gạch ngang.
                                    </p>
                                </div>
                                <div
                                    className={cx(
                                        'form-group',
                                        { invalid: !validPwd },
                                        { focus: pwdFocus },
                                    )}
                                >
                                    <div className={cx('control-wrapper')}>
                                        <input
                                            value={pwd}
                                            onChange={(e) => setUsername(e.target.value.trim())}
                                            onFocus={(e) => setPwdFocus(true)}
                                            onBlur={(e) => setPwdFocus(false)}
                                            className={cx('form-control')}
                                            type="password"
                                            placeholder="Mật khẩu"
                                        />
                                        <FontAwesomeIcon className={cx('icon')} icon={faKey} />
                                    </div>
                                    <p className={cx('error')}>
                                        <FontAwesomeIcon icon={faInfoCircle} /> 8 - 24 ký tự.
                                        <br />
                                        Phải bao gồm chữ hoa, chữ thường, số và kí tự đặc biệt.
                                        <br />
                                        Cho phép các ký tự đặc biệt:{' '}
                                        <span aria-label="exclamation mark">!</span>{' '}
                                        <span aria-label="at symbol">@</span>{' '}
                                        <span aria-label="hashtag">#</span>{' '}
                                        <span aria-label="dollar sign">$</span>{' '}
                                        <span aria-label="percent">%</span>
                                    </p>
                                </div>
                                <div
                                    className={cx(
                                        'form-group',
                                        { invalid: !validMatchPwd },
                                        { focus: matchPwdFocus },
                                    )}
                                >
                                    <div className={cx('control-wrapper')}>
                                        <input
                                            value={matchPwd}
                                            onChange={(e) => setMatchPwd(e.target.value.trim())}
                                            onFocus={(e) => setMatchPwdFocus(true)}
                                            onBlur={(e) => setMatchPwdFocus(false)}
                                            className={cx('form-control')}
                                            type="password"
                                            placeholder="Nhập lại mật khẩu"
                                        />
                                        <FontAwesomeIcon className={cx('icon')} icon={faKey} />
                                    </div>
                                    <span className={cx('error')}>
                                        <FontAwesomeIcon icon={faInfoCircle} /> Phải khớp với mật
                                        khẩu đã nhập.
                                    </span>
                                </div>

                                <Button type="submit" green center w100 rounded large>
                                    Đăng ký
                                </Button>
                            </form>

                            <div className={cx('login')}>
                                <p className={cx('login-title')}>Bạn đã có tài khoản ?</p>
                                <Link to="/login" className={cx('login-link')}>
                                    Đăng nhập
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default SignUp;
