import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faUsers,
    faUserPlus,
    faLock,
    faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import Pagination from '~/components/Pagination';
import styles from './UserManagementPage.module.scss';
import axios from '~/utils/api';
import useAuth from '~/hooks/useAuth';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountManagementPage() {
    const { auth } = useAuth();
    const location = useLocation();
    const [reRender, setRerender] = useState({});
    const [page, setPage] = useState(1);
    const [role, setRole] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [totalUser, setTotalUser] = useState(0);
    const perPage = 5;

    const [keyword, setKeyword] = useState('');
    const keywordRef = useRef();

    const [userList, setUserList] = useState([]);
    const [roleList, setRoleList] = useState([]);

    useEffect(() => {
        axios
            .get(`/users?page=${page}&per_page=${perPage}&role=${role}&keyword=${keyword}`, {
                headers: {
                    Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                },
            })
            .then((response) => {
                const data = response.data;
                setUserList(data.data);
                setPage(data.page);
                setTotalPage(data.total_page);
                setTotalUser(data.total_users);
            })
            .catch((err) => {
                // console.error(err);
            });
    }, [page, role, keyword, auth, reRender]);

    useEffect(() => {
        axios
            .get(`roles`, {
                headers: {
                    Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                },
            })
            .then((response) => {
                const data = response.data;
                setRoleList(data.data);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || 'Lỗi server!');
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handlePageChange(page) {
        setPage(page);
    }

    function handleSubmitSearch(e) {
        e.preventDefault();
        setKeyword(keywordRef.current.value.trim());
        setPage(1);
    }

    function handleLockUser(userId) {
        axios
            .put(
                `users/${userId}/status`,
                { status: 'Blocked' },
                {
                    headers: {
                        Authorization: auth?.token !== 'EXPIRED' ? auth?.token : null,
                    },
                },
            )
            .then((response) => {
                // const data = response.data;
                setRerender({});
                toast.warning('Đã khóa tài khoản người dùng!');
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }

    function handleUnlockUser(userId) {
        axios
            .put(
                `users/${userId}/status`,
                { status: 'Active' },
                {
                    headers: {
                        Authorization: auth?.token !== 'EXPIRED' ? auth?.token : null,
                    },
                },
            )
            .then((response) => {
                // const data = response.data;
                setRerender({});
                toast.success('Đã bỏ khóa tài khoản!');
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }

    function handleChangeUserRole(userId, roleId) {
        axios
            .put(
                `users/${userId}/role`,
                { role: roleId },
                {
                    headers: {
                        Authorization: auth?.token !== 'EXPIRED' ? auth?.token : null,
                    },
                },
            )
            .then((response) => {
                const data = response.data;
                setRerender({});
                toast.success(data.message);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }

    return (
        <Container className={cx('wrapper')}>
            <div className={cx('title-wrapper')}>
                <h1 className={cx('title')}>
                    Quản lí danh sách người dùng <FontAwesomeIcon icon={faUsers} />
                </h1>
            </div>

            <div className={cx('control')}>
                <form id="search-form" className={cx('search')} onSubmit={handleSubmitSearch}>
                    <input
                        ref={keywordRef}
                        placeholder="Tìm kiếm ..."
                        spellCheck={false}
                        name="search"
                    />
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>

                <div className="d-flex align-items-center">
                    <div className={cx('filter-control')}>
                        <label className={cx('filter-label')} htmlFor="role">
                            Role:
                        </label>

                        <select
                            onChange={(e) => setRole(e.target.value)}
                            className={cx('filter-select')}
                            id="role"
                        >
                            <option value="">Tất cả</option>
                            {roleList.map((role) =>
                                role.roleid !== 3 ? (
                                    <option key={role.roleid} value={role.roleid}>
                                        {role.name}
                                    </option>
                                ) : null,
                            )}
                        </select>
                    </div>

                    <Button
                        to={'/admin/create-user'}
                        center
                        green
                        state={{ from: location }}
                        rightIcon={<FontAwesomeIcon icon={faUserPlus} />}
                    >
                        Thêm
                    </Button>
                </div>
            </div>

            {/* Main content */}
            <Table className="text-center" striped bordered hover responsive>
                <thead className="table-success">
                    <tr className="table-success">
                        <th>#</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user, index) => {
                        const userRole = roleList.find((role) => role.name === user.roles[0]);

                        return (
                            <tr key={user.userid}>
                                <td>{(page - 1) * perPage + index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <select
                                        onChange={(e) => {
                                            handleChangeUserRole(user.userid, e.target.value);
                                        }}
                                        className={cx('filter-select', 'border')}
                                        defaultValue={userRole?.roleid}
                                    >
                                        {roleList.map((role) =>
                                            role.roleid !== 3 ? (
                                                <option key={role.roleid} value={role.roleid}>
                                                    {role.name}
                                                </option>
                                            ) : null,
                                        )}
                                    </select>
                                </td>
                                <td className="text-center">
                                    {user.status === 'Active' ? (
                                        <button
                                            onClick={(e) => handleLockUser(user.userid)}
                                            className={cx('lock-btn')}
                                        >
                                            Lock <FontAwesomeIcon icon={faLock} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => handleUnlockUser(user.userid)}
                                            className={cx('unlock-btn')}
                                        >
                                            Unlock <FontAwesomeIcon icon={faUnlock} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <div className={cx('pagination-wrapper')}>
                <div style={{ fontSize: '1.8rem' }}>
                    Hiển thị {userList.length}/{totalUser} kết quả
                </div>
                {totalPage >= 2 ? (
                    <Pagination
                        page={page}
                        total_page={totalPage}
                        onPageChange={handlePageChange}
                    />
                ) : (
                    false
                )}
            </div>
        </Container>
    );
}

export default AccountManagementPage;
