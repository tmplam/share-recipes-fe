import classNames from 'classnames/bind';

import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import styles from './PendingPage.module.scss';
import PendingItem from './components/PendingItem';

import useAuth from '~/hooks/useAuth';
import axios from '~/utils/api';
import { useEffect, useState } from 'react';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

function PendingPage() {
    const { auth } = useAuth();

    const [rerender, setRerender] = useState({});

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [total, setTotal] = useState(0);
    const per_page = 4;

    const [pendingList, setPendingList] = useState([]);

    useEffect(() => {
        axios
            .get(`recipes/pending?page=${page}&per_page=${per_page}`, {
                headers: {
                    Authorization: auth.token,
                },
            })
            .then((response) => {
                const data = response.data;
                setPendingList(data.data);
                setPage(data.page);
                setTotal(data.total);
                setTotalPage(data.total_page);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || 'Lỗi server!');
            });
    }, [page, rerender, auth]);

    function handlePageChange(page) {
        setPage(page);
    }

    function handleApprove(recipeId) {
        axios
            .put(
                `recipes/${recipeId}/status`,
                {
                    status: 'Approved',
                },
                {
                    headers: {
                        Authorization: auth?.token !== 'EXPIRED' ? auth?.token : null,
                    },
                },
            )
            .then((response) => {
                // const data = response.data;
                toast.success('Duyệt công thức thành công!');
                setRerender({});
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || 'Lỗi server!');
            });
    }

    function handleReject(recipeId) {
        axios
            .put(
                `recipes/${recipeId}/status`,
                {
                    status: 'Rejected',
                },
                {
                    headers: {
                        Authorization: auth?.token !== 'EXPIRED' ? auth?.token : null,
                    },
                },
            )
            .then((response) => {
                // const data = response.data;
                toast.warning('Đã từ chối công thức!');
                setRerender({});
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || 'Lỗi server!');
            });
    }

    return (
        <Container className={`${cx('wrapper')}`}>
            <Row className="justify-content-center">
                <Col sm={12} md={12} lg={8} xl={8} xxl={8}>
                    <div className={cx('title-wrapper')}>
                        <h1 className={cx('title')}>
                            <FontAwesomeIcon icon={faListCheck} /> Danh Sách Chờ Duyệt{' '}
                            {total > 0 ? (
                                <span className={cx('total-pending')}>{total}</span>
                            ) : null}
                        </h1>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {pendingList.length > 0 ? (
                    pendingList.map((recipe, index) => (
                        <Col sm={12} md={12} lg={8} xl={8} xxl={8} key={index}>
                            <PendingItem
                                {...recipe}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        </Col>
                    ))
                ) : (
                    <Col sm={12} md={12} lg={8} xl={8} xxl={8}>
                        <p className={cx('noitem-message')}>Không có công thức chờ duyệt nào!</p>
                    </Col>
                )}
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
        </Container>
    );
}

export default PendingPage;
