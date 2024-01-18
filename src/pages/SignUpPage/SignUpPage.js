import classNames from 'classnames/bind';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faKey,
    faInfoCircle,
    faIdCard,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation, Form } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import styles from './SignUpPage.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import useAuth from '~/hooks/useAuth';
import { register } from '~/services/authService';

const cx = classNames.bind(styles);

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const fullNameValidate = (fullname) => {
    const FULLNAME_REGEX =
        /^[A-ZÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶĐÉÈẺẼẸÊẾỀỂỄỆÚÙỦŨỤƯỨỪỬỮỰÍÌỈĨỊÓÒỎÕỌƠỚỜỞỠỢÔỐỒỔỖỘÝỲỶỸỴ][a-záàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịóòỏõọơớờởỡợôốồổỗộýỳỷỹỵ]*$/;

    const names = fullname.trim().split(/\s+/); // Tách chuỗi thành mảng các từ, loại bỏ khoảng trắng thừa
    for (let i = 0; i < names.length; i++) {
        if (!FULLNAME_REGEX.test(names[i])) {
            return '';
        }
    }
    return names.join(' ');
};

function SignUp() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const to = location.state?.from?.pathname || '/';

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

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(true);
    const [nameFocus, setNameFocus] = useState(false);
    const nameRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [emailFocus, setEmailFocus] = useState(false);
    const emailRef = useRef();

    const [success, setSuccess] = useState(true);
    const [errMsg, setErrMsg] = useState('');

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

    function handleNameChange(e) {
        setName(e.target.value);
        const name = fullNameValidate(e.target.value);
        setValidName(name !== '');
    }

    function handleEmailChange(e) {
        setEmail(e.target.value.trim());
        const result = EMAIL_REGEX.test(e.target.value.trim());
        setValidEmail(result);
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
        } else if (fullNameValidate(name) === '') {
            setValidName(() => {
                nameRef.current.focus();
                return false;
            });
        } else if (!EMAIL_REGEX.test(email)) {
            setValidEmail(() => {
                emailRef.current.focus();
                return false;
            });
        } else {
            try {
                setSuccess(true);
                setIsSubmitting(true);
                // HANDLE SIGN UP
                const authInfo = await register(username, pwd, name, email);

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
                            <Form className={cx('form')} onSubmit={handleSubmitForm}>
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
                                            autocomplete="new-password"
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
                                            autocomplete="new-password"
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

                                <div
                                    className={cx(
                                        'form-group',
                                        { invalid: !validName },
                                        { focus: nameFocus },
                                    )}
                                >
                                    <div className={cx('control-wrapper')}>
                                        <input
                                            ref={nameRef}
                                            value={name}
                                            onChange={handleNameChange}
                                            onFocus={(e) => setNameFocus(true)}
                                            onBlur={(e) => setNameFocus(false)}
                                            className={cx('form-control')}
                                            placeholder="Họ và tên"
                                        />
                                        <FontAwesomeIcon className={cx('icon')} icon={faIdCard} />
                                    </div>
                                    <span className={cx('error')}>
                                        <FontAwesomeIcon icon={faInfoCircle} /> Tên không được bỏ
                                        trống.
                                        <br />
                                        Phải viết hoa chữ cái đầu và viết thường các chữ cái sau.
                                    </span>
                                </div>

                                <div
                                    className={cx(
                                        'form-group',
                                        { invalid: !validEmail },
                                        { focus: emailFocus },
                                    )}
                                >
                                    <div className={cx('control-wrapper')}>
                                        <input
                                            ref={emailRef}
                                            value={email}
                                            onChange={handleEmailChange}
                                            onFocus={(e) => setEmailFocus(true)}
                                            onBlur={(e) => setEmailFocus(false)}
                                            className={cx('form-control')}
                                            placeholder="Email"
                                        />
                                        <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                                    </div>
                                    <span className={cx('error')}>
                                        <FontAwesomeIcon icon={faInfoCircle} /> Email không hợp lệ!
                                    </span>
                                </div>

                                <p className={cx('server-error', { hide: success })}>
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
                                    Đăng ký
                                </Button>
                            </Form>

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
