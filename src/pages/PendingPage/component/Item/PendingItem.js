import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';

import styles from './PendingItem.module.scss';
import Button from '../../../../components/Button';

const cx = classNames.bind(styles);


function PendingItem({ image, name, description }) {
    return (
        
        <div className={cx('wrapper')}>
            
            <div className={cx('image_wrapper')} >
              <Link>  <img className={cx('image')} src={image} alt="Food" /> </Link>
            </div>
            
                <div className={cx('info')}>
                    <p className={cx('name')}>{name} </p>
                    <p className={cx('des')}> {description} </p>   
                </div>
                <div className={cx('btn-group')} >
                <Button small inactive rounded center className={cx('btn')}>
                    Detail          
                </Button>
                <Button small inactive rounded center className={cx('btn')}>
                    Accept      
                </Button>
                </div>
        </div>

    );
}

export default PendingItem;