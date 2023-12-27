import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUsers, faUserPlus, faLock } from '@fortawesome/free-solid-svg-icons';
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
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const per_page = 4;

    const [category, setCategory] = useState('');

    const [keyword, setKeyword] = useState('');
    const keywordRef = useRef();
    const [userList, setUserList] = useState([]);
    const [roleList, setRoleList] = useState([]);

    useEffect(() => {
        // `/user/favourites?page=${page}&per_page=${per_page}&keyword=${keyword}&category=${category}`,
        axios
            .get(`/users`, {
                headers: {
                    Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                },
            })
            .then((response) => {
                const data = response.data;
                // console.log(data.data);
                setUserList(data.data);
                // setPage(data.page);
                setTotalPage(10);
                // setFavouriteList(data.data);
            })
            .catch((err) => {
                // console.error(err);
            });
    }, [page, keyword, category, auth]);

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
    }, []);

    function handlePageChange(page) {
        setPage(page);
    }

    function handleSubmitSearch(e) {
        e.preventDefault();
        setKeyword(keywordRef.current.value);
    }

    function handleLockUser(recipeId) {
        axios
            .delete(`user/favourites/${recipeId}`, {
                headers: {
                    Authorization: auth.token,
                },
            })
            .then((response) => {
                const data = response.data;
                toast.success(data.message);
                // setFavouriteList((prev) => prev.filter((recipe) => recipe.recipeid !== recipeId));
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
                        <label className={cx('filter-label')} htmlFor="category">
                            Role:
                        </label>

                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            className={cx('filter-select')}
                            id="category"
                        >
                            <option value="all">Tất cả</option>
                            {roleList.map((role) => (
                                <option key={role.roleid} value={role.roleid}>
                                    {role.name}
                                </option>
                            ))}
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
            <Table striped bordered hover responsive>
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
                        return (
                            <tr key={user.userid}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.roles}</td>
                                <td className="text-center">
                                    <button className={cx('delete-btn')}>
                                        Lock <FontAwesomeIcon icon={faLock} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {totalPage >= 2 ? (
                <div className={cx('pagination-wrapper')}>
                    <Pagination
                        page={page}
                        total_page={totalPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            ) : (
                false
            )}
        </Container>
    );
}

export default AccountManagementPage;
