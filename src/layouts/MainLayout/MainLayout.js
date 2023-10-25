import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './MainLayout.module.scss';
import Header from '~/layouts/components/Header';

const cx = classNames.bind(styles);

function MainLayout() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('main')}>
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
