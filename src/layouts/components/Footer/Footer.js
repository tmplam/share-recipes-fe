import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Row, Container, Col } from 'react-bootstrap';
import 'tippy.js/dist/tippy.css';
import styles from './Footer.module.scss';
import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row className="g-5">
                    <Col xs={6} lg={4} md={6} sm={12}>
                        <div className={cx('intro')}>
                            <h3>Thông tin:</h3>
                            <h4 className={cx('content')}>
                                - Sản phẩm được thiết kế và cài đặt bởi nhóm 9 lớp SE CQ21_3, là
                                trang web chia sẻ các công thức nấu ăn dành cho những người yêu
                                thích nấu nướng.
                                <br />
                                - Quy trình thiết kế dựa trên mô hình phát triển phần mềm linh họa -
                                Scrum.
                                <br />- Các công nghệ và tiện ích sử dụng: ReactJS (Frontend),
                                NodeJS - ExpressJS (Backend), Postgress (Database), Github (Quản lí
                                mã nguồn), Postman (Kiểm thử API), Jira (Quản lí quy trình phần
                                mềm), ...
                            </h4>
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <div className={cx('Contact')}>
                            <h3>Liên hệ:</h3>
                            <div className={cx('location', 'contact-item')}>
                                <span style={{ width: '28px', textAlign: 'start' }}>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </span>
                                <p className={cx('content')}>
                                    Trường đại học Khoa Học Tự Nhiên, Dĩ An, Bình Dương
                                </p>
                            </div>

                            <div className={cx('phone', 'contact-item')}>
                                <span style={{ width: '28px', textAlign: 'start' }}>
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                                <p className={cx('content')}>+84 349028348</p>
                            </div>

                            <div className={cx('mail', 'contact-item')}>
                                <span style={{ width: '28px', textAlign: 'start' }}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <p className={cx('content')}>group9SE2023@gmail.com</p>
                            </div>
                        </div>
                    </Col>

                    <Col lg={4} md={6} sm={12}>
                        <div className={cx('link')}>
                            <h3>Đường dẫn</h3>
                            <div className={cx('link-group')}>
                                <Link className={cx('link-item', 'content')}>Điều khoản</Link>
                                <Link className={cx('link-item', 'content')}>Cách sử dụng</Link>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <div className={cx('group-icon', 'mgt50')}>
                        <a
                            href="https://www.facebook.com/profile.php?id=100019167581327"
                            className={cx('icon')}
                        >
                            <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                        <Link className={cx('icon')}>
                            <FontAwesomeIcon icon={faTwitter} size="2x" />
                        </Link>
                        <Link className={cx('icon')}>
                            <FontAwesomeIcon icon={faEnvelope} size="2x" />
                        </Link>
                        <Link className={cx('icon')}>
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </Link>
                        <a href="https://github.com/PhuLamCoder" className={cx('icon')}>
                            <FontAwesomeIcon icon={faGithub} size="2x" />
                        </a>
                    </div>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;
