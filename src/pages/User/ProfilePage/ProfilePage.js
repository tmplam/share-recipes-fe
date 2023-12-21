import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Link, Form } from 'react-router-dom';

import styles from './ProfilePage.module.scss';

import axios from '~/utils/api';
import useAuth from '~/hooks/useAuth';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Profile() {
    const { auth } = useAuth();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios
            .get(`/user/profile`, {
                headers: {
                    Authorization: auth?.token,
                },
            })
            .then((response) => {
                const profile = response.data.data;
                setName(profile.name);
                setEmail(profile.email);
                setAvatar(profile.avatar);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, [auth?.token]);

    return (
        <Container className={`${cx('container')}`}>
            <div className={`${cx('wrapper')}`}>
                <Row className="g-0 px-0 h-100 w-100">
                    <Col lg={6} className="d-none d-lg-block h-100">
                        <div className={cx('image-wrapper')}>
                            <img className={cx('image')} src={avatar} alt="avatar" />

                            <p className={cx('user-name')}>{name}</p>
                            <p className={cx('Address')}>Ho Chi Minh City | Viet Nam</p>
                            <hr />
                        </div>
                    </Col>

                    <Col lg={6} className="h-100">
                        <div className={cx('form-wrapper')}>
                            <Form className={cx('form')}>
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
                            </Form>

                            <Button center green leftIcon={<FontAwesomeIcon icon={faFloppyDisk} />}>
                                Lưu
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default Profile;
