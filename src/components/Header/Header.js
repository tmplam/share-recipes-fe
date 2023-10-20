import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faBell,
    faLayerGroup,
    faArrowRightFromBracket,
    faListCheck,
} from '@fortawesome/free-solid-svg-icons';

import {
    faHeart,
    faUser,
    faCircleUser,
    faBookmark,
    faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const adminMenu = [
    {
        icon: <FontAwesomeIcon icon={faCircleUser} />,
        title: 'Manage users',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faListCheck} />,
        title: 'Pending recipes',
        to: '/',
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Profile',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faShareFromSquare} />,
        title: 'Share recipe',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faBookmark} />,
        title: 'Your recipes',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faHeart} />,
        title: 'Favourite',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Logout',
        to: '/',
        separate: true,
    },
];

function Header() {
    let signedIn = false;
    let admin = true;

    return (
        <header className={cx('wrapper')}>
            <div className={`grid wide`}>
                <div className={cx('header')}>
                    <img className={cx('logo')} src={images.logo} alt="logo" />
                    <div className={cx('search')}>
                        <input placeholder="Search recipes..." />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <div className={cx('control')}>
                        {signedIn ? (
                            <>
                                {admin ? (
                                    <div>
                                        <Menu items={adminMenu}>
                                            <button className={cx('action-btn', 'manage-btn')}>
                                                <FontAwesomeIcon icon={faLayerGroup} />
                                            </button>
                                        </Menu>
                                    </div>
                                ) : (
                                    ''
                                )}
                                <Tippy delay={[0, 50]} content="Notifications" placement="bottom">
                                    <button className={cx('action-btn', 'noti-btn')}>
                                        <FontAwesomeIcon icon={faBell} />
                                    </button>
                                </Tippy>
                                <div>
                                    <Menu items={userMenu}>
                                        <img
                                            className={cx('avatar')}
                                            src={images.avatar}
                                            alt="avatar"
                                        ></img>
                                    </Menu>
                                </div>
                            </>
                        ) : (
                            <>
                                <Button primary center>
                                    Sign Up
                                </Button>
                                <Button primary center>
                                    Sign In
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
