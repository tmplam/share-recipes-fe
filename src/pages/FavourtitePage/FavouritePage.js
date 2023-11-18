import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Pagination from '~/components/Pagination';
import FavouriteItem from './components/FavouriteItem';
import styles from './FavouritePage.module.scss';
import axios from '~/utils/api';

const cx = classNames.bind(styles);

function FavouritePage() {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const per_page = 4;

    const [category, setCategory] = useState('');

    const [keyword, setKeyword] = useState('');
    const keywordRef = useRef();
    const [favouriteList, setFavouriteList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axios
            .get(
                `recipes?page=${page}&per_page=${per_page}&keyword=${keyword}&category=${category}`,
            )
            .then((response) => {
                const data = response.data;
                setPage(data.page);
                setTotalPage(data.total_page);
                setFavouriteList(data.data);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, [page, keyword, category]);

    useEffect(() => {
        axios
            .get(`recipe-categories`)
            .then((response) => {
                const data = response.data;
                setCategoryList(data.data);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, []);

    function handlePageChange(page) {
        setPage(page);
    }

    function handleSubmitSearch(e) {
        e.preventDefault();
        setKeyword(keywordRef.current.value);
    }

    return (
        <Container className={cx('wrapper')}>
            <h1 className={cx('title')}>
                Công Thức Yêu Thích <FontAwesomeIcon icon={faStar} />
            </h1>
            <div className={cx('main')}>
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
                    {favouriteList.map((recipe) => (
                        <Col xs={12} md={6} lg={4} xl={3} key={recipe.recipeid}>
                            <FavouriteItem {...recipe} />
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
    );
}

export default FavouritePage;
