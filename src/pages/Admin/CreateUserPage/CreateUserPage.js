import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faKey,
    faEnvelope,
    faIdCard,
    faInfoCircle,
    faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate, useLocation, Form } from 'react-router-dom';

import styles from './CreateUserPage.module.scss';
import axios from '~/utils/api';
import useAuth from '~/hooks/useAuth';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

function AccountManagementPage() {
    const { auth } = useAuth();
    const [roleList, setRoleList] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const to = location.state?.from?.pathname || '/';

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(true);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const usernameRef = useRef();

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

    const [role, setRole] = useState('');
    const [validRole, setValidRole] = useState(true);
    const [roleFocus, setRoleFocus] = useState(false);
    const roleRef = useRef();

    const [success, setSuccess] = useState(true);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        axios
            .get(`roles`)
            .then((response) => {
                const data = response.data;
                setRoleList(data.data);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message | 'Lỗi server!');
            });
    }, []);

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    function handleUsernameChange(e) {
        setUsername(e.target.value.trim());
        const result = USER_REGEX.test(e.target.value.trim());
        setValidUsername(result);
    }

    function handlePwdChange(e) {
        setPwd(e.target.value.trim());
        const result = PWD_REGEX.test(e.target.value.trim());
        setValidPwd(result);
    }

    function handleMatchPwdChange(e) {
        setMatchPwd(e.target.value.trim());
        const match = pwd === e.target.value.trim();
        setValidMatchPwd(match);
    }

    function handleNameChange(e) {
        setName(e.target.value.trim());
        const result = e.target.value.trim() !== '';
        setValidName(result);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value.trim());
        const result = EMAIL_REGEX.test(e.target.value.trim());
        setValidEmail(result);
    }

    function handleRoleChange(e) {
        setRole(e.target.value);
        const result = e.target.value !== '';
        setValidRole(result);
    }

    async function handleSubmitForm(e) {
        e.preventDefault();

        if (!USER_REGEX.test(username)) {
            setValidUsername(() => {
                usernameRef.current.focus();
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
        } else if (name.trim() === '') {
            setValidName(() => {
                nameRef.current.focus();
                return false;
            });
        } else if (!EMAIL_REGEX.test(email)) {
            setValidEmail(() => {
                emailRef.current.focus();
                return false;
            });
        } else if (role === '') {
            setValidRole(() => {
                roleRef.current.focus();
                return false;
            });
        } else {
            try {
                setSuccess(true);
                setIsSubmitting(true);

                const response = await axios.post(
                    '/users',
                    { username, password: pwd, name, email, role },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                        },
                    },
                );

                const data = response.data;
                toast.success(data?.message);
                navigate(to, { replace: true });
            } catch (err) {
                setSuccess(false);
                if (!err?.response) {
                    setErrMsg('Lỗi! Máy chủ không có phản hổi!');
                    toast.error('Lỗi! Máy chủ không có phản hổi!');
                } else {
                    setErrMsg(err.response.data.message);
                    toast.error(err.response.data.message);
                }
            }
            setIsSubmitting(false);
        }
    }

    return (
        <Container className={cx('wrapper')}>
            <Row>
                <Col
                    className={`${cx('inner-wrapper')} px-0`}
                    md={{ span: 10, offset: 1 }}
                    lg={{ span: 6, offset: 3 }}
                >
                    <div className={cx('title-wrapper')}>
                        <h1 className={cx('title')}>ADMIN Portal - Tạo Tài Khoản</h1>
                    </div>

                    <Form className={cx('form')} onSubmit={handleSubmitForm}>
                        <div
                            className={cx(
                                'form-group',
                                { invalid: !validUsername },
                                { focus: usernameFocus },
                            )}
                        >
                            <div className={cx('control-wrapper')}>
                                <input
                                    ref={usernameRef}
                                    value={username}
                                    onChange={handleUsernameChange}
                                    onFocus={(e) => setUsernameFocus(true)}
                                    onBlur={(e) => setUsernameFocus(false)}
                                    className={cx('form-control')}
                                    type="text"
                                    autoComplete="new-password"
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
                                    autoComplete="new-password"
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
                                    autoComplete="new-password"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                />
                                <FontAwesomeIcon className={cx('icon')} icon={faKey} />
                            </div>
                            <span className={cx('error')}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Phải khớp với mật khẩu đã
                                nhập.
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
                                <FontAwesomeIcon icon={faInfoCircle} /> Không được bỏ trống!
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

                        <div
                            className={cx(
                                'form-group',
                                { invalid: !validRole },
                                { focus: roleFocus },
                            )}
                        >
                            <div className={cx('control-wrapper')}>
                                <select
                                    ref={roleRef}
                                    value={role}
                                    onChange={handleRoleChange}
                                    onFocus={(e) => setRoleFocus(true)}
                                    onBlur={(e) => setRoleFocus(false)}
                                    className={cx('form-control')}
                                >
                                    <option value="" disabled>
                                        --Chọn role--
                                    </option>
                                    {roleList.map((role) => {
                                        return (
                                            <option key={role.roleid} value={role.roleid}>
                                                {role.name}
                                            </option>
                                        );
                                    })}
                                </select>
                                <FontAwesomeIcon className={cx('icon')} icon={faCircleCheck} />
                            </div>
                            <span className={cx('error')}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Vui lòng chọn role!
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
                            Tạo
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountManagementPage;
