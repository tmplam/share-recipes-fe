import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faBell,
    faLayerGroup,
    faListCheck,
    faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { Container } from 'react-bootstrap';
import Tippy from '@tippyjs/react';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import useAuth from '~/hooks/useAuth';
import useUserInfo from '~/hooks/useUserInfo';
import useSearch from '~/hooks/useSearch';
import useForceReload from '~/hooks/useForceReload';
import { useEffect, useState } from 'react';
import axios from '~/utils/api';
import { toast } from 'react-toastify';
import { cx, userMenu } from './Header';

export function Header() {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const { auth } = useAuth();
    const { userInfo } = useUserInfo();
    const { _totalPending, _homeReload } = useForceReload();

    // Search context
    const { setKeyword } = useSearch();
    const [searchKeyword, setSearchKeyword] = useState('');

    const [totalPending, setTotalPending] = useState(0);

    useEffect(() => {
        if (auth?.token !== 'EXPIRED' && ['Admin', 'SuperAdmin'].includes(auth?.roles[0])) {
            axios
                .get(`recipes/pending`, {
                    headers: {
                        Authorization: auth.token,
                    },
                })
                .then((response) => {
                    const data = response.data;
                    setTotalPending(data.total);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message || 'Lỗi server!');
                });
        }
    }, [_totalPending.reloadTotalPending, auth]);

    const adminMenu = [
        {
            icon: <FontAwesomeIcon icon={faListCheck} />,
            title: 'Danh sách chờ',
            to: '/admin/pending',
            alert: totalPending,
        },
    ];

    const superAdminMenu = [
        {
            icon: <FontAwesomeIcon icon={faCircleUser} />,
            title: 'Quản lý user',
            to: '/admin/manage-users',
        },
        {
            icon: <FontAwesomeIcon icon={faListCheck} />,
            title: 'Danh sách chờ',
            to: '/admin/pending',
            alert: totalPending,
        },
        {
            icon: <FontAwesomeIcon icon={faChartLine} />,
            title: 'Thống kê',
            to: '/admin/statistics',
        },
    ];

    useEffect(() => {
        setKeyword(searchParams.get('keyword') || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSubmitForm(e) {
        e.preventDefault();
        // Search context
        setKeyword(searchKeyword.trim());
        setSearchParams((prev) => {
            prev.set('keyword', searchKeyword.trim());
            return prev;
        });
    }

    function handleReloadHome(e) {
        // e.preventDefault();
        console.log(location.state?.from?.pathname);
        // _homeReload.setReloadHome({});
    }

    return (
        <header className={cx('wrapper')}>
            <Container>
                <div className={cx('header')}>
                    <Link
                        onClick={handleReloadHome}
                        className={cx('logo')}
                        to="/"
                        state={{ from: location }}
                    >
                        <img className={cx('logo')} src={images.logo} alt="logo" />
                    </Link>

                    {location.pathname === '/' ? (
                        <form onSubmit={handleSubmitForm} id="search-form" className={cx('search')}>
                            <input
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                placeholder="Tìm kiếm ..."
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
                                {auth?.roles.includes('Admin') ? (
                                    <div>
                                        <Menu items={adminMenu}>
                                            <button className={cx('action-btn', 'manage-btn')}>
                                                <FontAwesomeIcon icon={faLayerGroup} />
                                            </button>
                                        </Menu>
                                    </div>
                                ) : auth?.roles.includes('SuperAdmin') ? (
                                    <div>
                                        <Menu items={superAdminMenu}>
                                            <button className={cx('action-btn', 'manage-btn')}>
                                                <FontAwesomeIcon icon={faLayerGroup} />
                                            </button>
                                        </Menu>
                                    </div>
                                ) : (
                                    false
                                )}
                                <Tippy delay={[0, 50]} content="Thông báo" placement="bottom">
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
