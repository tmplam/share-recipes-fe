import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faLocationDot,
   faPhone, faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {Row, Container, Col  } from 'react-bootstrap';
import 'tippy.js/dist/tippy.css';
import styles from './Footer.module.scss';
import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);



function Footer() {
    return (
        <div className={cx('wrapper')}>
          <Container className={cx('container')}>
            <Row>
              <Col xs={6}  lg={4} md={6} sm ={12}>
                <div  className={cx('intro' , 'mgt50')}>
                <h4>About Us:</h4>
                <h4 className={cx('content')}>
                  Crafted by a dedicated team from HCMUS, this website is the culmination of our university projects.
                  Fueled by our passion for cooking, we aspire to provide a platform where enthusiasts can immerse
                  themselves in a myriad of diverse recipes. Welcome to our culinary journey!
                </h4>
                </div>
              </Col>
              <Col lg={4} md={6} sm ={12} >
                <div  className={cx('Contact', 'mgt50')} >

                <h4>Contact Us:</h4>
                    <div className={cx('location', 'contact-item')}>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p  className={cx('content')} >University of Science, Di An City, Binh Duong</p>
                    </div>
                  
                  
                    <div className={cx('phone', 'contact-item')}>
                      <FontAwesomeIcon icon={faPhone} />
                      <p  className={cx('content')} >028 123456789</p>
                    </div>
                 

                    <div className={cx('mail', 'contact-item')}>
                      <FontAwesomeIcon icon={faEnvelope} />
                      <p className={cx('content')}>group9SE2023@gmail.com</p>
                    </div>
                </div>
            
          
              </Col>

              <Col lg={4} md={6} sm ={12}  >
              <div className={cx('link' , 'mgt50')}>
              <h4>Link</h4>
                <div className={cx('link-group')}>
                  <Link className={cx('link-item' , 'content')}>Term</Link>
                  <Link className={cx('link-item' , 'content')}>How it works</Link>
                </div>
              </div>
               
              </Col>    
            </Row>
    
            <Row >
              <div className={cx('group-icon' , 'mgt50')}>

                <Link className={cx('icon')}>
                  <FontAwesomeIcon icon={faFacebook} size='2x' />
                </Link>
                <Link className={cx('icon')}>
                  <FontAwesomeIcon icon={faTwitter} size='2x' />
                </Link>
                <Link className={cx('icon')}>
                  <FontAwesomeIcon icon={faEnvelope} size='2x'/>
                </Link>
                <Link className={cx('icon')}>
                  <FontAwesomeIcon icon={faInstagram} size='2x'/>
                </Link>
                <Link className={cx('icon')}>
                  <FontAwesomeIcon icon={faGithub} size='2x'/>
                </Link>
              </div>

                
            </Row> 
          </Container>
        </div>
      );
    }

export default Footer;
