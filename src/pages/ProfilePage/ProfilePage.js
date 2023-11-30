import classNames from 'classnames/bind';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation, Form } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import styles from './ProfilePage.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';



const cx = classNames.bind(styles);


function Profile() {

    return (
        <Container className={`${cx('container')}`}>
            <div className={`${cx('wrapper')}`}>
                <Row className="g-0 px-0 h-100 w-100">
                    <Col lg={6} className="d-none d-lg-block h-100">
                        <div className={cx('image-wrapper')}>
                            <img className={cx('image')} src={images.avatar} alt="food" />
                        
                            <p className={cx('user-name')}>
                                Alexander Arnold 
                            </p>
                            <p className={cx('Address')}>
                                Ho Chi Minh City | Viet Nam 
                            </p>
                            <hr />
                        </div>
                    </Col>


                    <Col lg={6} className="h-100">
                        <div className={cx('form-wrapper')}>
                            <Form className={cx('form')} >
                                <div className={cx('form-content')}>
                                <h1 className={cx('title')}>User Profile</h1>
                                <div className={cx('form-group')}>
                                    <div className={cx('control-wrapper')}>
                                      <p>Username:</p> 
                                       <p className={cx('control-wrapper-properties')} >hkhai</p>
                                    </div>
                                </div>
                                <div className={cx('form-group')}>
                                    <div className={cx('control-wrapper')}>
                                      <p>Email:</p> 
                                       <p className={cx('control-wrapper-properties')} >nguyenvana000@gmail.com</p>
                                    </div>
                                </div>
                                <div className={cx('form-group')}>
                                    <div className={cx('control-wrapper')}>
                                      <p>Birthday:</p> 
                                       <p className={cx('control-wrapper-properties')} >7 August 2001</p>
                                    </div>
                                </div>

                                </div>
                               

                               
                            </Form>

                            <div className={cx('edit')}>
                                <Link to="/edit" className={cx('edit-link')}>
                                    Chỉnh sửa Profile
                                </Link>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default Profile;
