import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

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

import { Container } from 'react-bootstrap';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import useAuth from '~/hooks/useAuth';
import useSearch from '~/hooks/useSearch';
import axios from '~/utils/api';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const adminMenu = [
    {
        icon: <FontAwesomeIcon icon={faCircleUser} />,
        title: 'Manage users',
        to: '/admin/manage-users',
    },
    {
        icon: <FontAwesomeIcon icon={faListCheck} />,
        title: 'Pending recipes',
        to: '/admin/pending',
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
        to: '/recipes/create',
    },
    {
        icon: <FontAwesomeIcon icon={faBookmark} />,
        title: 'Your recipes',
        to: '/recipes/shared',
    },
    {
        icon: <FontAwesomeIcon icon={faHeart} />,
        title: 'Favourite',
        to: '/recipes/favourite',
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Logout',
        to: '/logout',
        separate: true,
    },
];

function Header() {
    const location = useLocation();
    const { auth } = useAuth();
    // Search context
    const { setKeyword } = useSearch();
    const [userInfo, setUserInfo] = useState({});
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        if (auth?.token && auth?.token !== 'EXPIRED') {
            axios
                .get('users/profile', {
                    headers: {
                        Authorization: `${auth.token}`,
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    const data = response.data.data;
                    setUserInfo(data);
                })
                .catch((error) => {
                    // console.log(error);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSubmitForm(e) {
        e.preventDefault();
        // Search context
        setKeyword(searchKeyword.trim());
    }

    return (
        <header className={cx('wrapper')}>
            <Container>
                <div className={cx('header')}>
                    <Link className={cx('logo')} to="/">
                        <img className={cx('logo')} src={images.logo} alt="logo" />
                    </Link>

                    {location.pathname === '/' ? (
                        <form onSubmit={handleSubmitForm} id="search-form" className={cx('search')}>
                            <input
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                placeholder="Search recipes..."
                                spellCheck={false}
                            />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    ) : (
                        ''
                    )}

                    <div className={cx('control')}>
                        {auth?.token && auth?.token !== 'EXPIRED' ? (
                            <>
                                {auth?.roles?.find((role) =>
                                    ['Admin', 'SuperAdmin'].includes(role),
                                ) ? (
                                    <div>
                                        <Menu items={adminMenu}>
                                            <button className={cx('action-btn', 'manage-btn')}>
                                                <FontAwesomeIcon icon={faLayerGroup} />
                                            </button>
                                        </Menu>
                                    </div>
                                ) : (
                                    false
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
                                            src={userInfo.avatar || images.avatar}
                                            alt="avatar"
                                        ></img>
                                    </Menu>
                                </div>
                            </>
                        ) : (
                            <>
                                <Button primary center ml to="/signup">
                                    Đăng Ký
                                </Button>
                                <Button primary center ml to="/login">
                                    Đăng Nhập
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;
