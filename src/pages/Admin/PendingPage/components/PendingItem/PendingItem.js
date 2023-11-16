import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './PendingItem.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function PendingItem({ image, name, description }) {
    return (
        <div className={cx('wrapper')}>
            <Tippy delay={[0, 50]} content="Xem chi tiết" placement="auto">
                <Link className={cx('image-wrapper')}>
                    <img className={cx('image')} src={image} alt={name} />
                </Link>
            </Tippy>

            <div className={cx('info')}>
                <p className={cx('name')}>{name} </p>
                <p className={cx('des')}> {description} </p>
            </div>

            <div className={cx('btn-group')}>
                <Button small rounded center className={cx('btn')}>
                    Duyệt
                </Button>
                <Button small rounded center className={cx('btn', 'btn-danger')}>
                    Từ chối
                </Button>
            </div>
        </div>
    );
}

export default PendingItem;
