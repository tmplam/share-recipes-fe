import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faBookOpen,
    faArrowUp,
    faChartPie,
    faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import Pagination from '~/components/Pagination';
import PostedItem from './components/PostedItem';
import styles from './PostedPage.module.scss';
import axios from '~/utils/api';
import useAuth from '~/hooks/useAuth';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const options = {
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'THỐNG KÊ THEO LOẠI',
            color: '#666',
            font: {
                weight: 'bold',
                size: 24,
            },
        },
        doughnutlabel: {
            labels: [
                {
                    text: 'Custom Text', // Văn bản tùy chỉnh
                    font: {
                        size: '20', // Kích thước văn bản
                    },
                },
            ],
        },
    },
};

function PostedPage() {
    const { auth } = useAuth();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalRecipe, setTotalRecipe] = useState(0);
    const per_page = 4;

    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

    const [keyword, setKeyword] = useState('');
    const keywordRef = useRef();
    const [postedList, setPostedList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    const [staticticsData, setStaticticsData] = useState([]);

    useEffect(() => {
        axios
            .get(
                `/user/recipes?page=${page}&per_page=${per_page}&keyword=${keyword}&category=${category}&status=${status}`,
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
                setTotalRecipe(data.total);
                setPostedList(data.data);
            })
            .catch((err) => {
                // console.error(err);
            });
    }, [page, keyword, category, status, auth]);

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
        handleShowDelete();
    }

    // DELETE modal
    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    function handleDeleteRecipe() {
        handleCloseDelete();
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

    useEffect(() => {
        axios
            .get(`/user/recipes/count/statistic?year=${new Date().getFullYear()}`, {
                headers: {
                    Authorization: auth?.token !== 'EXPIRED' ? auth?.token : null,
                },
            })
            .then((response) => {
                let data = response.data.data;
                setStaticticsData(data);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, [auth?.token]);

    const recipeByCategoryChartData = {
        labels: staticticsData.map((item) => item.category.name),
        datasets: [
            {
                label: 'Số lượng công thức',
                data: staticticsData.map((item) => item.num_recipes),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1.5,
            },
        ],
    };

    // DELETE modal
    const [showChart, setShowChart] = useState(false);

    const handleCloseChart = () => setShowChart(false);
    const handleShowChart = () => setShowChart(true);

    return (
        <>
            <Container className={cx('wrapper')}>
                <div className={cx('title-wrapper')}>
                    <h1 className={cx('title')}>
                        Công Thức Đã Đăng <FontAwesomeIcon icon={faBookOpen} />
                    </h1>
                </div>
                <div className={cx('utils-wrapper')}>
                    <Link to="/recipes/create" className={cx('post-btn')}>
                        Đăng <FontAwesomeIcon icon={faCirclePlus} />
                    </Link>

                    <button onClick={handleShowChart} className={cx('statictics-btn')}>
                        Biểu đồ <FontAwesomeIcon icon={faChartPie} />
                    </button>
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

                        <div className={cx('filter-wrapper')}>
                            <div className={cx('filter-control')}>
                                <label className={cx('filter-label')} htmlFor="status">
                                    Trạng thái:
                                </label>

                                <select
                                    onChange={(e) => setStatus(e.target.value)}
                                    className={cx('filter-select')}
                                    id="status"
                                >
                                    <option value="">Tất cả</option>
                                    <option value="Approved">Đã duyệt</option>
                                    <option value="Hidden">Đã ẩn</option>
                                    <option value="Pending">Chờ duyệt</option>
                                    <option value="Rejected">Từ chối</option>
                                </select>
                            </div>

                            <div className={cx('filter-control')}>
                                <label className={cx('filter-label')} htmlFor="category">
                                    Loại:
                                </label>

                                <select
                                    onChange={(e) => setCategory(e.target.value)}
                                    className={cx('filter-select')}
                                    id="category"
                                >
                                    <option value="">Tất cả</option>
                                    {categoryList.map((category) => (
                                        <option
                                            key={category.categoryid}
                                            value={category.categoryid}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <Row className="gx-3">
                        {postedList.length > 0 ? (
                            postedList.map((recipe) => (
                                <Col xs={12} md={6} lg={4} xl={3} key={recipe.recipeid}>
                                    <PostedItem onDelete={handleDeleteBtnClick} {...recipe} />
                                </Col>
                            ))
                        ) : status === '' && category === '' && keyword.trim() === '' ? (
                            <div className={cx('alert-no-items')}>
                                <span className={cx('alert-content')}>
                                    Bạn chưa đăng công thức nào!
                                </span>
                                <Button
                                    center
                                    primary
                                    rightIcon={
                                        <FontAwesomeIcon
                                            className={cx('icon-custom')}
                                            icon={faArrowUp}
                                        />
                                    }
                                    to={'/recipes/create'}
                                >
                                    Đăng ngay
                                </Button>
                            </div>
                        ) : (
                            <div className={cx('alert-no-items')}>
                                <span className={cx('alert-content')}>
                                    Không tìm thấy công thức!
                                </span>
                            </div>
                        )}
                    </Row>

                    <div className={cx('pagination-wrapper')}>
                        {postedList.length > 0 ? (
                            <div style={{ fontSize: '1.8rem' }}>
                                Hiển thị {postedList.length}/{totalRecipe} kết quả
                            </div>
                        ) : null}

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
                </div>
            </Container>

            <Modal centered show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2 style={{ margin: 0 }}>Xác nhận xóa!</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ margin: 0 }}>Bạn không thể khôi phục sau khi xóa!!!</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className={cx('modal-btn')} onClick={handleCloseDelete}>
                        Hủy bỏ
                    </button>
                    <button className={cx('modal-btn', 'delete')} onClick={handleDeleteRecipe}>
                        Xóa
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Biểu đồ thống kê */}
            <Modal centered show={showChart} onHide={handleCloseChart}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2 style={{ margin: 0 }}>Biểu đồ thống kê</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Doughnut options={options} data={recipeByCategoryChartData} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PostedPage;
