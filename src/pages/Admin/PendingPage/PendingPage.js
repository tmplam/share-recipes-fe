import classNames from 'classnames/bind';

import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './PendingPage.module.scss';
import PendingItem from './components/PendingItem';

import useAuth from '~/hooks/useAuth';
import axios from '~/utils/api';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function PendingPage() {
    const { auth } = useAuth();

    const [pendingList, setPendingList] = useState([]);

    useEffect(() => {
        axios
            .get('recipes/pending', {
                headers: {
                    Authorization: auth.token,
                },
            })
            .then((response) => {
                setPendingList(response.data.data);
            })
            .catch((err) => {
                // alert(123123);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className={`${cx('wrapper')}`}>
            <h1 className={cx('title')}>
                <FontAwesomeIcon icon={faListCheck} /> Danh Sách Chờ Duyệt
            </h1>
            <Row className="justify-content-center">
                {pendingList.map((recipe, index) => (
                    <Col sm={12} md={12} lg={8} xl={8} xxl={8} key={index}>
                        <PendingItem {...recipe} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default PendingPage;
