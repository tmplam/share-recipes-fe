import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

import styles from './HomePage.module.scss';
import FoodItem from '~/pages/HomePage/components/FoodItem';
import Pagination from '~/components/Pagination';
import images from '~/assets/images';
import axios from '~/utils/api';
// Search context
import useSearch from '~/hooks/useSearch';
import useForceReload from '~/hooks/useForceReload';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function HomePage() {
    const { auth } = useAuth();
    const { _homeReload } = useForceReload();
    const [searchParams, setSearchParams] = useSearchParams();
    // const location = useLocation();

    const [page, setPage] = useState(() => {
        return { page: Number.parseInt(searchParams.get('page')) || 1 };
    });

    const [totalPage, setTotalPage] = useState(0);
    const per_page = 8;

    const [totalItem, setTotalItem] = useState(0);
    const [categoryList, setCategoryList] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    // Search context
    const { keyword, setKeyword } = useSearch();

    const [category, setCategory] = useState(() => {
        return searchParams.get('category') || 'all';
    });

    const [sort, setSort] = useState(() => {
        return searchParams.get('sort_by') || 'date';
    });

    // useEffect(() => {
    //     console.log('init load');
    //     console.log(searchParams.get('keyword'));
    //     setKeyword(searchParams.get('keyword') || '');
    //     setCategory(searchParams.get('category') || 'all');
    //     setSort(searchParams.get('sort_by') || 'date');
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
        // if (!location.state?.from?.pathname.includes('recipes/detail/')) {
        setCategory(searchParams.get('category') || 'all');
        setSort(searchParams.get('sort_by') || 'date');
        setKeyword(searchParams.get('keyword') || '');
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_homeReload.reloadHome]);

    useEffect(() => {
        // setIsloading(true);
        // axios
        //     .get(
        //         `recipes?category=${category}&page=${page}&per_page=${per_page}&sort_by=${sort}&keyword=${keyword}`,
        //         {
        //             headers: {
        //                 Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
        //             },
        //         },
        //     )
        //     .then((response) => {
        //         const data = response.data;
        //         setPage(data.page);
        //         setTotalPage(data.total_page);
        //         setRecipeList(data.data);
        //     })
        //     .catch((err) => {
        //         // console.log(err);
        //     });
        // setIsloading(false);
        handlePageChange(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, category]);

    async function loadRecipe() {
        setIsloading(true);
        const response = await axios.get(
            `recipes?category=${category}&page=${page.page}&per_page=${per_page}&sort_by=${sort}&keyword=${keyword}`,
            {
                headers: {
                    Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                },
            },
        );

        const data = response.data;
        setPage((prev) => {
            prev.page = data.page;
            return prev;
        });

        setTotalPage(data.total_page);
        setRecipeList(data.data);
        setIsloading(false);
    }

    useEffect(() => {
        loadRecipe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, sort]);

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
        setCategory(e.target.value);
        setSearchParams((prev) => {
            prev.set('category', e.target.value);
            return prev;
        });
    }

    function handleChangeSort(e) {
        setSort(e.target.value);
        setSearchParams((prev) => {
            prev.set('sort_by', e.target.value);
            return prev;
        });
    }

    function handlePageChange(page) {
        setPage({ page });

        setSearchParams((prev) => {
            prev.set('page', page);
            return prev;
        });
    }

    function handleAddToFavourite(recipeid, index, isfavourite) {
        if (isfavourite) {
            axios
                .delete(`user/favourites/${recipeid}`, {
                    headers: {
                        Authorization: auth?.token,
                    },
                })
                .then((response) => {
                    const data = response.data;
                    toast.success(data.message);
                    setRecipeList((prev) => {
                        prev[index].isfavourite = !isfavourite;
                        return [...prev];
                    });
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        } else {
            axios
                .post(
                    `user/favourites`,
                    {
                        recipe: recipeid,
                    },
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    },
                )
                .then((response) => {
                    const data = response.data;
                    toast.success(data.message);
                    setRecipeList((prev) => {
                        prev[index].isfavourite = !isfavourite;
                        return [...prev];
                    });
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        }
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
                <p className={cx('filter-name')}>
                    {keyword !== '' ? `Từ khóa "${keyword}"` : 'TẤT CẢ CÔNG THỨC'}
                </p>

                <div className={cx('filter-group')}>
                    <div className={cx('filter-control')}>
                        <label className={cx('filter-label')} htmlFor="category">
                            Loại:
                        </label>

                        <select
                            onChange={handleChangeCategory}
                            className={cx('filter-select')}
                            value={category}
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

                    <div className={cx('filter-control')}>
                        <label className={cx('filter-label')} htmlFor="sort-food">
                            Sắp xếp:
                        </label>

                        <select
                            onChange={handleChangeSort}
                            value={sort}
                            className={cx('filter-select')}
                            id="sort-food"
                        >
                            <option value="date">Ngày đăng</option>
                            <option value="rating">Đánh giá</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <Row>
                    {isLoading ? (
                        <Col col={12} className="text-center">
                            <div className="mt-5">
                                <Spinner
                                    style={{ width: '30px', height: '30px' }}
                                    animation="border"
                                    role="status"
                                    variant="primary"
                                >
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        </Col>
                    ) : recipeList.length > 0 ? (
                        recipeList.map((recipe, index) => (
                            <Col xs={6} md={4} lg={3} key={recipe.recipeid}>
                                <FoodItem
                                    index={index}
                                    {...recipe}
                                    onAddToFavourite={handleAddToFavourite}
                                />
                            </Col>
                        ))
                    ) : !isLoading ? (
                        <Col col={12} className="text-center">
                            <p className={cx('notfound-message')}>Không tìm thấy công thức nào!</p>
                        </Col>
                    ) : (
                        false
                    )}
                </Row>

                {totalPage > 1 ? (
                    <div className={cx('pagination-wrapper')}>
                        <Pagination
                            page={page.page}
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

export default HomePage;
