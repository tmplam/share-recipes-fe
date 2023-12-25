import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import Pagination from '~/components/Pagination';
import PostedItem from './components/PostedItem';
import styles from './PostedPage.module.scss';
import axios from '~/utils/api';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function FavouritePage() {
    const { auth } = useAuth();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const per_page = 4;

    const [category, setCategory] = useState('');

    const [keyword, setKeyword] = useState('');
    const keywordRef = useRef();
    const [postedList, setPostedList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axios
            .get(
                `/user/recipes?page=${page}&per_page=${per_page}&keyword=${keyword}&category=${category}`,
                {
                    headers: {
                        Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                    },
                },
            )
            .then((response) => {
                const data = response.data;
                setPage(data.page);
                setTotalPage(data.total_page);
                setPostedList(data.data);
            })
            .catch((err) => {
                // console.error(err);
            });
    }, [page, keyword, category, auth]);

    useEffect(() => {
        axios
            .get(`recipe-categories`)
            .then((response) => {
                const data = response.data;
                setCategoryList(data.data);
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

    const [deleteId, setDeleteId] = useState('');
    function handleDeleteBtnClick(recipeId) {
        setDeleteId(recipeId);
        handleShow();
    }

    // DELETE modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleDeleteRecipe() {
        handleClose();
        axios
            .put(
                `/recipes/${deleteId}/status`,
                {
                    status: 'Deleted',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                    },
                },
            )
            .then((response) => {
                // const data = response.data;
                // toast.success(data.message);
                toast.success('Xóa thức thành công!');
                setPostedList((prev) => prev.filter((recipe) => recipe.recipeid !== deleteId));
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }

    return (
        <>
            <Container className={cx('wrapper')}>
                <div className={cx('title-wrapper')}>
                    <h1 className={cx('title')}>
                        Công Thức Đã Đăng <FontAwesomeIcon icon={faBookOpen} />
                    </h1>
                </div>
                <div className={cx('main')}>
                    <div className={cx('control')}>
                        <form
                            id="search-form"
                            className={cx('search')}
                            onSubmit={handleSubmitSearch}
                        >
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

                        <div className={cx('filter-control')}>
                            <label className={cx('filter-label')} htmlFor="category">
                                Loại:
                            </label>

                            <select
                                onChange={(e) => setCategory(e.target.value)}
                                className={cx('filter-select')}
                                id="category"
                            >
                                <option value="all">Tất cả</option>
                                {categoryList.map((category) => (
                                    <option key={category.categoryid} value={category.categoryid}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Row className="gx-3">
                        {postedList.map((recipe) => (
                            <Col xs={12} md={6} lg={4} xl={3} key={recipe.recipeid}>
                                <PostedItem onDelete={handleDeleteBtnClick} {...recipe} />
                            </Col>
                        ))}
                    </Row>
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
                </div>
            </Container>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2 style={{ margin: 0 }}>Xác nhận!</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ margin: 0 }}>Một phát nữa là đi luôn đó shop!!!</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className={cx('modal-btn')} onClick={handleClose}>
                        Hủy bỏ
                    </button>
                    <button className={cx('modal-btn', 'delete')} onClick={handleDeleteRecipe}>
                        Xóa
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FavouritePage;
