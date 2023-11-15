import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import styles from './HomePage.module.scss';
import FoodItem from '~/pages/HomePage/components/FoodItem';
import images from '~/assets/images';
import axios from '~/utils/api';

const cx = classNames.bind(styles);

function HomePage() {
    const [totalItem, setTotalItem] = useState(0);
    const [categoryList, setCategoryList] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    const [searchParams, setSearchParams] = useState(new URLSearchParams());

    useEffect(() => {
        setIsloading(true);
        axios
            .get(`recipes?${searchParams.toString() !== '' ? searchParams.toString() : ''}`)
            .then((response) => {
                const data = response.data;
                setRecipeList(data.data);
            })
            .catch((err) => {
                // console.log(err);
            });
        setIsloading(false);
    }, [searchParams]);

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

        axios
            .get(`recipes/count`)
            .then((response) => {
                const data = response.data.data;
                setTotalItem(data.count);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, []);

    function handleChangeCategory(e) {
        searchParams.set('category', e.target.value);
        setSearchParams(new URLSearchParams(searchParams.toString()));
    }

    function handleChangeSort(e) {
        searchParams.set('sort_by', e.target.value);
        setSearchParams(new URLSearchParams(searchParams.toString()));
    }

    return (
        <Container className={`${cx('wrapper')}`}>
            <div
                className={cx('brand')}
                style={{
                    backgroundImage: `url(${images.background})`,
                }}
            >
                <h1 className={cx('slogan')}>HỌC, NẤU & THƯỞNG THỨC</h1>
                <div className={cx('info')}>
                    <div className={cx('info-item')}>
                        <p className={cx('info-item-number')}>{totalItem}</p>
                        <p className={cx('info-item-title')}>Công thức</p>
                    </div>
                    <div className={cx('info-item')}>
                        <p className={cx('info-item-number')}>{categoryList.length}</p>
                        <p className={cx('info-item-title')}>Loại</p>
                    </div>
                </div>
            </div>

            <div className={cx('filter')}>
                <p className={cx('filter-name')}>ALL RECIPES</p>

                <div className={cx('filter-group')}>
                    <div className={cx('filter-control')}>
                        <label className={cx('filter-label')} htmlFor="category">
                            Loại:
                        </label>

                        <select
                            onChange={handleChangeCategory}
                            className={cx('filter-select')}
                            id="category"
                        >
                            {categoryList.map((category) => (
                                <option key={category.categoryid} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx('filter-control')}>
                        <label className={cx('filter-label')} htmlFor="sort-food">
                            Sắp xếp:
                        </label>

                        <select
                            onChange={handleChangeSort}
                            className={cx('filter-select')}
                            id="sort-food"
                        >
                            <option value="rating">Đánh giá</option>
                            <option value="date">Ngày đăng</option>
                        </select>
                    </div>
                </div>
            </div>

            <Row>
                {isLoading ? (
                    <Spinner animation="grow" variant="success" />
                ) : (
                    recipeList.map((recipe) => (
                        <Col xs={6} md={4} lg={3} key={recipe.recipeid}>
                            <FoodItem {...recipe} />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}

export default HomePage;
