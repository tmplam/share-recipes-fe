import classNames from 'classnames/bind';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import styles from './ProfilePage.module.scss';

import images from '~/assets/images';
import useUserInfo from '~/hooks/useUserInfo';
import axios from '~/utils/api';
import useAuth from '~/hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Profile() {
    const { auth } = useAuth();
    const { setUserInfo } = useUserInfo();
    const [displayName, setDisplayName] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [email, setEmail] = useState('');
    const [rerender, setRerender] = useState({});

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const infoFormRef = useRef();

    useEffect(() => {
        axios
            .get(`/user/profile`, {
                headers: {
                    Authorization: auth?.token,
                },
            })
            .then((response) => {
                const profile = response.data.data;
                setUserInfo(profile);

                setName(profile.name);
                setDisplayName(profile.name);
                setEmail(profile.email);
                setAvatar(profile.avatar);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, [auth?.token, setUserInfo, rerender]);

    async function handleSubmitUpdate(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            setIsSubmitting(true);
            const response = await axios.put('/user/profile', formData, {
                headers: {
                    Authorization: auth?.token !== 'EXPIRED' ? auth?.token : null,
                },
            });
            toast.success(response.data.message);
            setRerender({});
        } catch (error) {
            // Xử lý lỗi
            toast.error(error?.response?.data?.message);
        }
        setIsSubmitting(false);
    }

    async function handleSubmitChangePwd(e) {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const response = await axios.put(
                '/auth/password/reset',
                {
                    'old-password': oldPassword,
                    'new-password': newPassword,
                    'repeat-new-password': confirmNewPassword,
                },
                {
                    headers: {
                        Authorization: auth?.token !== 'EXPIRED' ? auth?.token : null,
                    },
                },
            );
            toast.success(response.data.message);
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            handleChangeView();
            setRerender({});
        } catch (error) {
            // Xử lý lỗi
            toast.error(error?.response?.data?.message);
        }
        setIsSubmitting(false);
    }

    function handleChangeView(e) {
        infoFormRef.current.classList.toggle(cx('hide'));
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState();
    const avatarInputRef = useRef();
    const avatarRef = useRef();

    // Show preview image
    useEffect(() => {
        if (!selectedFile) {
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    return (
        <Container className={`${cx('container')}`}>
            <div className={`${cx('wrapper')}`}>
                <Row className="g-0 px-0 h-100 w-100 flex-nowrap">
                    <Col lg={6} className="d-none d-lg-block h-100">
                        <div className={cx('image-wrapper')}>
                            <img
                                onClick={() => {
                                    avatarInputRef.current.click();
                                }}
                                ref={avatarRef}
                                className={cx('image')}
                                src={preview || avatar || images.avatar}
                                alt="avatar"
                            />

                            <input
                                ref={avatarInputRef}
                                style={{ display: 'none' }}
                                onChange={onSelectFile}
                                type="file"
                                accept="image/*"
                            />

                            <p className={cx('user-name')}>{displayName}</p>
                            <p className={cx('Address')}>Thành phố Hồ Chí Minh | Việt Nam</p>
                            <hr />
                        </div>
                    </Col>

                    <Col
                        lg={6}
                        className={`${cx(
                            'form-col',
                        )} h-100 d-flex position-relative flex-nowrap overflow-hidden`}
                    >
                        <div ref={infoFormRef} className={cx('form-wrapper', 'info-form')}>
                            <form className={cx('form')}>
                                <div className={cx('form-content')}>
                                    <h1 className={cx('title')}>User Profile</h1>
                                    <div className={cx('form-group')}>
                                        <div className={cx('control-wrapper')}>
                                            <label htmlFor="name">Họ và tên:</label>
                                            <input
                                                id="name"
                                                spellCheck={false}
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
                                                className={cx('control-wrapper-properties')}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <div className={cx('control-wrapper')}>
                                            <label htmlFor="email">Email:</label>
                                            <input
                                                id="email"
                                                spellCheck={false}
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                className={cx('control-wrapper-properties')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div>
                                <Button
                                    onClick={handleChangeView}
                                    center
                                    green
                                    leftIcon={<FontAwesomeIcon icon={faLock} />}
                                >
                                    Đổi mật khẩu
                                </Button>

                                <Button
                                    disabled={isSubmitting}
                                    ml
                                    onClick={handleSubmitUpdate}
                                    center
                                    green
                                    leftIcon={
                                        isSubmitting ? (
                                            <Spinner animation="border" variant="light" />
                                        ) : (
                                            <FontAwesomeIcon icon={faFloppyDisk} />
                                        )
                                    }
                                >
                                    Lưu
                                </Button>
                            </div>
                        </div>

                        <div className={cx('form-wrapper', 'password-form')}>
                            <form className={cx('form')}>
                                <div className={cx('form-content')}>
                                    <h1 className={cx('title')}>Đổi Mật Khẩu</h1>
                                    <div className={cx('form-group')}>
                                        <div className={cx('control-wrapper')}>
                                            <label htmlFor="oldPwd">Mật khẩu cũ:</label>
                                            <input
                                                required
                                                type="password"
                                                autoComplete="new-password"
                                                id="oldPwd"
                                                spellCheck={false}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                value={oldPassword}
                                                className={cx('control-wrapper-properties', 'far')}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <div className={cx('control-wrapper')}>
                                            <label htmlFor="newPwd">Mật khẩu mới:</label>
                                            <input
                                                required
                                                type="password"
                                                autoComplete="new-password"
                                                id="newPwd"
                                                spellCheck={false}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                value={newPassword}
                                                className={cx('control-wrapper-properties', 'far')}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <div className={cx('control-wrapper')}>
                                            <label htmlFor="confirmPwd">Nhập lại:</label>
                                            <input
                                                required
                                                type="password"
                                                autoComplete="new-password"
                                                id="confirmPwd"
                                                spellCheck={false}
                                                onChange={(e) =>
                                                    setConfirmNewPassword(e.target.value)
                                                }
                                                value={confirmNewPassword}
                                                className={cx('control-wrapper-properties', 'far')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div>
                                <Button
                                    onClick={handleChangeView}
                                    center
                                    green
                                    leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                                >
                                    Quay lại
                                </Button>

                                <Button
                                    disabled={isSubmitting}
                                    ml
                                    onClick={handleSubmitChangePwd}
                                    center
                                    green
                                    leftIcon={
                                        isSubmitting ? (
                                            <Spinner animation="border" variant="light" />
                                        ) : (
                                            <FontAwesomeIcon icon={faFloppyDisk} />
                                        )
                                    }
                                >
                                    Lưu
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default Profile;
