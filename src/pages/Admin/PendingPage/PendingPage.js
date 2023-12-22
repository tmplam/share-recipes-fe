import classNames from 'classnames/bind';

import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './PendingPage.module.scss';
import PendingItem from './components/PendingItem';

import useAuth from '~/hooks/useAuth';
import axios from '~/utils/api';
import { useEffect, useState } from 'react';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

function PendingPage() {
    const { auth } = useAuth();

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [total, setTotal] = useState(0);
    const per_page = 2;

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
                // alert(123123);
            });
    }, [page, auth]);

    function handlePageChange(page) {
        setPage(page);
    }

    return (
        <Container className={`${cx('wrapper')}`}>
            <h1 className={cx('title')}>
                <FontAwesomeIcon icon={faListCheck} /> Danh Sách Chờ Duyệt ({total})
            </h1>
            <Row className="justify-content-center">
                {pendingList.map((recipe, index) => (
                    <Col sm={12} md={12} lg={8} xl={8} xxl={8} key={index}>
                        <PendingItem {...recipe} />
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
        </Container>
    );
}

export default PendingPage;
