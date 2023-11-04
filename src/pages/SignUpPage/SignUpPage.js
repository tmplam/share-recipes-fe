import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './SignUpPage.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { useState, useRef, useEffect } from 'react';

import axios from '~/utils/api';

const cx = classNames.bind(styles);

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function SignUp() {
    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(true);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const userRef = useRef();

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(true);
    const [pwdFocus, setPwdFocus] = useState(false);
    const pwdRef = useRef();

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(true);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);
    const matchPwdRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    function handleUsernameChange(e) {
        setUsername(e.target.value);
        const result = USER_REGEX.test(e.target.value);
        setValidUsername(result);
    }

    function handlePwdChange(e) {
        setPwd(e.target.value);
        const result = PWD_REGEX.test(e.target.value);
        setValidPwd(result);
    }

    function handleMatchPwdChange(e) {
        setMatchPwd(e.target.value);
        const match = pwd === e.target.value;
        setValidMatchPwd(match);
    }

    async function handleSubmitForm(e) {
        e.preventDefault();

        if (!USER_REGEX.test(username)) {
            setValidUsername(() => {
                userRef.current.focus();
                return false;
            });
        } else if (!PWD_REGEX.test(pwd)) {
            setValidPwd(() => {
                pwdRef.current.focus();
                return false;
            });
        } else if (pwd !== matchPwd) {
            setValidMatchPwd(() => {
                matchPwdRef.current.focus();
                return false;
            });
        } else {
            try {
                // HANDLE SIGN UP
                const response = await axios.post(
                    '/api/register',
                    {
                        email: 'eve.holt@reqres.i',
                        password: 'pisstol',
                    },
                    {
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    },
                );

                console.log(response);
                // console.log(JSON.stringify(response));
                // setSuccess(true);

                //clear state and controlled inputs
                //need value attrib on inputs for this

                setUsername('');
                setPwd('');
                setMatchPwd('');
            } catch (err) {
                console.log(err);
                if (!err?.response) {
                    // setErrMsg('No Server Response');
                } else if (err.response?.status === 409) {
                    // setErrMsg('Username Taken');
                } else {
                    // setErrMsg('Registration Failed');
                }
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
                                            onChange={handleUsernameChange}
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
                                            ref={pwdRef}
                                            value={pwd}
                                            onChange={handlePwdChange}
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
                                            ref={matchPwdRef}
                                            value={matchPwd}
                                            onChange={handleMatchPwdChange}
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
